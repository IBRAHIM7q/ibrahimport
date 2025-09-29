'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Moon, 
  Sun,
  Code,
  Palette,
  Zap,
  Shield,
  Users,
  Database,
  Smartphone,
  ArrowRight,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Rocket,
  Globe,
  Search,
  Filter,
  User,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ModalStateProvider, useModalState } from '@/hooks/useModalState';
import DarkVeil from '@/components/DarkVeil';
import MagicBento from '@/components/MagicBento';
import ProfileCard from '@/components/ProfileCard';
import { RainbowButton } from '@/components/ui/rainbow-button';
import SearchComponent from '@/components/ui/animated-glowing-search-bar';
import { LogoLoop, type LogoItem } from '@/components/ui/LogoLoop';
import { EnhancedTechLogoLoop } from '@/components/ui/EnhancedTechLogoLoop';
import RotatingText from '@/components/ui/RotatingText';
import Navbar from '@/components/Navbar';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import StaggeredMenu from '@/components/ui/StaggeredMenu';

import WhatIDo from '@/components/WhatIDo';
import GlassSurface from '@/components/ui/GlassSurface';
import WebsiteGrid from '@/components/WebsiteGrid';
import { LampDemo } from '@/components/ui/lamp';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import ContactForm from '@/components/ui/contact-form';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle contact form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Senden der Nachricht');
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: "Nachricht gesendet!",
        description: "Vielen Dank für Ihre Nachricht. Ich werde mich so schnell wie möglich bei Ihnen melden.",
      });
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // General loading states
  const [loadingStates, setLoadingStates] = useState({
    projects: false
  });
  
  // Error states
  const [errors, setErrors] = useState({
    general: '',
    projects: ''
  });

  // Memoize expensive computations
  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and optimized performance.',
      image: 'https://picsum.photos/seed/portfolio/600/400',
      url: 'https://example-portfolio.com',
      githubUrl: 'https://github.com/example/portfolio',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      features: ['Responsive design', 'Smooth animations', 'SEO optimized', 'Fast loading', 'Modern UI/UX'],
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A full-stack task management application with user authentication, real-time updates, and intuitive drag-and-drop interface.',
      image: 'https://picsum.photos/seed/taskapp/600/400',
      url: 'https://example-tasks.com',
      githubUrl: 'https://github.com/example/task-manager',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      features: ['User authentication', 'Real-time updates', 'Drag and drop', 'Task categories', 'Progress tracking'],
      category: 'Web Application'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather dashboard that displays current weather and forecasts using a third-party API, with location-based services and data visualization.',
      image: 'https://picsum.photos/seed/weather/600/400',
      url: 'https://example-weather.com',
      githubUrl: 'https://github.com/example/weather-dashboard',
      tech: ['React', 'JavaScript', 'CSS3', 'Weather API', 'Chart.js'],
      features: ['Current weather', '5-day forecast', 'Location search', 'Data visualization', 'Responsive design'],
      category: 'Web Application'
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'A simple blog platform with markdown support, comment system, and admin panel for content management.',
      image: 'https://picsum.photos/seed/blog/600/400',
      url: 'https://example-blog.com',
      githubUrl: 'https://github.com/example/blog-platform',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Markdown', 'Database'],
      features: ['Markdown support', 'Comment system', 'Admin panel', 'SEO friendly', 'Category system'],
      category: 'Web Development'
    },
    {
      id: 5,
      title: 'E-commerce Frontend',
      description: 'A responsive e-commerce frontend with product catalog, shopping cart, and user authentication, built with modern React practices.',
      image: 'https://picsum.photos/seed/ecommerce/600/400',
      url: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/example/ecommerce-frontend',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Context API', 'React Router'],
      features: ['Product catalog', 'Shopping cart', 'User authentication', 'Search functionality', 'Mobile responsive'],
      category: 'Frontend Development'
    },
    {
      id: 6,
      title: 'REST API Service',
      description: 'A RESTful API service built with Node.js and Express, featuring user management, data validation, and comprehensive documentation.',
      image: 'https://picsum.photos/seed/api/600/400',
      url: 'https://example-api.com',
      githubUrl: 'https://github.com/example/api-service',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
      features: ['RESTful design', 'User management', 'Data validation', 'API documentation', 'Error handling'],
      category: 'Backend Development'
    }
  ], []);

  // CardSwap projects data structure
  const cardSwapProjects = useMemo(() => [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with Next.js and Tailwind CSS.',
      image: 'https://picsum.photos/seed/portfolio/600/400',
      demoUrl: 'https://example-portfolio.com',
      githubUrl: 'https://github.com/example/portfolio',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Full-stack task management application with real-time updates and authentication.',
      image: 'https://picsum.photos/seed/taskapp/600/400',
      demoUrl: 'https://example-tasks.com',
      githubUrl: 'https://github.com/example/task-manager',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io']
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Weather dashboard with API integration and data visualization.',
      image: 'https://picsum.photos/seed/weather/600/400',
      demoUrl: 'https://example-weather.com',
      githubUrl: 'https://github.com/example/weather-dashboard',
      technologies: ['React', 'JavaScript', 'CSS3', 'Weather API', 'Chart.js']
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Simple blog platform with markdown support and admin panel.',
      image: 'https://picsum.photos/seed/blog/600/400',
      demoUrl: 'https://example-blog.com',
      githubUrl: 'https://github.com/example/blog-platform',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Markdown', 'Database']
    },
    {
      id: 5,
      title: 'E-commerce Frontend',
      description: 'Responsive e-commerce frontend with shopping cart and authentication.',
      image: 'https://picsum.photos/seed/ecommerce/600/400',
      demoUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/example/ecommerce-frontend',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Context API', 'React Router']
    }
  ], []);

  const experiences = useMemo(() => [
    {
      role: 'Full Stack Developer',
      company: 'Tech Startup',
      period: '2023 - Present',
      description: 'Developing full-stack web applications using React, Node.js, and modern web technologies.'
    },
    {
      role: 'Frontend Developer Intern',
      company: 'Digital Agency',
      period: '2022 - 2023',
      description: 'Assisted in developing responsive web applications and learning modern development practices.'
    },
    {
      role: 'Web Development Student',
      company: 'Self-taught',
      period: '2021 - 2022',
      description: 'Learned web development fundamentals through online courses and personal projects.'
    }
  ], []);

  const services = useMemo(() => [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Creating responsive, performant web applications using modern frameworks and best practices.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Designing intuitive user interfaces with focus on user experience and accessibility.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance Optimization',
      description: 'Optimizing web applications for speed, efficiency, and scalability.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security Implementation',
      description: 'Implementing robust security measures and best practices for web applications.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Collaboration',
      description: 'Working effectively in teams using agile methodologies and modern tools.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Database Design',
      description: 'Designing efficient database architectures and optimizing query performance.',
      color: 'from-red-500 to-pink-500'
    }
  ], []);

  const sites = useMemo(() => [
    {
      title: 'E-Commerce Platform',
      url: 'https://example-ecommerce.com',
      description: 'Modern e-commerce solution with advanced features',
      image: 'https://picsum.photos/seed/ecommerce/400/300',
      tech: ['React', 'Node.js', 'MongoDB'],
      demoUrl: 'https://example-ecommerce.com/demo',
      githubUrl: 'https://github.com/example/ecommerce',
      features: ['Real-time inventory', 'Payment processing', 'Admin dashboard']
    },
    {
      title: 'AI Dashboard',
      url: 'https://example-ai.com',
      description: 'Analytics dashboard with AI insights',
      image: 'https://picsum.photos/seed/aidashboard/400/300',
      tech: ['Next.js', 'Python', 'OpenAI'],
      demoUrl: 'https://example-ai.com/demo',
      githubUrl: 'https://github.com/example/ai-dashboard',
      features: ['AI-powered analytics', 'Real-time data', 'Predictive insights']
    },
    {
      title: 'Portfolio Website',
      url: 'https://example-portfolio.com',
      description: 'Creative portfolio showcase',
      image: 'https://picsum.photos/seed/portfolio/400/300',
      tech: ['React', 'TypeScript', 'Tailwind'],
      demoUrl: 'https://example-portfolio.com/demo',
      githubUrl: 'https://github.com/example/portfolio',
      features: ['Responsive design', 'Smooth animations', 'Modern UI']
    },
    {
      title: 'Mobile App',
      url: 'https://example-mobile.com',
      description: 'Cross-platform mobile application',
      image: 'https://picsum.photos/seed/mobile/400/300',
      tech: ['React Native', 'Firebase'],
      demoUrl: 'https://example-mobile.com/demo',
      githubUrl: 'https://github.com/example/mobile-app',
      features: ['Cross-platform', 'Real-time sync', 'Offline support']
    }
  ], []);

  const stats = useMemo(() => [
    { value: '6+', label: 'Projects Completed', icon: <Target className="w-6 h-6" /> },
    { value: '6+', label: 'Technologies', icon: <Code className="w-6 h-6" /> },
    { value: '1', label: 'Year Experience', icon: <Award className="w-6 h-6" /> }
  ], []);

  // Optimized scroll handler with Intersection Observer and caching
  useEffect(() => {
    // Cache section elements and positions
    const sections = ['home', 'about', 'showcase', 'services', 'projects', 'contact'];
    const sectionElements = new Map<string, Element>();
    const sectionPositions = new Map<string, { top: number; bottom: number }>();
    
    // Initialize section cache
    const cacheSectionPositions = () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          sectionElements.set(sectionId, element);
          const rect = element.getBoundingClientRect();
          sectionPositions.set(sectionId, {
            top: rect.top + window.pageYOffset,
            bottom: rect.bottom + window.pageYOffset
          });
        }
      });
    };

    // Initial cache
    cacheSectionPositions();

    // Optimized scroll handler using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -100px 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      let activeSection = '';
      let maxIntersection = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersection) {
          maxIntersection = entry.intersectionRatio;
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            activeSection = sectionId;
          }
        }
      });

      if (activeSection) {
        setActiveSection(activeSection);
      }
    }, observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Fallback scroll handler for edge cases
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollPosition = currentScrollY + 100;

          // Use cached positions when possible
          for (const sectionId of sections) {
            const position = sectionPositions.get(sectionId);
            if (position && scrollPosition >= position.top && scrollPosition < position.bottom) {
              setActiveSection(sectionId);
              break;
            }
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Update cache on resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cacheSectionPositions();
      }, 150);
    };

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Add dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {
      name: '',
      email: '',
      message: ''
    };
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.message;
  }, [formData]);

  // Handle input changes
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [formErrors]);



  // Loading component
  // Simulate loading data
  const loadData = useCallback(async (type: 'projects') => {
    setLoadingStates(prev => ({ ...prev, [type]: true }));
    setErrors(prev => ({ ...prev, [type]: '' }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would fetch data here
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: `Failed to load ${type}. Please try again.` 
      }));
      toast({
        title: "Loading Error",
        description: `Failed to load ${type}. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [type]: false }));
    }
  }, [toast]);

  // Load data on component mount
  useEffect(() => {
    loadData('projects');
  }, [loadData]);

  // Performance optimization: Lazy loading component
  const LazyImage = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageRef, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <div ref={imageRef} className={`relative ${className || ''}`}>
        {inView && (
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            {...props}
          />
        )}
        {!isLoaded && inView && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg"></div>
        )}
      </div>
    );
  };

  // Performance monitoring hook
  const usePerformanceMonitor = () => {
    useEffect(() => {
      // Monitor page load performance
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
      
      return () => observer.disconnect();
    }, []);
  };

  // Use performance monitor
  usePerformanceMonitor();

  return (
    <ModalStateProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0a1f0a] via-[#163e16] to-[#0f2a0f] text-white overflow-x-hidden">
      {/* DarkVeil Shader Background */}
      <div className="fixed inset-0 z-0">
        <DarkVeil 
          hueShift={120}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={0.3}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </div>

      {/* Navigation */}
      <Navbar />
      
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <StaggeredMenu
          items={[
            { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
            { label: 'About', ariaLabel: 'Go to about section', link: '#about' },
            { label: 'Services', ariaLabel: 'Go to services section', link: '#services' },
            { label: 'Work', ariaLabel: 'Go to work section', link: '#showcase' },
            { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
            { label: 'Contact', ariaLabel: 'Go to contact section', link: '#contact' }
          ]}
          socialItems={[
            { label: 'Email', link: 'mailto:alsaadi.aa.ss100@gmail.com' }
          ]}
          colors={['#000000', '#22c55e', '#16a34a']}
          logoUrl="/logo.jpg"
          menuButtonColor="#22c55e"
          openMenuButtonColor="#16a34a"
          accentColor="#22c55e"
          className="lg:hidden"
        />
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5"></div>
        <div className="container mx-auto px-4 md:px-6 z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 w-fit bounce-in">
                <Sparkles className="w-5 h-5 pulse-subtle" />
                <span className="text-sm font-bold uppercase tracking-wider">Welcome to my portfolio</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight slide-in-left">
                <span className="text-shimmer">
                  Creative
                </span>
                <br />
                <span className="text-white drop-shadow-lg">Developer</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg drop-shadow-md slide-in-right">
                Crafting extraordinary digital experiences with cutting-edge technology and innovative design solutions for the modern web.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 slide-in-left">
                <RainbowButton 
                  onClick={() => scrollToSection('showcase')}
                  disabled={loadingStates.projects}
                  className="w-full sm:w-auto min-h-[44px] btn-micro hover-lift"
                >
                  {loadingStates.projects ? (
                    <div className="animate-spin rounded-full border-2 border-gray-300 border-t-green-500 w-4 h-4"></div>
                  ) : (
                    <>
                      View Showcase
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </RainbowButton>
                <Button 
                  variant="outline" 
                  className="border-2 border-green-500/50 hover:border-green-400 text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20 px-6 md:px-8 py-3 md:py-4 text-lg font-bold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-h-[44px] btn-micro hover-lift"
                  onClick={() => scrollToSection('contact')}
                  disabled={loadingStates.projects}
                >
                  {loadingStates.projects ? <div className="animate-spin rounded-full border-2 border-gray-300 border-t-green-500 w-4 h-4"></div> : 'Get In Touch'}
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:flex md:items-center md:space-x-6 pt-6 md:pt-8 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white/5 px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-white/10 card-interactive hover-lift">
                    <div className="flex items-center justify-center space-x-2 text-green-400 mb-2">
                      {stat.icon}
                      <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
                    </div>
                    <div className="text-xs md:text-sm text-gray-300 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8 md:mt-0">
              <ProfileCard 
                avatarUrl="/logo.jpg"
                name="IBRAHIM"
                title="Full Stack Developer & UI/UX Designer"
                handle="ibrahim"
                status="Available for work"
                contactText="Get In Touch"
                onContactClick={() => {
                  window.open('mailto:ibrahim@example.com', '_blank');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center space-x-2 text-blue-400 mb-4">
              <Lightbulb className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Passionate Creator
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              I'm a full-stack developer who bridges the gap between beautiful design and powerful functionality, 
              creating digital experiences that inspire and engage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <GlassSurface 
              width="100%" 
              height="auto" 
              borderRadius={20}
              backgroundOpacity={0.1}
              blur={12}
              className="hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white link-underline">Clean Code</h3>
                <p className="text-gray-300 text-base">
                  Writing maintainable, scalable code with best practices and modern development methodologies.
                </p>
              </div>
            </GlassSurface>
            
            <GlassSurface 
              width="100%" 
              height="auto" 
              borderRadius={20}
              backgroundOpacity={0.1}
              blur={12}
              className="hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation" style={{animationDelay: '0.2s'}}>
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white link-underline">Modern Design</h3>
                <p className="text-gray-300 text-base">
                  Creating intuitive, beautiful interfaces that provide exceptional user experiences.
                </p>
              </div>
            </GlassSurface>
            
            <GlassSurface 
              width="100%" 
              height="auto" 
              borderRadius={20}
              backgroundOpacity={0.1}
              blur={12}
              className="hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation" style={{animationDelay: '0.4s'}}>
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white link-underline">Performance</h3>
                <p className="text-gray-300 text-base">
                  Optimizing for speed, efficiency, and scalability to deliver the best possible performance.
                </p>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-6">
          <EnhancedTechLogoLoop />
        </div>
      </section>

      {/* What I Do Section */}
      <section id="services" className="relative z-10">
        <WhatIDo />
      </section>

        {/* My Work Section */}
      <WebsiteGrid />

      {/* Future Work Section */}
      <section id="projects" className="relative z-10">
        <LampDemo />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 w-fit mx-auto mb-4">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Get In Touch</span>
            </div>
            <h2 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
                Let's get in contact
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
              Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-white">Contact Information</h3>
                  <div className="space-y-6">
                    <GlassSurface 
                      width="100%" 
                      height="auto" 
                      borderRadius={20}
                      backgroundOpacity={0.1}
                      blur={12}
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      <div className="flex items-center space-x-4 p-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                          <Mail className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Email</div>
                          <div className="text-white text-lg">alsaadi.aa.ss100@gmail.com</div>
                        </div>
                      </div>
                    </GlassSurface>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">Send Message</h3>
                {isSubmitted ? (
                  <GlassSurface 
                    width="100%" 
                    height="auto" 
                    borderRadius={20}
                    backgroundOpacity={0.1}
                    blur={12}
                  >
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold mb-2 text-green-400">Message Sent Successfully!</h4>
                      <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                  </GlassSurface>
                ) : (
                  <GlassSurface 
                    width="100%" 
                    height="auto" 
                    borderRadius={20}
                    backgroundOpacity={0.1}
                    blur={12}
                  >
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Name"
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          leftIcon={<User className="w-5 h-5 text-green-400" />}
                          animated
                          variant="outlined"
                          error={formErrors.name}
                        />
                        <Input
                          label="Email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          leftIcon={<Mail className="w-5 h-5 text-green-400" />}
                          animated
                          variant="outlined"
                          error={formErrors.email}
                        />
                      </div>
                      
                      <Textarea
                        label="Message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        rows={6}
                        autoResize
                        showCharCount
                        maxLength={1000}
                        leftIcon={<MessageSquare className="w-5 h-5 text-green-400" />}
                        animated
                        variant="outlined"
                        error={formErrors.message}
                      />
                      
                      <RainbowButton 
                        className="w-full py-4 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          'Submit'
                        )}
                      </RainbowButton>
                    </form>
                  </GlassSurface>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <LazyImage 
                src="/logo.jpg" 
                alt="IBRAHIM Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                IBRAHIM
              </span>
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © 2025 IBRAHIM. Crafted with passion and cutting-edge technology.
              </p>
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white btn-micro">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white btn-micro">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white btn-micro">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ModalStateProvider>
  );
}