# コンポーネントドキュメント

このドキュメントでは、HNG Legacy Next プロジェクトの再利用可能なコンポーネントの使用方法とベストプラクティスについて説明します。

## 📦 コンポーネント概要

### 基本 UI コンポーネント (`/src/components/ui/`)

- **Button** - 汎用ボタンコンポーネント
- **SearchInput** - 検索入力コンポーネント  
- **LoadingSpinner** - ローディング状態コンポーネント
- **ErrorBoundary** - エラー境界コンポーネント
- **TabContainer** - タブコンテナコンポーネント

### ビジネスコンポーネント (`/src/components/`)

- **CardContainer** - カードコンテナコンポーネント
- **GlyphCard** - 字形カードコンポーネント
- **Header** - ヘッダーナビゲーションコンポーネント
- **Footer** - フッターコンポーネント
- **HelpSection** - ヘルプセクションコンポーネント

## 🎯 コンポーネント詳細

### Button コンポーネント

様々なバリエーションと状態をサポートする汎用ボタンコンポーネント。

```tsx
import { Button } from '@/components/ui';

// 基本的な使用方法
<Button variant="primary" size="md">
  ボタン
</Button>

// ローディング状態
<Button loading={true}>
  読み込み中...
</Button>

// 全幅ボタン
<Button fullWidth variant="secondary">
  幅いっぱい
</Button>
```

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|-----------|-----|------------|-----|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outline'` | `'primary'` | ボタンのバリエーション |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ボタンのサイズ |
| `loading` | `boolean` | `false` | ローディング状態を表示するか |
| `fullWidth` | `boolean` | `false` | 全幅で表示するか |

### SearchInput コンポーネント

入力フィールドと検索ボタンを含む検索コンポーネント。

```tsx
import { SearchInput } from '@/components/ui';

<SearchInput
  placeholder="文字を入力"
  onSearch={(query) => {
    console.log('検索:', query);
  }}
  loading={false}
/>
```

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|-----------|-----|------------|-----|
| `onSearch` | `(query: string) => void` | - | 検索コールバック関数（必須） |
| `loading` | `boolean` | `false` | ローディング状態を表示するか |
| `variant` | `'default' \| 'bordered' \| 'ghost'` | `'bordered'` | 入力フィールドのバリエーション |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | コンポーネントのサイズ |

### CardContainer コンポーネント

コンテンツのコレクションをラップして表示するカードコンテナコンポーネント。

```tsx
import { CardContainer } from '@/components/ui';

<CardContainer 
  title="中国写本" 
  variant="outlined" 
  size="lg"
>
  {/* 子コンポーネントの内容 */}
</CardContainer>
```

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|-----------|-----|------------|-----|
| `title` | `string` | - | コンテナのタイトル（必須） |
| `variant` | `'default' \| 'outlined' \| 'filled'` | `'default'` | コンテナのバリエーション |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | コンテナのサイズ |

### GlyphCard コンポーネント

字形画像と関連情報を表示する字形カードコンポーネント。

```tsx
import { GlyphCard } from '@/components/ui';

<GlyphCard
  cardTitle="康熙字典"
  imgSrc="/images/khi/12345.png"
  sampleCount="15"
  onImageClick={() => {
    console.log('画像がクリックされました');
  }}
  onImageError={(error) => {
    console.error('画像読み込みエラー:', error);
  }}
/>
```

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|-----------|-----|------------|-----|
| `cardTitle` | `string` | - | カードのタイトル（必須） |
| `imgSrc` | `string` | - | 画像のソースパス（必須） |
| `sampleCount` | `string` | - | サンプル数（必須） |
| `onImageClick` | `() => void` | - | 画像クリック時のコールバック |
| `onImageError` | `(error: Event) => void` | - | 画像エラー時のコールバック |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | 画像読み込み戦略 |

### TabContainer コンポーネント

複数のコンテンツパネルを整理するタブコンテナコンポーネント。

