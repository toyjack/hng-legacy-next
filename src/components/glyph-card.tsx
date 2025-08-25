"use client";

import { useState, useEffect } from "react";
import { GlyphCardProps } from "@/types/components";
import { cn } from "@/lib/utils";

function GlyphCard({
  cardTitle,
  imgSrc,
  sampleCount,
  className,
  onImageClick,
  onImageError,
  loading = "lazy",
}: GlyphCardProps) {
  const [imageError, setImageError] = useState(false);

  // 当图片路径变化时重置状态
  useEffect(() => {
    setImageError(false);
  }, [imgSrc]);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load:", imgSrc);
    setImageError(true);
    if (onImageError) {
      onImageError(event.nativeEvent);
    }
  };

  const cardClasses = cn(
    "card w-32 bg-base-100 shadow-sm hover:shadow-md transition-shadow",
    onImageClick && "cursor-pointer hover:scale-105 transition-transform",
    className
  );

  return (
    <div className={cardClasses} onClick={onImageClick}>
      <div className="card-body p-2">
        <h2
          className="card-title text-xs font-medium leading-tight"
          title={cardTitle}
        >
          {cardTitle}
        </h2>
      </div>

      <figure className="relative min-w-32 bg-base-200">
        {!imageError ? (
          <img
            className="w-full h-auto"
            src={imgSrc}
            alt={`字形 ${cardTitle}`}
            loading={loading}
            onError={handleError}
          />
        ) : (
          <div className="w-full h-16 bg-base-200 flex items-center justify-center text-xs text-base-content/60">
            画像なし
          </div>
        )}
      </figure>

      {sampleCount && (
        <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
          {sampleCount}
        </div>
      )}
    </div>
  );
}

export default GlyphCard;
