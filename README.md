# HNG Legacy Next

> 歴史的な漢字字形を探索できるNext.js 15ベースの字形検索アプリケーション

## 概要

HNG Legacy Nextは、様々な歴史文献から収集された漢字の字形データを検索・表示するWebアプリケーションです。ユーザーは文字を検索し、異なる歴史文献や書道スタイルでの字形を確認できます。

## 主要機能

- 📚 **包括的な字形検索**: 200以上のフィールドを持つ詳細な文字データベース
- 🏛️ **歴史文献対応**: 中国・日本・韓国の写本・版本資料をカバー
- 🖼️ **字形画像表示**: 実際の字形画像とメタデータを表示
- 🌐 **多言語対応**: 国際化（i18n）サポート
- ⚡ **高性能**: React cache()によるデータキャッシングで最適化

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + DaisyUI
- **データ処理**: csv-parse
- **国際化**: next-intl
- **UI言語**: 日本語（メイン）

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/hng-legacy-next.git
cd hng-legacy-next

# 依存関係をインストール
pnpm install
```

## 開発

```bash
# 開発サーバーを起動（Turbopack使用）
pnpm run dev

# ブラウザでアクセス
# http://localhost:3000
```

## ビルド・デプロイ

```bash
# プロダクション用ビルド
pnpm run build

# プロダクションサーバー起動
pnpm start

# コード品質チェック
pnpm run lint
```

## プロジェクト構造

```
src/
├── app/                    # App Router ルート
│   ├── [locale]/          # 国際化対応ルート
│   ├── books/             # 書籍情報ページ
│   ├── query/             # 検索結果ページ
│   └── api/               # API エンドポイント
├── components/            # React コンポーネント
│   └── ui/               # UI コンポーネント
├── data/                 # データファイル
│   ├── all_table_v.5.0_2019-01-15.csv  # メイン文字データ
│   ├── books.tsv         # 書籍メタデータ
│   └── itaiji.tsv        # 異体字データ
├── lib/                  # ユーティリティ関数
└── types/                # TypeScript 型定義
```

## データアーキテクチャ

### 書籍タイプ分類

- **CM**: 中国写本
- **CP**: 中国版本
- **JM**: 日本写本
- **JP**: 日本版本
- **K**: 韓国資料
- **X**: その他資料

### 主要データ型

- `RawEntry`: 生CSVデータ構造
- `CharacterEntry`: 処理済み文字エントリ
- `GlyphData`: 個別字形データ
- `BookMetadata`: 書籍メタデータ

## API エンドポイント

### `GET /api/entries`

全エントリのJSONデータを返します。

```json
{
  "entries": [...],
  "total": 1000
}
```

## デプロイ

このプロジェクトは以下のプラットフォームにデプロイ可能です：

- [Vercel](https://vercel.com/new) (推奨)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

### Vercel でのデプロイ

1. GitHubリポジトリをVercelにインポート
2. 自動的にビルド・デプロイが開始されます

## コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成: `git checkout -b feature/amazing-feature`
3. 変更をコミット: `git commit -m 'feat: add amazing feature'`
4. ブランチにプッシュ: `git push origin feature/amazing-feature`
5. プルリクエストを作成

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 開発チーム

- **メンテナー**: Guanwei Liu
- **コントリビューター**: [GitHub Contributors](https://github.com/your-username/hng-legacy-next/contributors) をご覧ください

## サポート

問題や質問がある場合は、[Issues](https://github.com/your-username/hng-legacy-next/issues) ページで報告してください。