"use client";

import React, { useState, useEffect, ReactNode, FC, useCallback, memo, useMemo } from "react";
import EnhancedProjectPreview from "./EnhancedProjectPreview";

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[]; 
  className?: string; 
  projects?: Array<{
    title: string;
    description: string;
    image: string;
    url?: string;
    githubUrl?: string;
    tech: string[];
  }>;
  onOpenChange?: (isOpen: boolean) => void;
}

// Utility function for darkening colors (no React hooks needed)
const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split("").map((c) => c + c).join("");
  }
  if (color.length !== 6) return hex; 

  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));

  const rr = r.toString(16).padStart(2, '0');
  const gg = g.toString(16).padStart(2, '0');
  const bb = b.toString(16).padStart(2, '0');

  return `#${rr}${gg}${bb}`.toUpperCase();
};

export const OptimizedFolder: FC<FolderProps> = memo(({
  color = "#22c55e", 
  size = 1,
  items = [], 
  className = "",
  projects = [],
  onOpenChange,
}) => {
  const maxItems = 6;
  const papers = Array(maxItems).fill(null).map((_, i) => projects[i] || null);

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );
  const [responsiveSize, setResponsiveSize] = useState(size);

  // Memoized calculations
  const folderBackColor = useMemo(() => darkenColor(color, 0.08), [color]);
  const paperColors = useMemo(() => [
    darkenColor("#FFFFFF", 0.12),
    darkenColor("#FFFFFF", 0.08),
    darkenColor("#FFFFFF", 0.04),
    "#FFFFFF",
    darkenColor("#FFFFFF", 0.02),
    darkenColor("#FFFFFF", 0.06)
  ], []);

  // Optimized click handler
  const handleClick = useCallback(() => {
    setOpen((prev) => {
      const newState = !prev;
      if (prev) { 
        setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      }
      onOpenChange?.(newState);
      return newState;
    });
  }, [maxItems, onOpenChange]);

  // Optimized mouse move handler with throttling
  const handlePaperMouseMove = useCallback((
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    
    requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) * 0.03; // Reduced sensitivity
      const offsetY = (e.clientY - centerY) * 0.03;
      
      setPaperOffsets((prev) => {
        const newOffsets = [...prev];
        newOffsets[index] = { x: offsetX, y: offsetY };
        return newOffsets;
      });
    });
  }, [open]);

  // Optimized mouse leave handler
  const handlePaperMouseLeave = useCallback((
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>, 
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 }; 
      return newOffsets;
    });
  }, []);

  // Optimized responsive sizing with better performance
  const getResponsiveSize = useCallback(() => {
    if (typeof window === 'undefined') return size;
    
    const width = window.innerWidth;
    const sizes = [
      { breakpoint: 480, size: 0.9 },
      { breakpoint: 640, size: 1.0 },
      { breakpoint: 768, size: 1.1 },
      { breakpoint: 1024, size: 1.0 },
      { breakpoint: 1280, size: 1.1 },
      { breakpoint: 1536, size: 1.2 },
      { breakpoint: 1920, size: 1.3 }
    ];

    for (const { breakpoint, size: responsiveSize } of sizes) {
      if (width < breakpoint) return responsiveSize;
    }
    return 1.4;
  }, [size]);

  // Optimized resize handler with better debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    let rafId: number;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        rafId = requestAnimationFrame(() => {
          setResponsiveSize(getResponsiveSize());
        });
      }, 150); // Increased debounce time
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [getResponsiveSize]);

  // Optimized transform calculations
  const getOpenTransform = useCallback((index: number) => {
    if (typeof window === 'undefined') return '';
    
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width < 1024;
    
    if (index < 3) {
      // Left side positions
      const leftPositions = isMobile ? [
        "translate(-180%, -180%) rotate(-5deg)",
        "translate(-180%, -80%) rotate(3deg)",
        "translate(-180%, 20%) rotate(-2deg)"
      ] : isTablet ? [
        "translate(-170%, -170%) rotate(-5deg)",
        "translate(-170%, -75%) rotate(3deg)",
        "translate(-170%, 20%) rotate(-2deg)"
      ] : [
        "translate(-150%, -150%) rotate(-5deg)",
        "translate(-150%, -65%) rotate(3deg)",
        "translate(-150%, 20%) rotate(-2deg)"
      ];
      
      const mouseTransform = `translate(${paperOffsets[index].x}px, ${paperOffsets[index].y}px)`;
      return `${leftPositions[index]} ${mouseTransform}`;
    } else {
      // Right side positions
      const rightPositions = isMobile ? [
        "translate(80%, -180%) rotate(5deg)",
        "translate(80%, -80%) rotate(-3deg)",
        "translate(80%, 20%) rotate(2deg)"
      ] : isTablet ? [
        "translate(70%, -170%) rotate(5deg)",
        "translate(70%, -75%) rotate(-3deg)",
        "translate(70%, 20%) rotate(2deg)"
      ] : [
        "translate(40%, -150%) rotate(5deg)",
        "translate(40%, -65%) rotate(-3deg)",
        "translate(40%, 20%) rotate(2deg)"
      ];
      
      const mouseTransform = `translate(${paperOffsets[index].x}px, ${paperOffsets[index].y}px)`;
      return `${rightPositions[index - 3]} ${mouseTransform}`;
    }
  }, [paperOffsets]);

  // Optimized project click handler
  const handleProjectClick = useCallback((project: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  // Memoized styles
  const folderBaseStyle = useMemo(() => ({
    transform: `scale(${responsiveSize})`,
    transformOrigin: 'center center' as const,
    display: 'inline-block' as const,
    transition: 'transform 0.3s ease-out',
    willChange: 'transform'
  }), [responsiveSize]);

  const folderInteractiveStyle = useMemo(() => ({
    transform: open ? "translateY(-8px)" : undefined,
  }), [open]);

  // Memoized paper size calculations
  const getPaperSizeClasses = useCallback((isOpen: boolean) => {
    if (typeof window === 'undefined') return isOpen ? "w-[200px] h-[140px]" : "w-[70%] h-[60%]";
    
    const width = window.innerWidth;
    if (isOpen) {
      if (width < 480) return "w-[180px] h-[130px]";
      if (width < 640) return "w-[200px] h-[140px]";
      if (width < 768) return "w-[220px] h-[150px]";
      return "w-[200px] h-[140px]";
    }
    return "w-[70%] h-[60%]";
  }, []);

  return (
    <div style={folderBaseStyle} className={className}>
      <div
        className={`group relative transition-all duration-300 ease-in-out cursor-pointer 
                    ${!open ? "hover:-translate-y-1" : ""}`}
        style={folderInteractiveStyle}
        onClick={handleClick}
      >
        <div
          className="relative w-[240px] h-[190px] rounded-bl-[22px] rounded-br-[22px] rounded-tr-[22px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[99%] left-0 w-[70px] h-[22px] 
                       rounded-tl-[12px] rounded-tr-[12px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          
          {papers.map((project, i) => {
            const sizeClasses = getPaperSizeClasses(open);
            const paperBaseTransform = !open ? 
              `translate(${-50 + (i % 3) * 5}%, ${10 + Math.floor(i / 3) * 5}%)` : 
              "";
            const paperHoverTransform = !open ? "group-hover:translate-y-0" : "hover:scale-105";
            
            return (
              <div
                key={i}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                onClick={(e) => project && handleProjectClick(project, e)}
                className={`absolute z-[${10 + i}] bottom-[10%] left-1/2 
                            transition-all duration-300 ease-in-out transform
                            ${paperHoverTransform} ${sizeClasses}
                            ${project ? 'cursor-pointer hover:shadow-xl' : ''}`}
                style={{
                  backgroundColor: paperColors[i],
                  borderRadius: "8px", 
                  boxShadow: project ? "0px 8px 24px rgba(0,0,0,0.15)" : "0px 2px 5px rgba(0,0,0,0.1)",
                  transform: open ? getOpenTransform(i) : paperBaseTransform,
                  willChange: open ? 'transform' : 'auto',
                  backfaceVisibility: 'hidden' as const,
                }}
              >
                {project && (
                  <EnhancedProjectPreview
                    project={project}
                    index={i}
                    onMouseMove={(e) => handlePaperMouseMove(e, i)}
                    onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                    onClick={(e) => handleProjectClick(project, e)}
                  />
                )}
              </div>
            );
          })}
          
          <div
            className={`absolute z-[40] w-full h-full origin-bottom transition-all duration-300 ease-in-out`}
            style={{
              backgroundColor: color,
              borderRadius: "0px 20px 20px 20px", 
              transform: open ? "translateY(20%) skewX(25deg) scaleY(0.5)" : "skewX(0deg) scaleY(1)",
              willChange: open ? 'transform' : 'auto',
            }}
          ></div>
          <div
            className={`absolute z-[41] w-full h-full origin-bottom transition-all duration-300 ease-in-out`}
            style={{
              backgroundColor: color, 
              borderRadius: "0px 20px 20px 20px",
              transform: open ? "translateY(20%) skewX(-25deg) scaleY(0.5)" : "skewX(0deg) scaleY(1)",
              willChange: open ? 'transform' : 'auto',
            }}
          ></div>
          
          {/* Enhanced Folder Label */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm z-50 text-center">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              <span>My Projects</span>
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

OptimizedFolder.displayName = 'OptimizedFolder';