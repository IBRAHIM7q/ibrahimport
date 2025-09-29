"use client";

import React from "react";

interface ProjectSkeletonProps {
  className?: string;
}

const ProjectSkeleton: React.FC<ProjectSkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-full flex flex-col p-3 ${className}`}>
      {/* Image skeleton */}
      <div className="flex-1 relative overflow-hidden rounded mb-2">
        <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-600/50 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
        </div>
      </div>
      
      {/* Tech tags skeleton */}
      <div className="flex flex-wrap gap-1">
        <div className="h-5 w-16 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full animate-pulse"></div>
        <div className="h-5 w-20 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full animate-pulse"></div>
        <div className="h-5 w-12 bg-gradient-to-r from-gray-600/20 to-gray-500/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;