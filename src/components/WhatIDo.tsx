'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SimpleScrollStack, { SimpleScrollStackItem } from '@/components/ui/SimpleScrollStack';
import { 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Database, 
  Zap,
  Shield,
  Users,
  Target,
  Lightbulb,
  Rocket,
  Settings,
  Brain,
  Layers,
  Server,
  Design,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  glowColor: string;
}

// Simple responsive configuration using CSS media queries instead of window
const useResponsiveConfig = () => {
  const [config, setConfig] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      
      if (width < 768) { // Mobile
        setConfig({ isMobile: true, isTablet: false, isDesktop: false });
      } else if (width < 1024) { // Tablet
        setConfig({ isMobile: false, isTablet: true, isDesktop: false });
      } else { // Desktop
        setConfig({ isMobile: false, isTablet: false, isDesktop: true });
      }
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      updateConfig();
      window.addEventListener('resize', updateConfig);
      return () => window.removeEventListener('resize', updateConfig);
    }
  }, []);

  return config;
};

const WhatIDo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollStackConfig = useResponsiveConfig();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const services: ServiceCard[] = [
    {
      id: 1,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces with modern React-based technologies',
      icon: <Code className="w-10 h-10" />,
      category: 'frontend',
      glowColor: 'from-green-400 to-emerald-400'
    },
    {
      id: 2,
      title: 'UI/UX Design',
      description: 'Creating clean and user-friendly interfaces with modern design principles',
      icon: <Palette className="w-10 h-10" />,
      category: 'design',
      glowColor: 'from-purple-400 to-pink-400'
    },
    {
      id: 3,
      title: 'Backend Development',
      description: 'Developing server-side applications and APIs with Node.js and database integration',
      icon: <Server className="w-10 h-10" />,
      category: 'backend',
      glowColor: 'from-orange-400 to-red-400'
    },
    {
      id: 4,
      title: 'Database Management',
      description: 'Designing and managing databases for efficient data storage and retrieval',
      icon: <Database className="w-10 h-10" />,
      category: 'backend',
      glowColor: 'from-yellow-400 to-orange-400'
    },
    {
      id: 5,
      title: 'Web Performance',
      description: 'Optimizing web applications for speed, efficiency, and better user experience',
      icon: <Zap className="w-10 h-10" />,
      category: 'frontend',
      glowColor: 'from-green-400 to-lime-400'
    },
    {
      id: 6,
      title: 'Version Control',
      description: 'Managing code versions and collaborating with teams using Git workflows',
      icon: <Layers className="w-10 h-10" />,
      category: 'tools',
      glowColor: 'from-blue-400 to-indigo-400'
    }
  ];

  const getServiceFeatures = (category: string): string[] => {
    const features: Record<string, string[]> = {
      frontend: [
        'React & Next.js development',
        'Responsive design',
        'Performance optimization',
        'Modern UI/UX implementation'
      ],
      backend: [
        'API development',
        'Database design',
        'Server architecture',
        'Security implementation'
      ],
      design: [
        'User interface design',
        'User experience research',
        'Design systems',
        'Interactive prototypes'
      ],
      tools: [
        'Git version control',
        'CI/CD pipelines',
        'Testing frameworks',
        'Development tools'
      ]
    };
    return features[category] || [];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-20 lg:py-32 overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          style={{ y: textY, scale, opacity }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1.5 md:px-4 md:py-2 bg-green-500/10 border border-green-500/20 rounded-full">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
            <span className="text-green-400 text-xs md:text-sm font-medium">Services</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-light text-white mb-4 md:mb-6"
            style={{ 
              textShadow: '0 4px 40px rgba(0, 255, 136, 0.3)',
              letterSpacing: '0.02em'
            }}
          >
            What I Do
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-[#94a3b8] max-w-4xl mx-auto leading-relaxed px-4"
            style={{ opacity: opacity }}
          >
            I transform ideas into exceptional digital experiences through 
            <span className="text-green-400 font-medium"> innovative solutions </span>
            and 
            <span className="text-green-400 font-medium"> cutting-edge technologies</span>
          </motion.p>
        </motion.div>

        {/* SimpleScrollStack Services */}
        <SimpleScrollStack 
          className="relative"
          useWindowScroll={true}
        >
          {services.map((service, index) => (
            <SimpleScrollStackItem key={service.id}>
              <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800/50 rounded-[20px] md:rounded-[24px] lg:rounded-[32px] p-6 md:p-8 lg:p-10 hover:border-green-500/50 backdrop-blur-sm overflow-hidden">
                
                {/* Icon Section */}
                <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8 flex-shrink-0">
                  <div className="relative">
                    <div className="w-fit rounded-xl md:rounded-2xl border border-gray-700/50 bg-gray-900/50 p-4 md:p-5 lg:p-6 backdrop-blur-sm">
                      <div
                        className={`w-12 h-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r ${service.glowColor} flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110`}
                      >
                        <div className="text-white text-xl md:text-2xl lg:text-3xl">
                          {service.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  <div
                    className="px-2 py-1 md:px-3 md:py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs font-medium text-gray-300 backdrop-blur-sm flex-shrink-0"
                  >
                    {service.category}
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4 lg:space-y-5 flex-1 min-h-0">
                  <div className="space-y-2 md:space-y-3 lg:space-y-4">
                    <h3 className="text-xl md:text-2xl lg:text-3xl leading-[1.2] font-bold font-sans tracking-[-0.04em] text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-[1.4] font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </SimpleScrollStackItem>
          ))}
        </SimpleScrollStack>
      </div>
    </section>
  );
};

export default WhatIDo;