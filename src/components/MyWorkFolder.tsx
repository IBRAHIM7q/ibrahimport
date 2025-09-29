'use client';

import { Folder } from '@/components/ui/folder';

const MyWorkFolder = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio with animations',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      url: 'https://example-portfolio.com',
      githubUrl: 'https://github.com/example/portfolio',
      tech: ['Next.js', 'React', 'Tailwind']
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      url: 'https://example-tasks.com',
      githubUrl: 'https://github.com/example/task-manager',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather data',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      url: 'https://example-weather.com',
      githubUrl: 'https://github.com/example/weather-dashboard',
      tech: ['React', 'API', 'Chart.js']
    },
    {
      title: 'E-commerce Platform',
      description: 'Full online store',
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=300&fit=crop',
      url: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/example/ecommerce',
      tech: ['Next.js', 'Stripe', 'Prisma']
    },
    {
      title: 'Blog Platform',
      description: 'Content management system',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      url: 'https://example-blog.com',
      githubUrl: 'https://github.com/example/blog',
      tech: ['Next.js', 'MDX', 'Database']
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure banking interface',
      image: 'https://images.unsplash.com/photo-1563986768609-3bba1017f1c5?w=400&h=300&fit=crop',
      url: 'https://example-banking.com',
      githubUrl: 'https://github.com/example/banking',
      tech: ['React Native', 'Security', 'API']
    }
  ];

  return (
    <section id="showcase" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-800/20 to-black/20" />
      <div className="relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-green-400 mb-4">
              <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium uppercase tracking-wider">My Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Project Showcase
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Click the folder to explore my latest projects and websites. Each paper represents a different project with live preview and tech stack details.
            </p>
          </div>

          <div className="flex justify-center items-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
            <div className="scale-75 sm:scale-100 md:scale-125 lg:scale-150 transition-transform duration-300">
              <Folder
                size={1}
                color="#22c55e"
                projects={projects}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Click folder to open/close</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Hover papers for details</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>Click papers to visit projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyWorkFolder;