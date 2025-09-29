'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface BentoCardProps {
  title: string;
  description?: string;
  label?: string;
  color?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  spanLarge?: boolean;
  spanWide?: boolean;
  spanTall?: boolean;
  positionSpecial?: boolean;
}

const BentoCard = ({
  title,
  description,
  label,
  color = '#060010',
  className = '',
  children,
  onClick,
  href,
  target,
  spanLarge = false,
  spanWide = false,
  spanTall = false,
  positionSpecial = false
}: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Handle mouse movement for spotlight and glow effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate relative position for CSS variables
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x: mouseX, y: mouseY });
    setGlowPosition({ x: relativeX, y: relativeY });
    
    // Calculate glow intensity based on distance from center
    const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
    const intensity = Math.max(0, 1 - (distance / maxDistance));
    setGlowIntensity(intensity);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGlowIntensity(0);
  };

  // Determine grid classes based on span props
  const getGridClasses = () => {
    let classes = '';
    
    if (spanLarge) {
      classes += ' col-span-2 row-span-2';
    } else if (spanWide) {
      classes += ' col-span-2';
    } else if (spanTall) {
      classes += ' row-span-2';
    } else if (positionSpecial) {
      classes += ' col-start-4 row-start-3';
    }
    
    return classes;
  };

  const CardContent = (
    <motion.div
      ref={cardRef}
      className={`
        relative group
        bg-[#060010]
        rounded-[20px]
        p-5
        border border-[#392e4e]
        overflow-hidden
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:transform hover:-translate-y-[2px]
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]
        ${getGridClasses()}
        ${className}
      `}
      style={{
        backgroundColor: color,
        '--glow-x': `${glowPosition.x}%`,
        '--glow-y': `${glowPosition.y}%`,
        '--glow-intensity': glowIntensity,
        '--glow-radius': '200px',
        '--glow-color': '0, 255, 136', // Changed to green
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Border Glow Effect */}
      <div 
        className="absolute inset-0 rounded-[20px] p-1.5 pointer-events-none z-10"
        style={{
          background: `radial-gradient(${glowIntensity * 200}px circle at var(--glow-x) var(--glow-y), 
            rgba(0, 255, 136, ${glowIntensity * 0.8}) 0%, 
            rgba(0, 255, 136, ${glowIntensity * 0.4}) 30%, 
            transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          {label && (
            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
              {label}
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
            {title}
          </h3>
          
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
              {description}
            </p>
          )}

          {children && (
            <div className="mt-auto">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Interactive overlay for enhanced hover effect */}
      <div 
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--glow-x) var(--glow-y), 
            rgba(0, 255, 136, ${glowIntensity * 0.1}) 0%, 
            transparent 70%)`,
        }}
      />
    </motion.div>
  );

  // Wrap in link if href is provided
  if (href) {
    return (
      <a href={href} target={target} className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

export default BentoCard;