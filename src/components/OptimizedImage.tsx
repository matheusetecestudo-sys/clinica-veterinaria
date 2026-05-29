import React, { useState } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  containerClassName?: string;
  priority?: boolean;
}

// Manipulates Unsplash parameters for loading optimal dimensions and qualities
const getUnsplashUrl = (url: string, width: number, quality: number = 80, blur?: number) => {
  if (!url.includes("images.unsplash.com")) return url;
  
  try {
    const baseUrl = url.split("?")[0];
    const params = new URLSearchParams(url.split("?")[1] || "");
    
    params.set("auto", "format");
    params.set("fit", "crop");
    params.set("w", width.toString());
    params.set("q", quality.toString());
    if (blur !== undefined) {
      params.set("blur", blur.toString());
    } else {
      params.delete("blur");
    }
    
    return `${baseUrl}?${params.toString()}`;
  } catch (e) {
    return url;
  }
};

// Generates an Unsplash-responsive srcSet
const getUnsplashSrcSet = (url: string, widths: number[], quality: number = 80) => {
  if (!url.includes("images.unsplash.com")) return undefined;
  return widths.map((w) => `${getUnsplashUrl(url, w, quality)} ${w}w`).join(", ");
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  sizes = "100vw",
  containerClassName = "",
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const isUnsplash = src && src.includes("images.unsplash.com");
  
  // Create a cheap, light, blur placeholder: ~60px width, low quality, high blur
  const placeholderUrl = isUnsplash 
    ? getUnsplashUrl(src, 60, 20, 10)
    : src;

  const quality = priority ? 85 : 75;
  const mainSrc = isUnsplash ? getUnsplashUrl(src, priority ? 1600 : 1000, quality) : src;

  // Viewport-based responsive breakpoints
  const srcsetWidths = priority 
    ? [640, 1024, 1440, 1920, 2560]
    : [320, 480, 640, 800, 1024, 1440];

  const srcSet = isUnsplash ? getUnsplashSrcSet(src, srcsetWidths, quality) : undefined;

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {/* Blur-up Placeholder */}
      {(!isLoaded || error) && src && (
        <img
          src={placeholderUrl}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover filter blur-md transform scale-105 pointer-events-none z-10 duration-500 ease-out transition-opacity ${className}`}
          aria-hidden="true"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Main Image */}
      {src && (
        <img
          src={mainSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded 
              ? "opacity-100 scale-100 filter-none" 
              : "opacity-0 scale-98 blur-[2px]"
          } ${className}`}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};
