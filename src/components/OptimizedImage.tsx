import React, { useState, useEffect } from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  containerClassName?: string;
  priority?: boolean;
}

// Map failed github/broken images to premium, high-resolution Unsplash alternatives
const getFallbackImageUrl = (src: string, alt: string): string => {
  const lowerSrc = (src || "").toLowerCase();
  const lowerAlt = (alt || "").toLowerCase();

  // 1. Hero / General Clinic Team/Interior
  if (
    lowerSrc.includes("18_35_29") || 
    lowerSrc.includes("18_53_33") || 
    lowerAlt.includes("inicio") || 
    lowerAlt.includes("hero") || 
    lowerAlt.includes("alta performance") ||
    lowerAlt.includes("duno")
  ) {
    return "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1600";
  }

  // 2. Services
  if (lowerSrc.includes("consulta") || lowerAlt.includes("consulta")) {
    return "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800";
  }
  if (lowerSrc.includes("emergencial") || lowerAlt.includes("emergência") || lowerAlt.includes("socorro") || lowerAlt.includes("urgência")) {
    return "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&q=80&w=800";
  }
  if (lowerSrc.includes("cirurgia") || lowerAlt.includes("cirurgia")) {
    return "https://images.unsplash.com/photo-1551601651-261551c9ab15?auto=format&fit=crop&q=80&w=800";
  }
  if (lowerSrc.includes("exames") || lowerSrc.includes("labora") || lowerAlt.includes("laboratório") || lowerAlt.includes("exame")) {
    return "https://images.unsplash.com/photo-1579154204601-01588f35116f?auto=format&fit=crop&q=80&w=800";
  }
  if (lowerSrc.includes("vacina") || lowerAlt.includes("vacina")) {
    return "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800";
  }
  if (lowerSrc.includes("interna") || lowerAlt.includes("internação")) {
    return "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800";
  }

  // 3. Pets (Cases/Results)
  if (lowerSrc.includes("pet01") || lowerAlt.includes("husky") || lowerAlt.includes("luke")) {
    return "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&q=80&w=800"; // Husky Luke
  }
  if (lowerSrc.includes("pet02") || lowerAlt.includes("papagaio") || lowerAlt.includes("fred") || lowerAlt.includes("ave")) {
    return "https://images.unsplash.com/photo-1552728089-57bdde30ebd3?auto=format&fit=crop&q=80&w=800"; // Papagaio Fred
  }
  if (lowerSrc.includes("pet03") || lowerAlt.includes("gato") || lowerAlt.includes("pipoca")) {
    return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"; // Gato Pipoca
  }

  // 4. Clinical Staff (vets)
  if (lowerSrc.includes("vt01") || lowerAlt.includes("anestesiologia") || lowerAlt.includes("odontologia") || lowerAlt.includes("beatriz")) {
    return "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"; // Female doc
  }
  if (lowerSrc.includes("vt02") || lowerAlt.includes("intensiva") || lowerAlt.includes("cirurgião") || lowerAlt.includes("felipe") || lowerAlt.includes("chefe")) {
    return "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"; // Male doc
  }
  if (lowerSrc.includes("vt03") || lowerAlt.includes("cardiologia") || lowerAlt.includes("marcelo")) {
    return "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800"; // Specialist male doc
  }

  // Generic fallback
  return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800";
};

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

  // Reset loading and error states when the src prop changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // Use the active source (fallback if there's an error or it's a known failing raw github source)
  const activeSrc = error ? getFallbackImageUrl(src, alt) : src;

  const isUnsplash = activeSrc && activeSrc.includes("images.unsplash.com");
  
  // Create a cheap, light, blur placeholder: ~60px width, low quality, high blur
  const placeholderUrl = isUnsplash 
    ? getUnsplashUrl(activeSrc, 60, 20, 10)
    : activeSrc;

  const quality = priority ? 85 : 75;
  const mainSrc = isUnsplash ? getUnsplashUrl(activeSrc, priority ? 1600 : 1000, quality) : activeSrc;

  // Viewport-based responsive breakpoints
  const srcsetWidths = priority 
    ? [640, 1024, 1440, 1920, 2560]
    : [320, 480, 640, 800, 1024, 1440];

  const srcSet = isUnsplash ? getUnsplashSrcSet(activeSrc, srcsetWidths, quality) : undefined;

  const hasObjectFit = className.includes("object-");

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {/* Blur-up Placeholder */}
      {!isLoaded && activeSrc && (
        <img
          src={placeholderUrl}
          alt={alt}
          className={`absolute inset-0 w-full h-full ${hasObjectFit ? "" : "object-cover"} filter blur-md transform scale-105 pointer-events-none z-10 duration-500 ease-out transition-opacity ${className}`}
          aria-hidden="true"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Main Image */}
      {activeSrc && (
        <img
          src={mainSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full ${hasObjectFit ? "" : "object-cover"} transition-all duration-700 ease-out ${
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
