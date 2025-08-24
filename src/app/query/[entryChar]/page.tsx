import { searchEntries } from "@/lib/data";

async function QueryEntryPage({ params }: { params: Promise<{ entryChar: string }> }) {
  const { entryChar } = await params;
  const decodedChar = decodeURIComponent(entryChar);
  const results = await searchEntries(decodedChar);
  return (
    <div>QueryEntryPage
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
export default QueryEntryPage