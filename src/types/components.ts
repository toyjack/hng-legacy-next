import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// 基础属性接口
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// 卡片容器属性
export interface CardContainerProps extends BaseComponentProps {
  title: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

// 字形卡片属性
export interface GlyphCardProps {
  cardTitle: string;
  imgSrc: string;
  sampleCount: string;
  className?: string;
  onImageClick?: () => void;
  onImageError?: (error: Event) => void;
  loading?: 'lazy' | 'eager';
}

// 标签选项卡属性
export interface TabItem {
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabContainerProps extends BaseComponentProps {
  tabs: TabItem[];
  defaultActiveTab?: number;
  variant?: 'default' | 'lifted' | 'boxed';
  onTabChange?: (activeIndex: number) => void;
}

// 搜索组件属性
export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  onSearch: (query: string) => void;
  loading?: boolean;
  variant?: 'default' | 'bordered' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

// 按钮组件属性
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

// 加载状态属性
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'ring';
  className?: string;
}

// 错误边界属性
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// 导航栏属性
export interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  searchProps?: Partial<SearchInputProps>;
  className?: string;
}

// 页脚属性
export interface FooterProps extends BaseComponentProps {
  copyright?: string;
  links?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

// 帮助部分属性
export interface HelpSectionProps extends BaseComponentProps {
  title?: string;
  sections?: Array<{
    content: ReactNode;
  }>;
}

// 通用布局属性
export interface LayoutProps extends BaseComponentProps {
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}