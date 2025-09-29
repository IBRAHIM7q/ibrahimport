"use client";

import React, { useState, useCallback } from "react";
import ProjectSkeleton from "./ProjectSkeleton";

interface EnhancedProjectPreviewProps {
  project: {
    title: string;
    description: string;
    image: string;
    url?: string;
    tech: string[];
  };
  index: number;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onClick: (e: React.MouseEvent) => void;
}

const EnhancedProjectPreview: React.FC<EnhancedProjectPreviewProps> = ({
  project,
  index,
  onMouseMove,
  onMouseLeave,
  onClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-3">
      <div className="flex-1 relative overflow-hidden rounded mb-2 group">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-10">
            <ProjectSkeleton />
          </div>
        )}
        
        {/* Image with error handling */}
        {!imageError ? (
          <img 
            src={project.image} 
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
            <div className="text-gray-400 text-center p-4">
              <div className="text-2xl mb-2">🖼️</div>
              <div className="text-sm">Image not available</div>
            </div>
          </div>
        )}
        
        {/* Enhanced overlay with better animations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center">
          <div className="text-white text-center px-3 pb-3 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="font-bold text-sm mb-1 truncate text-green-300 drop-shadow-lg">{project.title}</div>
            <div className="text-xs opacity-95 leading-tight line-clamp-2 text-gray-100 drop-shadow-md">
              {project.description}
            </div>
            {project.url && (
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center text-xs bg-green-500/30 text-green-200 px-2 py-1 rounded-full border border-green-500/40 backdrop-blur-sm">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      
      {/* Enhanced tech tags */}
      <div className="flex flex-wrap gap-1">
        {project.tech.slice(0, 2).map((tech: string, techIndex: number) => (
          <span 
            key={techIndex} 
            className="text-xs bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-200 border border-green-500/40 px-2 py-1 rounded-full backdrop-blur-sm hover:from-green-600/40 hover:to-emerald-600/40 transition-all duration-200 hover:scale-105 drop-shadow-sm"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 2 && (
          <span className="text-xs bg-gradient-to-r from-gray-600/30 to-gray-500/30 text-gray-200 border border-gray-500/40 px-2 py-1 rounded-full backdrop-blur-sm hover:from-gray-600/40 hover:to-gray-500/40 transition-all duration-200 drop-shadow-sm">
            +{project.tech.length - 2}
          </span>
        )}
      </div>
    </div>
  );
};

export default EnhancedProjectPreview;