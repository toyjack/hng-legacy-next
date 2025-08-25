import CardContainer from "@/components/card-container";
import GlyphCard from "@/components/glyph-card";
import { BookTypeList } from "@/lib/constants";
import { getBookNameById, searchEntries } from "@/lib/data";
import React from "react";

// TODO: refactor to static page

async function QueryEntryPage({
  params,
}: {
  params: Promise<{ entryChar: string }>;
}) {
  const { entryChar } = await params;
  const decodedChar = decodeURIComponent(entryChar);
  const results = await searchEntries(decodedChar);

  // 预处理所有需要显示的组件
  const processedResults = await Promise.all(
    results.results.map(async (result) => {
      const bookTypeComponents = await Promise.all(
        BookTypeList.map(async (item) => {
          const filteredGlyphs = result.glyphs?.filter((glyph) => glyph.book_type === item.id) || [];
          
          if (filteredGlyphs.length === 0) {
            return null;
          }

          const glyphCards = await Promise.all(
            filteredGlyphs.map(async (glyph) => ({
              key: `${glyph.book_id}-${glyph.glyph_id}`,
              cardTitle: await getBookNameById(glyph.book_id),
              imgSrc: `/images/${glyph.book_id}/${glyph.glyph_id}.png`,
              sampleCount: glyph.sample_count,
            }))
          );

          return {
            categoryName: item.name,
            categoryId: item.id,
            glyphCards,
          };
        })
      );

      return {
        result,
        bookTypeComponents: bookTypeComponents.filter(Boolean),
      };
    })
  );

  return (
    <div>
      <h2>検索結果</h2>
      <div>
        検索字: <span className="font-bold">{decodedChar}</span>
      </div>
      <div>
        <div>{results.results.length}件の結果が見つかりました。</div>
      </div>
      {processedResults.map(({ result, bookTypeComponents }, index) => (
        <React.Fragment key={result.id || index}>
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
            {bookTypeComponents.map((category) => 
              category && (
                <CardContainer title={category.categoryName} key={category.categoryId}>
                  {category.glyphCards.map((cardData) => (
                    <GlyphCard
                      key={cardData.key}
                      cardTitle={cardData.cardTitle}
                      imgSrc={cardData.imgSrc}
                      sampleCount={cardData.sampleCount}
                    />
                  ))}
                </CardContainer>
              )
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
export default QueryEntryPage;
