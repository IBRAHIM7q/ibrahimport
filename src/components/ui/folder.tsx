"use client"; 

import React, { useState, useEffect, ReactNode, FC } from "react"; 

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

export const Folder: FC<FolderProps> = ({
  color = "#00d8ff", 
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

  const folderBackColor = darkenColor(color, 0.08); 
  const paperColors = [
    darkenColor("#FFFFFF", 0.12),
    darkenColor("#FFFFFF", 0.08),
    darkenColor("#FFFFFF", 0.04),
    "#FFFFFF",
    darkenColor("#FFFFFF", 0.02),
    darkenColor("#FFFFFF", 0.06)
  ];

  const handleClick = () => {
    setOpen((prev) => {
      const newState = !prev;
      if (prev) { 
        setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      }
      // Notify parent component of state change
      if (onOpenChange) {
        onOpenChange(newState);
      }
      return newState;
    });
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.05; 
    const offsetY = (e.clientY - centerY) * 0.05; 
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>, 
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 }; 
      return newOffsets;
    });
  };

  // Enhanced responsive sizing based on screen width with more breakpoints
  const getResponsiveSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 0.9;      // Extra small mobile
      if (width < 640) return 1.0;      // Small mobile
      if (width < 768) return 1.1;      // Large mobile
      if (width < 1024) return 1.0;     // Tablet
      if (width < 1280) return 1.1;     // Small desktop
      if (width < 1536) return 1.2;     // Desktop
      if (width < 1920) return 1.3;     // Large desktop
      return 1.4;                       // Extra large desktop
    }
    return size;
  };

  const [responsiveSize, setResponsiveSize] = useState(getResponsiveSize());

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      // Debounce resize events to prevent excessive updates
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setResponsiveSize(getResponsiveSize());
      }, 100); // 100ms debounce for smoother transitions
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const folderBaseStyle: React.CSSProperties = {
    transform: `scale(${responsiveSize})`,
    transformOrigin: 'center center', 
    display: 'inline-block',
    transition: 'transform 0.3s ease-out'
  };
  
  const folderInteractiveStyle: React.CSSProperties = {
    transform: open ? "translateY(-8px)" : undefined,
  };

  const getOpenTransform = (index: number) => {
    // For the first 3 projects, position them on the left side
    // For the next 3 projects, position them on the right side
    // Enhanced responsive positions for all screen sizes
    if (typeof window === 'undefined') return '';
    
    const width = window.innerWidth;
    const isXSMobile = width < 480;      // Extra small mobile
    const isSMobile = width < 640 && width >= 480;      // Small mobile
    const isMobile = width < 768 && width >= 640;      // Large mobile
    const isTablet = width < 1024 && width >= 768;      // Tablet
    const isSDesktop = width < 1280 && width >= 1024;   // Small desktop
    const isDesktop = width < 1536 && width >= 1280;    // Desktop
    const isLDesktop = width < 1920 && width >= 1536;   // Large desktop
    const isXLDesktop = width >= 1920;                 // Extra large desktop
    
    if (index < 3) {
      // Left side - stacked vertically with responsive positioning
      let leftPositions;
      if (isXSMobile) {
        leftPositions = [
          "translate(-160%, -160%) rotate(-5deg)",   // Top left
          "translate(-160%, -70%) rotate(3deg)",     // Middle left
          "translate(-160%, 20%) rotate(-2deg)"      // Bottom left
        ];
      } else if (isSMobile) {
        leftPositions = [
          "translate(-170%, -170%) rotate(-5deg)",   // Top left
          "translate(-170%, -75%) rotate(3deg)",     // Middle left
          "translate(-170%, 20%) rotate(-2deg)"      // Bottom left
        ];
      } else if (isMobile) {
        leftPositions = [
          "translate(-180%, -180%) rotate(-5deg)",   // Top left
          "translate(-180%, -80%) rotate(3deg)",     // Middle left
          "translate(-180%, 20%) rotate(-2deg)"      // Bottom left
        ];
      } else if (isTablet) {
        leftPositions = [
          "translate(-170%, -170%) rotate(-5deg)",   // Top left
          "translate(-170%, -75%) rotate(3deg)",     // Middle left
          "translate(-170%, 20%) rotate(-2deg)"      // Bottom left
        ];
      } else if (isSDesktop) {
        leftPositions = [
          "translate(-160%, -160%) rotate(-5deg)",   // Top left
          "translate(-160%, -70%) rotate(3deg)",     // Middle left
          "translate(-160%, 20%) rotate(-2deg)"      // Bottom left
        ];
      } else {
        // Desktop and larger
        leftPositions = [
          "translate(-150%, -150%) rotate(-5deg)",   // Top left
          "translate(-150%, -65%) rotate(3deg)",     // Middle left
          "translate(-150%, 20%) rotate(-2deg)"      // Bottom left
        ];
      }
      
      const mouseTransform = `translate(${paperOffsets[index].x}px, ${paperOffsets[index].y}px)`;
      return `${leftPositions[index]} ${mouseTransform}`;
    } else {
      // Right side - stacked vertically with responsive positioning
      let rightPositions;
      if (isXSMobile) {
        rightPositions = [
          "translate(60%, -160%) rotate(5deg)",      // Top right
          "translate(60%, -70%) rotate(-3deg)",      // Middle right
          "translate(60%, 20%) rotate(2deg)"         // Bottom right
        ];
      } else if (isSMobile) {
        rightPositions = [
          "translate(70%, -170%) rotate(5deg)",      // Top right
          "translate(70%, -75%) rotate(-3deg)",      // Middle right
          "translate(70%, 20%) rotate(2deg)"         // Bottom right
        ];
      } else if (isMobile) {
        rightPositions = [
          "translate(80%, -180%) rotate(5deg)",      // Top right
          "translate(80%, -80%) rotate(-3deg)",      // Middle right
          "translate(80%, 20%) rotate(2deg)"         // Bottom right
        ];
      } else if (isTablet) {
        rightPositions = [
          "translate(70%, -170%) rotate(5deg)",      // Top right
          "translate(70%, -75%) rotate(-3deg)",      // Middle right
          "translate(70%, 20%) rotate(2deg)"         // Bottom right
        ];
      } else if (isSDesktop) {
        rightPositions = [
          "translate(50%, -160%) rotate(5deg)",      // Top right
          "translate(50%, -70%) rotate(-3deg)",      // Middle right
          "translate(50%, 20%) rotate(2deg)"         // Bottom right
        ];
      } else {
        // Desktop and larger
        rightPositions = [
          "translate(40%, -150%) rotate(5deg)",      // Top right
          "translate(40%, -65%) rotate(-3deg)",      // Middle right
          "translate(40%, 20%) rotate(2deg)"         // Bottom right
        ];
      }
      
      const mouseTransform = `translate(${paperOffsets[index].x}px, ${paperOffsets[index].y}px)`;
      return `${rightPositions[index - 3]} ${mouseTransform}`;
    }
  };

  const handleProjectClick = (project: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  const getProjectPreview = (project: any, index: number) => {
    if (!project) return null;
    
    return (
      <div className="w-full h-full flex flex-col p-3">
        <div className="flex-1 relative overflow-hidden rounded mb-2">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="text-white text-center px-2">
              <div className="font-bold text-sm mb-1">{project.title}</div>
              <div className="text-xs opacity-90 leading-tight">{project.description}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 2).map((tech: string, techIndex: number) => (
            <span key={techIndex} className="text-xs bg-black/30 text-white px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
          {project.tech.length > 2 && (
            <span className="text-xs bg-black/30 text-white px-2 py-1 rounded-full">
              +{project.tech.length - 2}
            </span>
          )}
        </div>
      </div>
    );
  };
  
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
            let sizeClasses = ""; 
            const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
            const isXSMobile = width < 480;
            const isSMobile = width < 640 && width >= 480;
            const isMobile = width < 768 && width >= 640;
            
            if (open) {
              if (isXSMobile) {
                sizeClasses = "w-[180px] h-[130px]";
              } else if (isSMobile) {
                sizeClasses = "w-[200px] h-[140px]";
              } else if (isMobile) {
                sizeClasses = "w-[220px] h-[150px]";
              } else {
                sizeClasses = "w-[200px] h-[140px]";
              }
            } else {
              sizeClasses = "w-[70%] h-[60%]";
            }
            
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
                            ${project ? 'cursor-pointer hover:shadow-lg' : ''}`}
                style={{
                  backgroundColor: paperColors[i],
                  borderRadius: "8px", 
                  boxShadow: project ? "0px 4px 12px rgba(0,0,0,0.15)" : "0px 2px 5px rgba(0,0,0,0.1)",
                  transform: open ? getOpenTransform(i) : paperBaseTransform,
                }}
              >
                {project && getProjectPreview(project, i)}
              </div>
            );
          })}
          <div
            className={`absolute z-[40] w-full h-full origin-bottom transition-all duration-300 ease-in-out`}
            style={{
              backgroundColor: color,
              borderRadius: "0px 20px 20px 20px", 
              transform: open ? "translateY(20%) skewX(25deg) scaleY(0.5)" : "skewX(0deg) scaleY(1)",
            }}
          ></div>
          <div
            className={`absolute z-[41] w-full h-full origin-bottom transition-all duration-300 ease-in-out`}
            style={{
              backgroundColor: color, 
              borderRadius: "0px 20px 20px 20px",
              transform: open ? "translateY(20%) skewX(-25deg) scaleY(0.5)" : "skewX(0deg) scaleY(1)",
            }}
          ></div>
          
          {/* Folder Label */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-semibold text-sm z-50">
            My Projects
          </div>
        </div>
      </div>
    </div>
  );
};