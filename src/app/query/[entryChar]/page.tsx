import CardContainer from "@/components/card-container";
import GlyphCard from "@/components/glyph-card";
import { BookTypeList } from "@/lib/constants";
import { getBookNameById, searchEntries } from "@/lib/data";
import type { BookTypeComponent, CharacterEntry } from "@/types/data";
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
      const bookTypeComponentsWithNulls = await Promise.all(
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

      const bookTypeComponents: BookTypeComponent[] = bookTypeComponentsWithNulls.filter((item): item is BookTypeComponent => item !== null);

      return {
        result,
        bookTypeComponents: bookTypeComponents.filter(Boolean),
      };
    })
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* 搜索结果标题 */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">検索結果</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">検索字</div>
              <div className="stat-value text-primary text-5xl">{decodedChar}</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">結果件数</div>
              <div className="stat-value text-secondary">{results.results.length}</div>
              <div className="stat-desc">件の結果が見つかりました</div>
            </div>
          </div>
        </div>
      </div>

      {/* 多结果 Tab 导航 */}
      {results.results.length > 1 ? (
        <div className="w-full mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="badge badge-info badge-lg">
              複数の結果が見つかりました。IDをクリックして切り替えてください。
            </div>
          </div>
          
          <div className="tabs tabs-lift tabs-lg w-full">
            {processedResults.map(({ result }, index) => (
              <React.Fragment key={result.id || index}>
                <label className="tab">
                  <input
                    type="radio"
                    name={`character_tabs_${decodedChar}`}
                    defaultChecked={index === 0}
                  />
                  <span className="flex items-center gap-2">
                    <span className="badge badge-outline badge-primary font-mono">
                      {result.id || `${index + 1}`}
                    </span>
                    {result.entry && (
                      <span className="text-lg">{result.entry}</span>
                    )}
                  </span>
                </label>
                <div className="tab-content bg-base-100 border-base-300 p-6">
                  <CharacterResult 
                    result={result} 
                    bookTypeComponents={processedResults[index].bookTypeComponents} 
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : processedResults.length > 0 ? (
        <CharacterResult 
          result={processedResults[0].result} 
          bookTypeComponents={processedResults[0].bookTypeComponents} 
        />
      ) : null}
    </div>
  );
}

// 提取字符结果显示组件
function CharacterResult({ result, bookTypeComponents }: {
  result: CharacterEntry;
  bookTypeComponents: any[];
}) {
  return (
    <>
      {/* 字符基本信息 */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-sm bg-base-100 mb-6">
        {result.entry && (
          <div className="stat">
            <div className="stat-title">見出し</div>
            <div className="stat-value text-primary text-4xl">{result.entry}</div>
          </div>
        )}
        
        {result.variant && (
          <div className="stat">
            <div className="stat-title">異体字</div>
            <div className="stat-value text-2xl">{result.variant}</div>
          </div>
        )}

        {result.id && (
          <div className="stat">
            <div className="stat-title">ID</div>
            <div className="stat-value text-lg font-mono">
              <span className="badge badge-outline badge-primary">{result.id}</span>
            </div>
          </div>
        )}
      </div>

      {/* 详细信息卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 字典信息 */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg">字典情報</h3>
            <div className="space-y-3">
              {result.radical && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-soft badge-secondary">部首</span>
                  <span>{result.radical}</span>
                </div>
              )}
              {result.djt_id && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-soft badge-info">大字典</span>
                  <span className="font-mono">{result.djt_id}</span>
                </div>
              )}
              {result.dkw_id && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-soft badge-success">大漢和</span>
                  <span className="font-mono">{result.dkw_id}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 技术信息 */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg">技術情報</h3>
            <div className="space-y-3">
              {result.jis_char && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-soft badge-warning">JIS字形</span>
                  <span>{result.jis_char}</span>
                </div>
              )}
              {result.ucs && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-soft badge-accent">Unicode</span>
                  <span className="font-mono">{result.ucs}</span>
                </div>
              )}
              {result.has_shapes && (
                <div className="flex items-center gap-2">
                  <span className="badge badge-soft badge-neutral">字体あり</span>
                  <span>{result.has_shapes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 注记信息 */}
      {(result.jis_notes || result.notes) && (
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body">
            <h3 className="card-title text-lg">ノート</h3>
            <div className="space-y-3">
              {result.jis_notes && (
                <div>
                  <div className="badge badge-outline badge-sm mb-2">字形ノート</div>
                  <p className="text-sm text-base-content/80">{result.jis_notes}</p>
                </div>
              )}
              {result.notes && (
                <div>
                  <div className="badge badge-outline badge-sm mb-2">一般ノート</div>
                  <p className="text-sm text-base-content/80">{result.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 字形一覧 */}
      {bookTypeComponents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold">字形一覧</h3>
            <div className="badge badge-outline">
              {bookTypeComponents.reduce((total, category) => 
                total + (category?.glyphCards?.length || 0), 0
              )}種類
            </div>
          </div>
          
          <div className="grid gap-6">
            {bookTypeComponents.map((category) => 
              category && (
                <div key={category.categoryId} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold">{category.categoryName}</h4>
                    <div className="badge badge-soft badge-primary">
                      {category.glyphCards.length}例
                    </div>
                  </div>
                  <CardContainer title="" key={category.categoryId}>
                    {category.glyphCards.map((cardData: {
                      key: string;
                      cardTitle: string;
                      imgSrc: string;
                      sampleCount: string;
                    }) => (
                      <GlyphCard
                        key={cardData.key}
                        cardTitle={cardData.cardTitle}
                        imgSrc={cardData.imgSrc}
                        sampleCount={cardData.sampleCount}
                      />
                    ))}
                  </CardContainer>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default QueryEntryPage;