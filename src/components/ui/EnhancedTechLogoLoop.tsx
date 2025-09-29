"use client";

import React from 'react';
import { LogoLoop, type LogoItem } from './LogoLoop';
import { 
  ReactIcon, 
  NextjsIcon, 
  NodejsIcon, 
  SupabaseIcon, 
  HTMLIcon, 
  CSSIcon, 
  JavaScriptIcon, 
  TypeScriptIcon, 
  TailwindCSSIcon 
} from './tech-icons';

// Enhanced React icon with better styling and animation
const EnhancedReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <div className="relative group">
    <ReactIcon 
      {...props} 
      className="w-auto h-8 md:h-10 lg:h-12 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(97,218,251,0.6)]"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 -z-10" />
  </div>
);

// Create enhanced versions of all tech icons with consistent styling
const createEnhancedIcon = (IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>, colorClass: string) => {
  return (props: React.SVGProps<SVGSVGElement>) => (
    <div className="relative group">
      <IconComponent 
        {...props} 
        className={`w-auto h-8 md:h-10 lg:h-12 transition-all duration-300 group-hover:scale-110 ${colorClass}`}
      />
      <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 -z-10 ${colorClass.replace('text-', 'bg-').replace('fill-', 'bg-')}`} />
    </div>
  );
};

const EnhancedNextjsIcon = createEnhancedIcon(NextjsIcon, 'text-gray-800 dark:text-gray-200');
const EnhancedNodejsIcon = createEnhancedIcon(NodejsIcon, 'text-green-600');
const EnhancedSupabaseIcon = createEnhancedIcon(SupabaseIcon, 'text-green-500');
const EnhancedHTMLIcon = createEnhancedIcon(HTMLIcon, 'text-orange-600');
const EnhancedCSSIcon = createEnhancedIcon(CSSIcon, 'text-blue-600');
const EnhancedJavaScriptIcon = createEnhancedIcon(JavaScriptIcon, 'text-yellow-500');
const EnhancedTypeScriptIcon = createEnhancedIcon(TypeScriptIcon, 'text-blue-700');
const EnhancedTailwindCSSIcon = createEnhancedIcon(TailwindCSSIcon, 'text-cyan-500');

interface EnhancedTechLogoLoopProps {
  className?: string;
  logoHeight?: number;
  speed?: number;
  gap?: number;
}

export function EnhancedTechLogoLoop({ 
  className, 
  logoHeight = 40, 
  speed = 80,
  gap = 48 
}: EnhancedTechLogoLoopProps) {
  // Create logo items for the LogoLoop component
  const logoItems: LogoItem[] = [
    {
      node: <EnhancedReactIcon />,
      title: "React",
      ariaLabel: "React - A JavaScript library for building user interfaces",
      href: "https://reactjs.org"
    },
    {
      node: <EnhancedNextjsIcon />,
      title: "Next.js",
      ariaLabel: "Next.js - The React Framework for Production",
      href: "https://nextjs.org"
    },
    {
      node: <EnhancedNodejsIcon />,
      title: "Node.js",
      ariaLabel: "Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine",
      href: "https://nodejs.org"
    },
    {
      node: <EnhancedSupabaseIcon />,
      title: "Supabase",
      ariaLabel: "Supabase - Open source Firebase alternative",
      href: "https://supabase.com"
    },
    {
      node: <EnhancedHTMLIcon />,
      title: "HTML",
      ariaLabel: "HTML - HyperText Markup Language",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML"
    },
    {
      node: <EnhancedCSSIcon />,
      title: "CSS",
      ariaLabel: "CSS - Cascading Style Sheets",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS"
    },
    {
      node: <EnhancedJavaScriptIcon />,
      title: "JavaScript",
      ariaLabel: "JavaScript - Programming language of the Web",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },
    {
      node: <EnhancedTypeScriptIcon />,
      title: "TypeScript",
      ariaLabel: "TypeScript - Typed JavaScript at Any Scale",
      href: "https://www.typescriptlang.org"
    },
    {
      node: <EnhancedTailwindCSSIcon />,
      title: "Tailwind CSS",
      ariaLabel: "Tailwind CSS - Utility-first CSS framework",
      href: "https://tailwindcss.com"
    }
  ];

  return (
    <div className={`w-full py-8 ${className}`}>
      <LogoLoop
        logos={logoItems}
        logoHeight={logoHeight}
        speed={speed}
        gap={gap}
        direction="left"
        pauseOnHover={true}
        fadeOut={true}
        fadeOutColor="rgba(255,255,255,0.1)"
        scaleOnHover={true}
        ariaLabel="Technology stack and skills"
        className="py-4"
      />
    </div>
  );
}

export default EnhancedTechLogoLoop;