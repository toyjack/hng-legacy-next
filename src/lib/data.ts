import "server-only";
import path from "node:path";
import { cache } from "react";
import { parse } from "csv-parse/sync";
import { readFile } from "node:fs/promises";
import { booksTsvHeaders, csvHeaders } from "@/lib/constants";
import type {
  RawEntry,
  BookMetadata,
  GlyphData,
  CharacterEntry,
  SearchResults,
} from "@/types/data";

export const getAllEntries = cache(async (): Promise<CharacterEntry[]> => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "all_table_v.5.0_2019-01-15.csv"
  );
  const fileContent = await readFile(filePath, "utf-8");

  const entries = parse(fileContent, {
    columns: csvHeaders,
    from_line: 3,
    skip_empty_lines: true,
    trim: true,
    cast: (value, _context) => {
      if (value === "") {
        return undefined;
      }
      return value;
    },
  }) as RawEntry[];

  const characterEntries: CharacterEntry[] = [];
  const itaijiList = await getItaiji();

  for (const entry of entries) {
    const glyphs: GlyphData[] = [];
    const entryRecord = entry as CharacterEntry & Record<string, string>;
    for (const key of Object.keys(entry)) {
      if (key.endsWith("_id") && entryRecord[key]) {
        const book_id = key.replace("_id", "");
        if (book_id === "djt" || book_id === "dkw") continue; // 跳过djt和dkw
        const shape_count = entryRecord[`${book_id}_shape_count`];
        const sample_count = entryRecord[`${book_id}_sample_count`];
        const book_type = await getBookTypeById(book_id);
        glyphs.push({
          book_id,
          glyph_id: entryRecord[key],
          shape_count: shape_count || "0",
          sample_count: sample_count || "0",
          book_type,
        });
        // 删除原有的字段
        delete entryRecord[key];
        delete entryRecord[`${book_id}_shape_count`];
        delete entryRecord[`${book_id}_sample_count`];
      }
    }
    // itaijiList中如果有跟entryRecord.entry或entryRecord.variant相同的项，则将其添加到entryRecord.itaiji中
    entryRecord.variant += itaijiList
      .filter(
        (itaiji) =>
          itaiji.includes(entryRecord.entry as string) ||
          itaiji.includes(entryRecord.variant as string)
      )
      .join("");

      entryRecord.variant = [...new Set(entryRecord.variant)].join("");

    entryRecord.glyphs = glyphs;
    characterEntries.push(entryRecord as CharacterEntry);
  }

  return characterEntries;
});

export const searchEntries = async (query: string): Promise<SearchResults> => {
  const allEntries = await getAllEntries();
  const firstCharacter = query.charAt(0);
  const filteredEntries = allEntries.filter((entry) => {
    return entry.entry?.includes(firstCharacter) || entry.variant?.includes(firstCharacter);
  });

  return { query: firstCharacter, results: filteredEntries };
};

export const getBooks = cache(async (): Promise<BookMetadata[]> => {
  const filePath = path.join(process.cwd(), "src", "data", "books.tsv");

  const fileContent = await readFile(filePath, "utf-8");
  const books = parse(fileContent, {
    delimiter: "\t",
    columns: booksTsvHeaders,
    skip_empty_lines: true,
    from_line: 2,
    trim: true,
    cast: (value, _context) => {
      if (value === "") {
        return undefined;
      }
      return value;
    },
  });

  return books as BookMetadata[];
});

export const getBookAlias = cache(async (): Promise<string[]> => {
  const books = await getBooks();
  const alias: string[] = [];

  books.forEach((book) => {
    if (book.alias) {
      alias.push(book.alias);
    }
  });

  return alias;
});

export const getBookTypeById = cache(async (id: string): Promise<string> => {
  const books = await getBooks();
  const type = books
    .filter((book) => book.id === id)
    .map((book) => book.type1)[0];
  return type || "未知";
});

export const getBookNameById = cache(async (id: string): Promise<string> => {
  const books = await getBooks();
  const name = books
    .filter((book) => book.id === id)
    .map((book) => book.title)[0];
  return name || "未知";
});

export const getItaiji = cache(async (): Promise<string[]> => {
  const filePath = path.join(process.cwd(), "src", "data", "itaiji.tsv");
  const fileContent = await readFile(filePath, "utf-8");
  const itaijiTsv = parse(fileContent, {
    delimiter: "\t",
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const itaiji = itaijiTsv.map((entry: any) => {
    return [
      entry["異体1"],
      entry["異体2"],
      entry["異体3"],
      entry["異体4"],
    ].join("");
  });
  return itaiji;
});
