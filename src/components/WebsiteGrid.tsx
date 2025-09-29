'use client';

import { OptimizedFolder } from '@/components/ui/OptimizedFolder';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import ProjectErrorBoundary from '@/components/ui/ProjectErrorBoundary';

const WebsiteGrid = () => {
  const projects = [
    {
      title: 'Agency Template',
      description: 'Modern agency website template with responsive design',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      url: 'https://agency-template-name.netlify.app/#',
      githubUrl: 'https://github.com/example/agency-template',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      features: ['Responsive Design', 'Modern UI', 'SEO Optimized', 'Fast Loading']
    },
    {
      title: 'AI Todo List',
      description: 'Smart task management with AI-powered features',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      url: 'https://todo-list-ai.netlify.app/',
      githubUrl: 'https://github.com/example/todo-ai',
      tech: ['React', 'AI Integration', 'Local Storage', 'Tailwind CSS'],
      features: ['AI Task Suggestions', 'Smart Prioritization', 'Progress Tracking', 'Clean Interface']
    },
    {
      title: 'HandyPro Service',
      description: 'Professional handyman service booking platform',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      url: 'https://handypro2.netlify.app/',
      githubUrl: 'https://github.com/example/handypro',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      features: ['Service Booking', 'Provider Management', 'Payment Integration', 'User Reviews']
    },
    {
      title: 'HandyPro Platform',
      description: 'Enhanced handyman service platform with advanced features',
      image: 'https://images.unsplash.com/photo-1563986768609-3bba1017f1c5?w=400&h=300&fit=crop',
      url: 'https://handypro22.netlify.app/',
      githubUrl: 'https://github.com/example/handypro2',
      tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
      features: ['Advanced Booking', 'Real-time Notifications', 'Analytics Dashboard', 'Mobile Responsive']
    },
    {
      title: 'Instagram Clone',
      description: 'Social media platform with Instagram-like features',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop',
      url: 'https://insta3.netlify.app/',
      githubUrl: 'https://github.com/example/insta-clone',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
      features: ['Photo Sharing', 'User Authentication', 'Likes & Comments', 'User Profiles']
    },
    {
      title: 'Weather Web App',
      description: 'Advanced weather application with detailed forecasts',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      url: 'https://weatherweb122.netlify.app/#/',
      githubUrl: 'https://github.com/example/weather-app',
      tech: ['React', 'Weather API', 'Chart.js', 'Geolocation'],
      features: ['Real-time Weather', '7-Day Forecast', 'Interactive Maps', 'Location Search']
    }
  ];

  return (
    <ErrorBoundary
      fallback={
        <section id="showcase" className="relative min-h-screen py-20 md:py-24 lg:py-32 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-red-800/20 to-black/40" />
          <div className="relative z-10 text-center">
            <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-lg border border-red-500/20 backdrop-blur-sm">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Projects Section Error</h3>
              <p className="text-gray-300 mb-4">Unable to load the project showcase. This might be due to a temporary issue.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105"
              >
                Reload Page
              </button>
            </div>
          </div>
        </section>
      }
    >
      <section id="showcase" className="relative min-h-screen py-20 md:py-24 lg:py-32 overflow-hidden">
        {/* Enhanced background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-emerald-800/20 to-black/40 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              {/* Enhanced header with animated elements */}
              <div className="flex items-center justify-center space-x-2 text-green-400 mb-4 md:mb-6">
                <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-sm md:text-base font-medium uppercase tracking-wider bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  My Work
                </span>
                <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  Project Showcase
                </span>
              </h2>
              
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
                Explore my latest <span className="text-green-400 font-semibold">6 projects</span> featuring modern technologies and innovative solutions
              </p>
              
              {/* Animated underline */}
              <div className="flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced Center Folder with better animations */}
            <div className="flex justify-center items-center min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[750px] 2xl:min-h-[800px]">
              <div className="scale-75 xs:scale-80 sm:scale-90 md:scale-100 lg:scale-110 xl:scale-120 2xl:scale-130 transition-all duration-500 hover:scale-110 hover:rotate-1">
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  
                  <ErrorBoundary
                    fallback={
                      <div className="w-[240px] h-[190px] flex flex-col items-center justify-center bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-lg border border-red-500/20 backdrop-blur-sm">
                        <div className="text-center p-4">
                          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <h3 className="text-white font-medium text-sm mb-2">Projects unavailable</h3>
                          <p className="text-gray-400 text-xs mb-3">Unable to load project showcase</p>
                          <button 
                            onClick={() => window.location.reload()} 
                            className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200"
                          >
                            Reload page
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <OptimizedFolder
                      size={1.2}
                      color="#22c55e"
                      projects={projects}
                      className="relative cursor-pointer hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 transform hover:scale-105"
                    />
                  </ErrorBoundary>
                </div>
              </div>
            </div>

            {/* Enhanced Instructions with better styling */}
            <div className="text-center mt-16 md:mt-20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg backdrop-blur-sm hover:bg-green-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-green-400 text-sm md:text-base font-medium">Click folder to open/close</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <span className="text-blue-400 text-sm md:text-base font-medium">Left side: 3 websites</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg backdrop-blur-sm hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="w-4 h-4 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                  <span className="text-purple-400 text-sm md:text-base font-medium">Right side: 3 websites</span>
                </div>
              </div>
              
              {/* Enhanced Project Count */}
              <div className="mt-8 md:mt-12">
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-full backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20">
                  <span className="text-gray-400 text-sm font-medium">Total Projects:</span>
                  <span className="text-green-400 font-bold text-lg bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">6</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
      </section>
    </ErrorBoundary>
  );
};

export default WebsiteGrid;