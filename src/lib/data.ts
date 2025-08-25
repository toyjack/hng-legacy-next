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
  // 并行加载所需数据
  const [fileContent, books, itaijiList] = await Promise.all([
    readFile(
      path.join(process.cwd(), "src", "data", "all_table_v.5.0_2019-01-15.csv"),
      "utf-8"
    ),
    getBooks(),
    getItaiji()
  ]);

  // 解析CSV数据
  const rawEntries = parse(fileContent, {
    columns: csvHeaders,
    from_line: 3,
    skip_empty_lines: true,
    trim: true,
    cast: (value) => value === "" ? undefined : value,
  }) as RawEntry[];

  // 预构建book type映射表以避免重复查询
  const bookTypeMap = new Map<string, string>();
  for (const book of books) {
    if (book.id) {
      bookTypeMap.set(book.id, book.type1 || "未知");
    }
  }

  // 预构建异体字查找映射
  const itaijiMap = buildItaijiMap(itaijiList);

  return rawEntries.map(rawEntry => transformEntry(rawEntry, bookTypeMap, itaijiMap));
});

export async function getEntryById(id: string | null | undefined): Promise<CharacterEntry | null> {
  if (!id) return null;

  const allEntries = await getAllEntries();
  return allEntries.find(entry => entry.id === id) || null;
};

// 构建异体字查找映射表
function buildItaijiMap(itaijiList: string[]): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  
  for (const itaijiGroup of itaijiList) {
    if (!itaijiGroup) continue;
    
    const chars = Array.from(itaijiGroup);
    for (const char of chars) {
      if (!map.has(char)) {
        map.set(char, new Set());
      }
      // 添加其他异体字（排除自己）
      chars.forEach(otherChar => {
        if (otherChar !== char) {
          map.get(char)!.add(otherChar);
        }
      });
    }
  }
  
  return map;
}

// 转换单个条目
function transformEntry(
  rawEntry: RawEntry,
  bookTypeMap: Map<string, string>,
  itaijiMap: Map<string, Set<string>>
): CharacterEntry {
  const glyphs: GlyphData[] = [];
  const processedFields = new Set<string>();

  // 提取字形数据
  for (const [key, value] of Object.entries(rawEntry)) {
    if (!key.endsWith("_id") || !value || processedFields.has(key)) continue;
    
    const bookId = key.replace("_id", "");
    if (bookId === "djt" || bookId === "dkw") continue;
    
    const shapeCount = rawEntry[`${bookId}_shape_count` as keyof RawEntry];
    const sampleCount = rawEntry[`${bookId}_sample_count` as keyof RawEntry];
    const bookType = bookTypeMap.get(bookId) || "未知";
    
    glyphs.push({
      book_id: bookId,
      glyph_id: value,
      shape_count: shapeCount || "0",
      sample_count: sampleCount || "0",
      book_type: bookType,
    });
    
    // 标记已处理的字段
    processedFields.add(key);
    processedFields.add(`${bookId}_shape_count`);
    processedFields.add(`${bookId}_sample_count`);
  }

  // 处理异体字
  const originalVariant = rawEntry.variant || "";
  const entry = rawEntry.entry;
  const additionalVariants = new Set<string>();
  
  if (entry) {
    const variants = itaijiMap.get(entry);
    if (variants) {
      variants.forEach(variant => additionalVariants.add(variant));
    }
  }
  
  if (originalVariant) {
    for (const char of originalVariant) {
      const variants = itaijiMap.get(char);
      if (variants) {
        variants.forEach(variant => additionalVariants.add(variant));
      }
    }
  }
  
  const finalVariant = originalVariant + Array.from(additionalVariants).join("");
  const uniqueVariant = Array.from(new Set(finalVariant)).join("");

  return {
    entry: rawEntry.entry,
    variant: uniqueVariant,
    id: rawEntry.id,
    djt_id: rawEntry.djt_id,
    dkw_id: rawEntry.dkw_id,
    radical: rawEntry.radical,
    jis_char: rawEntry.jis_char,
    jis_notes: rawEntry.jis_notes,
    ucs: rawEntry.ucs,
    notes: rawEntry.notes,
    has_shapes: rawEntry.has_shapes,
    glyphs,
  };
}

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
    cast: (value) => {
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
  const book = books.find(book => book.id === id);
  return book?.type1 || "未知";
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

  const itaiji = (itaijiTsv as Record<string, string>[]).map((entry) => {
    return [
      entry["異体1"],
      entry["異体2"],
      entry["異体3"],
      entry["異体4"],
    ].join("");
  });
  return itaiji;
});


export const getBookById = cache(async (id: string): Promise<BookMetadata | null> => {
  const books = await getBooks();
  return books.find(book => book.id === id) || null;
}); 


export const getEntriesByBookID = cache(async (bookId: string): Promise<CharacterEntry[]> => {
  const allEntries = await getAllEntries();
  return allEntries.filter(entry => {
    return entry.glyphs?.some(glyph => glyph.book_id === bookId);
  });
});