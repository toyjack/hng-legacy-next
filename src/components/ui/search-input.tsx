'use client';

import { useState, forwardRef, KeyboardEvent } from 'react';
import { SearchInputProps } from '@/types/components';
import { cn } from '@/lib/utils';
import Button from './button';
import { useTranslations } from 'next-intl';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      onSearch,
      loading = false,
      variant = 'bordered',
      size = 'md',
      placeholder = "",
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = useState('');
    const t = useTranslations();

    const handleSubmit = () => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };

    const baseClasses = 'input w-full';
    
    const variants = {
      default: '',
      bordered: 'input-bordered',
      ghost: 'input-ghost',
    };

    const sizes = {
      sm: 'input-sm',
      md: '',
      lg: 'input-lg',
    };

    const inputClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <div className="flex gap-2 w-full max-w-md">
        <input
          ref={ref}
          type="text"
          className={inputClasses}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          {...props}
        />
        <Button
          variant="primary"
          size={size}
          onClick={handleSubmit}
          loading={loading}
          disabled={!query.trim()}
        >
          {t('search')}
        </Button>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;