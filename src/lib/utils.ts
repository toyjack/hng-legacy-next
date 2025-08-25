import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * CSS クラス名を結合するユーティリティ関数
 * clsx と tailwind-merge を組み合わせて、条件付きクラスと Tailwind の競合を解決
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 文字列が空かどうかをチェック
 */
export function isEmpty(str?: string | null): str is undefined | null | '' {
  return !str || str.trim().length === 0;
}

/**
 * 日本語の文字数を数える（絵文字と結合文字を考慮）
 */
export function countJapaneseCharacters(str: string): number {
  // Unicode正規化とセグメント分割を使用
  return Array.from(new Intl.Segmenter('ja', { granularity: 'grapheme' }).segment(str)).length;
}

/**
 * 画像のロードエラーを処理するユーティリティ
 */
export function handleImageError(
  event: Event,
  fallbackSrc?: string,
  onError?: (error: Event) => void
) {
  const img = event.target as HTMLImageElement;
  
  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    // フォールバック画像も失敗した場合は非表示
    img.style.display = 'none';
  }
  
  if (onError) {
    onError(event);
  }
}

/**
 * URLが有効かどうかをチェック
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * 安全なローカルストレージアクセス
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};