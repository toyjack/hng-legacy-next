import { searchEntries } from "@/lib/data";

async function QueryEntryPage({ params }: { params: Promise<{ entryChar: string }> }) {
  const { entryChar } = await params;
  const decodedChar = decodeURIComponent(entryChar);
  const results = await searchEntries(decodedChar);
  return (
    <div>
      <h2>検索結果</h2>
      <div>
        検索字: <span className="font-bold">{decodedChar}</span>
      </div>
      <div>
        <div>{results.results.length}件の結果が見つかりました。</div>
      </div>
      {results.results.map((result) => (
        <>
        <div>
          <div>見出し：{result.entry}</div>
          <div>異体字：{result.variant}</div>
          <div>ID: {result.id}</div>
          <div>部首：{result.radical}</div>
          <div>大字典番号：{result.djt_id}</div>
          <div>大漢和辞典番号：{result.dkw_id}</div>
          <div>字形：{result.jis_char}</div>
          <div>字形ノート：{result.jis_notes}</div>
          <div>Unicode：{result.ucs}</div>
          <div>ノート：{result.notes}</div>
          <div>字体あり：{result.has_shapes}</div>
        </div>

        <div>
          {/* 字形 */}
          <div>字形一覧:</div>
          <ul>
            {result.glyphs?.map((glyph) => (
              <li key={glyph.glyph_id}>
               {glyph.book_id} {glyph.glyph_id} (形状数: {glyph.shape_count}, サンプル数: {glyph.sample_count})
               <img src={`/images/${glyph.book_id}/${glyph.glyph_id}.png`} alt="" />
              </li>
            ))}
          </ul>
        </div>
        </>
      ))}
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
export default QueryEntryPage

