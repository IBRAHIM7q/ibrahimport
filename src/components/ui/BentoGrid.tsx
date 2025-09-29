'use client';

import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

const BentoGrid = ({ children, className = '' }: BentoGridProps) => {
  return (
    <div className={`
      max-w-[54rem] mx-auto
      p-3
      gap-2
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      auto-rows-[200px]
      sm:auto-rows-[180px]
      text-[clamp(1rem,0.9rem+0.5vw,1.5rem)]
      ${className}
    `}>
      {children}
    </div>
  );
};

export default BentoGrid;