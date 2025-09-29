import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  githubUrl: string;
  tech: string[];
  features: string[];
  category: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleVisitProject = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Main Grid - Larger and more prominent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ scale: 1.03, y: -10 }}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
            onClick={() => handleProjectClick(project)}
          >
            {/* Project Card - Larger */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-black/90 to-green-900/30 backdrop-blur-sm border-2 border-green-500/30 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-500/30">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="inline-block px-4 py-2 text-sm font-bold text-green-400 bg-green-500/20 rounded-full mb-4 border border-green-500/30">
                      {project.category}
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Hover Actions */}
                  <motion.div 
                    className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVisitProject(project.url);
                      }}
                      className="p-3 bg-green-500/20 hover:bg-green-500/40 rounded-xl transition-all duration-300 border border-green-500/30"
                    >
                      <ExternalLink className="w-5 h-5 text-green-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVisitProject(project.githubUrl);
                      }}
                      className="p-3 bg-green-500/20 hover:bg-green-500/40 rounded-xl transition-all duration-300 border border-green-500/30"
                    >
                      <Github className="w-5 h-5 text-green-400" />
                    </button>
                  </motion.div>
                </div>
                
                {/* Bottom Section */}
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3">
                    {project.tech.slice(0, 5).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-4 py-2 text-sm font-bold text-green-300 bg-green-500/20 rounded-xl border-2 border-green-500/30 hover:bg-green-500/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-4 py-2 text-sm font-bold text-gray-400 bg-gray-500/20 rounded-xl border-2 border-gray-500/30">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>
                  
                  {/* View Details Button */}
                  <motion.button
                    className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors group"
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg font-bold">View Details</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </div>
              </div>
              
              {/* Hover Effect Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            
            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div 
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black/90 to-green-900/20 backdrop-blur-xl border border-green-500/30 rounded-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-green-400 rotate-45" />
                </button>
                
                {/* Modal Content */}
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Left Side - Image */}
                  <div className="space-y-6">
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleVisitProject(selectedProject.url)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Live Demo</span>
                      </button>
                      <button
                        onClick={() => handleVisitProject(selectedProject.githubUrl)}
                        className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Right Side - Details */}
                  <div className="space-y-6">
                    <div>
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-green-400 bg-green-500/10 rounded-full mb-3">
                        {selectedProject.category}
                      </span>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        {selectedProject.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>
                    
                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-sm font-medium text-green-300 bg-green-500/10 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectShowcase;