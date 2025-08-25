"use client";

import { useState, useEffect, useRef } from 'react';
import { GlyphCardProps } from '@/types/components';
import { cn, handleImageError } from '@/lib/utils';

function GlyphCard({ 
  cardTitle, 
  imgSrc, 
  sampleCount, 
  className,
  onImageClick,
  onImageError,
  loading = 'lazy'
}: GlyphCardProps) {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // 当图片路径变化时重置状态
  useEffect(() => {
    setImageLoading(false);
    setImageError(false);
  }, [imgSrc]);

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imgSrc);
    setImageLoading(false);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('Image failed to load:', imgSrc);
    setImageLoading(false);
    setImageError(true);
    if (onImageError) {
      onImageError(event.nativeEvent);
    }
  };

  const cardClasses = cn(
    'card w-32 bg-base-100 shadow-sm hover:shadow-md transition-shadow',
    onImageClick && 'cursor-pointer hover:scale-105 transition-transform',
    className
  );

  return (
    <div className={cardClasses} onClick={onImageClick}>
      <div className="card-body p-2">
        <h2 className="card-title text-xs font-medium leading-tight" title={cardTitle}>
          {cardTitle}
        </h2>
      </div>

      <figure className="relative min-h-16 bg-base-200">
        {!imageError ? (
          <img
            className="w-full h-auto"
            src={imgSrc}
            alt={`字形 ${cardTitle}`}
            loading={loading}
            onLoad={handleImageLoad}
            onError={handleError}
          />
        ) : (
          <div className="w-full h-16 bg-base-200 flex items-center justify-center text-xs text-base-content/60">
            画像なし
          </div>
        )}
      </figure>

      <div className="p-2 bg-base-100 w-full">
        <p className="text-center text-xs font-medium">
          {sampleCount}例
        </p>
      </div>
    </div>
  );
}

export default GlyphCard;