```tsx
import { TabContainer } from '@/components/ui';

const tabs = [
  {
    label: '中国写本',
    content: <div>中国写本の内容</div>
  },
  {
    label: '日本写本',
    content: <div>日本写本の内容</div>
  },
  {
    label: '無効',
    content: <div>表示されない</div>,
    disabled: true
  }
];

<TabContainer
  tabs={tabs}
  defaultActiveTab={0}
  variant="lifted"
  onTabChange={(index) => {
    console.log('タブ変更:', index);
  }}
/>
```

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|-----------|-----|------------|-----|
| `tabs` | `TabItem[]` | - | タブの配列（必須） |
| `defaultActiveTab` | `number` | `0` | デフォルトのアクティブタブインデックス |
| `variant` | `'default' \| 'lifted' \| 'boxed'` | `'default'` | タブのバリエーション |
| `onTabChange` | `(activeIndex: number) => void` | - | タブ切り替え時のコールバック |

### Header コンポーネント

タイトル、検索、ナビゲーションリンクを含むヘッダーナビゲーションコンポーネント。

```tsx
import { Header } from '@/components/ui';

<Header
  title="HNG単字検索"
  showSearch={true}
  searchProps={{
    placeholder: "文字を検索",
    loading: false
  }}
/>
```

#### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|-----------|-----|------------|-----|
| `title` | `string` | `'HNG単字検索'` | ページタイトル |
| `showSearch` | `boolean` | `true` | 検索ボックスを表示するか |
| `searchProps` | `Partial<SearchInputProps>` | `{}` | 検索ボックスのプロパティ |

### LoadingSpinner コンポーネント

ローディングアニメーションを表示するローディング状態コンポーネント。

```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner size="lg" variant="spinner" />
```

### ErrorBoundary コンポーネント

コンポーネントエラーをキャッチして処理するエラー境界コンポーネント。

```tsx
import { ErrorBoundary } from '@/components/ui';

<ErrorBoundary
  fallback={<div>カスタムエラー画面</div>}
  onError={(error, errorInfo) => {
    console.error('エラー発生:', error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

## 🎨 スタイルガイド

### CSS クラス命名規則

- Tailwind CSS ユーティリティクラスを使用
- `cn()` 関数でクラス名をマージ
- 条件付きスタイルとレスポンシブデザインをサポート

### テーマサポート

全てのコンポーネントは DaisyUI テーマシステムに対応：

- `bg-base-100`, `bg-base-200`, `bg-base-300` - 背景色
- `text-base-content` - テキスト色
- `btn-primary`, `btn-secondary` - テーマカラーボタン

## 📱 レスポンシブデザイン

### ブレークポイントプレフィックス

- `sm:` - 640px 以上
- `md:` - 768px 以上  
- `lg:` - 1024px 以上
- `xl:` - 1280px 以上

### モバイルファースト

全てのコンポーネントはモバイルファーストのレスポンシブデザイン原則を採用。

## ⚡ パフォーマンス最適化

### 画像処理

- デフォルトで `loading="lazy"` 遅延読み込みを使用
- 自動エラーハンドリングと代替表示
- ローディング状態インジケーターをサポート

### コンポーネント最適化

- `React.forwardRef` を使用して参照の転送をサポート
- 不要な再レンダリングを回避
- `useState` と `useEffect` の適切な使用

## 🔧 開発ガイド

### 新しいコンポーネントの追加

1. `/src/types/components.ts` で型を定義
2. 適切なディレクトリにコンポーネントファイルを作成
3. `/src/components/ui/index.ts` にエクスポートを追加
4. このドキュメントを更新

### ベストプラクティス

- 常に TypeScript 型を使用
- 意味のあるデフォルト値を提供
- `className` プロパティによる上書きをサポート
- 適切な `aria-*` 属性を追加
- 国際化の考慮（日本語優先）

## 🔄 移行ガイド

### 旧コンポーネントからの移行

旧コンポーネントはまだ使用可能ですが、新しいコンポーネントシステムへの段階的移行を推奨：

```tsx
// 旧い方法
import CardContainer from '@/components/card-container';

// 新しい方法（推奨）
import { CardContainer } from '@/components/ui';
```

### 破壊的変更

- `ResultTabContainer` → `TabContainer`：API が変更されているため、リファクタリングが必要
- `Header`：検索機能がコンポーネントに統合されました