# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `npm run dev` - Turbopackで開発サーバーを起動
- `npm run build` - プロダクション用アプリケーションをビルド  
- `npm run lint` - ESLintでコード品質をチェック
- `npm start` - プロダクション用サーバーを起動

## プロジェクトアーキテクチャ

### 目的
HNG Legacy Nextは、様々な歴史的資料からの詳細な字形情報を表示する漢字検索アプリケーションです。ユーザーは文字を検索し、異なる歴史文献や書道スタイルでの表現形式を確認できます。

### 技術スタック
- **フレームワーク**: Next.js 15 with App Router  
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS with DaisyUI components
- **データ処理**: csv-parse for CSV/TSV data files
- **UI言語**: 主要言語は日本語 (lang="ja")

### データアーキテクチャ

#### コアデータ型 (`src/types/data.ts`)
- `RawEntry` - 生CSVデータ構造、200+フィールド（各歴史文献資料の字形IDと集計情報）
- `CharacterEntry` - 処理済み文字エントリ、ネストされたglyphs配列を含む
- `GlyphData` - 個別字形データ（book_id, glyph_id, shape_count, sample_count, book_type）
- `BookMetadata` - 書籍メタデータ（id, title, type1, aliasなど）
- `SearchResults` - 検索結果コンテナ

#### データ処理パイプライン (`src/lib/data.ts`)
全データ関数はReactの`cache()`でパフォーマンス最適化：

1. **データソース**:
   - `src/data/all_table_v.5.0_2019-01-15.csv` - メイン文字データ（200+列）
   - `src/data/books.tsv` - 書籍/歴史文献資料メタデータ  
   - `src/data/itaiji.tsv` - 異体字関連データ

2. **主要変換フロー**:
   - `getAllEntries()` 全データソースを並列ロードしマッピングテーブル構築
   - CSVデータをネストされたglyphs配列を持つ構造化オブジェクトに変換
   - 各glyphは文字の異なる歴史文献での出現形式を表現
   - 関連文字検索をサポートするため動的に異体字検索マップを構築

3. **データアクセスパターン**:
   - 全book関連検索はパフォーマンス向上のためキャッシュされる
   - 字形はbook_type別に分類（中国写本、中国版本、日本写本、日本版本、韓国資料、その他資料）
   - `searchEntries(query)`で初文字による文字検索

#### ルート構造
- `/` - ホームページ、フォントサンプルとUIコンポーネントデモ
- `/query/[entryChar]` - 動的ルート、文字検索結果表示
- `/books/page.tsx` - 書籍インデックスページ
- `/books/[bookId]/page.tsx` - 個別書籍詳細ページ 
- `/api/entries` - APIエンドポイント、全エントリのJSONデータを返す
- `/(old)/search/*` - 旧検索ルート（非推奨）

### コンポーネントアーキテクチャ

#### 主要コンポーネント
- `GlyphCard` - 個別字形画像とメタデータ表示、cardTitleUrl属性でリンク対応
- `CardContainer` - 再利用可能なグループ化コンテンツコンテナ
- `ResultTabContainer` - タブナビゲーションコンポーネント
- `Header/Footer` - レイアウトコンポーネント

#### ファイル組織
- 文字画像は `/public/images/[book_id]/[glyph_id].png` に格納
- UIコンポーネントは機能別に `src/components/ui/` に配置
- 書籍タイプはconstantsの`BookTypeList`で分類

### 重要な実装詳細

#### パフォーマンス最適化
- 大量の文字データ処理（各レコード200+フィールド、異なる歴史文献資料をカバー）
- 全データ関数でReact cache()によるキャッシング
- 重複計算回避のためbook typeマップテーブルと異体字マップテーブルを事前構築

#### データ処理仕様  
- CSV解析は3行目から開始（ヘッダー情報をスキップ）
- 空フィールドは空文字列ではなくundefinedに変換
- 特定のbook ID（djt, dkw）は字形処理から除外
- 異体字はitaiji.tsvで関連付けと拡張

#### 書籍タイプカテゴリ (BookTypeList)
- CM: 中国写本
- CP: 中国版本  
- JM: 日本写本
- JP: 日本版本
- K: 韓国資料
- X: その他資料