'use client';

import InteractiveBentoGallery from './ui/interactive-bento-gallery';

const MyWork = () => {
  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "E-Commerce Platform",
      desc: "Modern full-stack e-commerce solution with real-time inventory and AI-powered recommendations",
      url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&h=600&fit=crop",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 2,
      type: "image",
      title: "Task Management App",
      desc: "Collaborative task management with real-time updates and advanced analytics",
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
  
    {
      id: 3,
      type: "image",
      title: "Portfolio Website",
      desc: "Award-winning portfolio website with advanced animations and WebGL effects",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 4,
      type: "image",
      title: "Dashboard Analytics",
      desc: "Real-time analytics dashboard with data visualization and reporting features",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 5,
      type: "image",
      title: "Banking Mobile App",
      desc: "Secure mobile banking app with biometric authentication and advanced features",
      url: "https://images.unsplash.com/photo-1563986768609-3bba1017f1c5?w=800&h=600&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 6,
      type: "image",
      title: "Brand Identity Design",
      desc: "Complete brand identity design for tech startup including logo and guidelines",
      url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 7,
      type: "image",
      title: "UI Design System",
      desc: "Comprehensive design system with components and documentation for enterprise",
      url: "https://images.unsplash.com/photo-1559028006-44a36fba3b79?w=800&h=600&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 8,
      type: "image",
      title: "API Gateway Service",
      desc: "Scalable API gateway with microservices architecture and advanced monitoring",
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 9,
      type: "image",
      title: "Data Pipeline Platform",
      desc: "ETL platform for big data processing with real-time analytics and ML integration",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 10,
      type: "image",
      title: "Social Media Dashboard",
      desc: "Comprehensive social media management dashboard with analytics and scheduling",
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 11,
      type: "image",
      title: "AR Shopping Experience",
      desc: "Augmented reality shopping app with virtual try-on and product visualization",
      url: "https://images.unsplash.com/photo-1593504049359-9662fd80d1e5?w=800&h=600&fit=crop",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    },
  ];

  return (
    <section className="relative min-h-screen py-32 overflow-hidden bg-gradient-to-br from-green-900/20 via-emerald-800/20 to-black/20">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10">
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="My Work"
          description="A curated selection of my finest projects showcasing innovative solutions and cutting-edge technology"
        />
      </div>
    </section>
  );
};

export default MyWork;