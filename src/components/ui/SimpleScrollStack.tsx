import React, { ReactNode, useRef, useEffect, useState, useCallback } from 'react';

export interface SimpleScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const SimpleScrollStackItem: React.FC<SimpleScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`simple-scroll-stack-card relative w-full h-[300px] md:h-[350px] lg:h-[400px] my-6 md:my-8 p-6 md:p-8 lg:p-10 rounded-[20px] md:rounded-[24px] lg:rounded-[32px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      transform: 'translateZ(0)'
    }}
  >
    {children}
  </div>
);

interface SimpleScrollStackProps {
  className?: string;
  children: ReactNode;
  useWindowScroll?: boolean;
}

const SimpleScrollStack: React.FC<SimpleScrollStackProps> = ({
  children,
  className = '',
  useWindowScroll = false
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateCards = useCallback(() => {
    if (!cardsRef.current.length) return;

    const scrollTop = useWindowScroll ? window.scrollY : (scrollerRef.current?.scrollTop || 0);
    const viewportHeight = useWindowScroll ? window.innerHeight : (scrollerRef.current?.clientHeight || 0);

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardTop = useWindowScroll ? rect.top + scrollTop : card.offsetTop;
      const cardCenter = cardTop + rect.height / 2;
      const viewportCenter = scrollTop + viewportHeight / 2;
      
      // Calculate distance from viewport center
      const distance = Math.abs(cardCenter - viewportCenter);
      const maxDistance = viewportHeight;
      
      // Calculate scale based on distance (closer = larger)
      const scale = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
      
      // Calculate opacity based on distance
      const opacity = Math.max(0.4, 1 - (distance / maxDistance) * 0.6);
      
      // Calculate translateY for stacking effect
      let translateY = 0;
      if (cardCenter < viewportCenter) {
        // Card is above viewport center
        translateY = Math.min(50, (viewportCenter - cardCenter) * 0.1);
      } else {
        // Card is below viewport center
        translateY = Math.max(-50, (viewportCenter - cardCenter) * 0.1);
      }
      
      // Apply transformations
      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      card.style.opacity = opacity.toString();
      card.style.zIndex = Math.round(100 - distance).toString();
    });
  }, [useWindowScroll]);

  useEffect(() => {
    // Collect all cards
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.simple-scroll-stack-card')
        : (scrollerRef.current?.querySelectorAll('.simple-scroll-stack-card') ?? [])
    ) as HTMLElement[];
    cardsRef.current = cards;

    // Initial update
    updateCards();

    // Add scroll listener
    const scrollHandler = () => {
      requestAnimationFrame(updateCards);
    };

    const targetElement = useWindowScroll ? window : scrollerRef.current;
    if (targetElement) {
      targetElement.addEventListener('scroll', scrollHandler, { passive: true });
    }

    // Add resize listener
    const resizeHandler = () => {
      requestAnimationFrame(updateCards);
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('scroll', scrollHandler);
      }
      window.removeEventListener('resize', resizeHandler);
    };
  }, [updateCards, useWindowScroll]);

  if (useWindowScroll) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="simple-scroll-stack-inner pt-[10vh] md:pt-[15vh] lg:pt-[20vh] px-6 md:px-10 lg:px-20 pb-[10rem] md:pb-[15rem] lg:pb-[20rem] min-h-screen">
          {children}
          <div className="simple-scroll-stack-end w-full h-px" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`simple-scroll-stack-scroller relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth'
      }}
    >
      <div className="simple-scroll-stack-inner pt-[10vh] md:pt-[15vh] lg:pt-[20vh] px-6 md:px-10 lg:px-20 pb-[10rem] md:pb-[15rem] lg:pb-[20rem] min-h-screen">
        {children}
        <div className="simple-scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default SimpleScrollStack;