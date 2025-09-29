'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface BentoCardProps {
  title: string;
  description: string;
  label?: string;
  color?: string;
  className?: string;
  span?: {
    cols?: number;
    rows?: number;
  };
  children?: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  label,
  color = '#060010',
  className = '',
  span = { cols: 1, rows: 1 },
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getGridStyles = () => {
    const styles: React.CSSProperties = {};
    if (span.cols && span.cols > 1) {
      styles.gridColumn = `span ${span.cols}`;
    }
    if (span.rows && span.rows > 1) {
      styles.gridRow = `span ${span.rows}`;
    }
    return styles;
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-2xl
        border border-[#392e4e]
        transition-all duration-300 ease-in-out
        ${className}
      `}
      style={{
        ...getGridStyles(),
        backgroundColor: color,
        padding: '1.25rem',
        minHeight: '200px',
        aspectRatio: span.cols === 2 && span.rows === 2 ? 'auto' : '4/3'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -2,
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Content Structure */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          {label && (
            <span className="text-xs font-medium text-white/70 bg-white/10 px-2 py-1 rounded-full">
              {label}
            </span>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>
        </div>
        
        {/* Additional Content */}
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>
      
      {/* Hover overlay effect */}
      <div className={`
        absolute inset-0 rounded-2xl
        bg-gradient-to-br from-white/5 to-transparent
        pointer-events-none transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
    </motion.div>
  );
};

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      max-w-[54rem] mx-auto
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      gap-2 p-3
      text-[clamp(1rem,0.9rem+0.5vw,1.5rem)]
      ${className}
    `}>
      {children}
    </div>
  );
};

// Export combined component
const BentoGridSystem: React.FC<{
  items: Array<{
    id: number;
    title: string;
    description: string;
    label?: string;
    color?: string;
    span?: {
      cols?: number;
      rows?: number;
    };
    children?: React.ReactNode;
  }>;
  className?: string;
}> = ({ items, className = '' }) => {
  return (
    <BentoGrid className={className}>
      {items.map((item, index) => (
        <BentoCard
          key={item.id}
          title={item.title}
          description={item.description}
          label={item.label}
          color={item.color}
          span={item.span}
          className={item.id === 3 ? 'sm:col-span-2 sm:row-span-2' : ''}
        >
          {item.children}
        </BentoCard>
      ))}
    </BentoGrid>
  );
};

export default BentoGridSystem;
export { BentoCard, BentoGrid };