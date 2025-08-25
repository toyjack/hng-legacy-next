import GlyphCard from "@/components/glyph-card";
import { getBookById, getEntriesByBookID } from "@/lib/data";

async function BookItemPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = await getBookById(bookId);

  if (!book) {
    return <div>Book not found</div>;
  }

  const entries = await getEntriesByBookID(bookId);

  return (
    <div>
      <h1>BookItemPage: {book?.title || "Unknown Book"}</h1>
      <h2>Entries:</h2>
      <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center">
        {entries.map((entry) => (
          <GlyphCard
            key={entry.id}
            cardTitle={entry.entry || ""}
            cardTitleUrl={`/query/${entry.entry}`}
            imgSrc={`/images/${entry.glyphs?.[0]?.book_id}/${entry.glyphs?.[0]?.glyph_id}.png`}
          />
        ))}
      </div>
    </div>
  );
}
export default BookItemPage;
