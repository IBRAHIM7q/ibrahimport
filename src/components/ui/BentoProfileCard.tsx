'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Mail, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

interface BentoProfileCardProps {
  avatarUrl: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  className?: string;
  spanLarge?: boolean;
  spanWide?: boolean;
  spanTall?: boolean;
  positionSpecial?: boolean;
}

const BentoProfileCard = ({
  avatarUrl = 'https://picsum.photos/seed/ibrahim/400/400',
  name = 'IBRAHIM',
  title = 'Full Stack Developer & UI/UX Designer',
  handle = 'ibrahim',
  status = 'Available for work',
  contactText = 'Get In Touch',
  showUserInfo = true,
  onContactClick,
  socialLinks = {},
  className = '',
  spanLarge = false,
  spanWide = false,
  spanTall = false,
  positionSpecial = false
}: BentoProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Handle mouse movement for spotlight and glow effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate relative position for CSS variables
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x: mouseX, y: mouseY });
    setGlowPosition({ x: relativeX, y: relativeY });
    
    // Calculate glow intensity based on distance from center
    const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
    const intensity = Math.max(0, 1 - (distance / maxDistance));
    setGlowIntensity(intensity);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setGlowIntensity(0);
  };

  // Determine grid classes based on span props
  const getGridClasses = () => {
    let classes = '';
    
    if (spanLarge) {
      classes += ' col-span-2 row-span-2';
    } else if (spanWide) {
      classes += ' col-span-2';
    } else if (spanTall) {
      classes += ' row-span-2';
    } else if (positionSpecial) {
      classes += ' col-start-4 row-start-3';
    }
    
    return classes;
  };

  const handleContactClick = () => {
    onContactClick?.();
  };

  const handleSocialClick = (url: string, type: string) => {
    if (type === 'email') {
      window.open(`mailto:${url}`, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative group
        bg-gradient-to-br from-[#060010] via-[#1a0a1e] to-[#0f0514]
        rounded-[24px]
        overflow-hidden
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:transform hover:-translate-y-[2px]
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]
        ${getGridClasses()}
        ${className}
      `}
      style={{
        '--glow-x': `${glowPosition.x}%`,
        '--glow-y': `${glowPosition.y}%`,
        '--glow-intensity': glowIntensity,
        '--glow-radius': '200px',
        '--glow-color': '0, 255, 136',
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Border Glow Effect */}
      <div 
        className="absolute inset-0 rounded-[24px] p-1.5 pointer-events-none z-10"
        style={{
          background: `radial-gradient(${glowIntensity * 200}px circle at var(--glow-x) var(--glow-y), 
            rgba(0, 255, 136, ${glowIntensity * 0.8}) 0%, 
            rgba(0, 255, 136, ${glowIntensity * 0.4}) 30%, 
            transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col p-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            className="relative w-24 h-24 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="w-full h-full rounded-full object-cover border-3 border-green-400/30 shadow-lg"
              style={{
                boxShadow: isHovered 
                  ? '0 0 30px rgba(0, 255, 136, 0.4)' 
                  : '0 0 20px rgba(0, 255, 136, 0.2)',
              }}
            />
            {/* Status Indicator */}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </motion.div>

          {/* User Info */}
          <div className="text-center">
            <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
            <p className="text-gray-300 text-sm mb-2">{title}</p>
            {showUserInfo && (
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-green-400 text-sm font-medium">@{handle}</span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-green-400 text-sm font-medium">{status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {Object.keys(socialLinks).length > 0 && (
          <div className="flex justify-center gap-3 mb-6">
            {socialLinks.github && (
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSocialClick(socialLinks.github!, 'github')}
                className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
              >
                <Github className="w-4 h-4" />
              </motion.button>
            )}
            {socialLinks.linkedin && (
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSocialClick(socialLinks.linkedin!, 'linkedin')}
                className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </motion.button>
            )}
            {socialLinks.twitter && (
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSocialClick(socialLinks.twitter!, 'twitter')}
                className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </motion.button>
            )}
            {socialLinks.email && (
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSocialClick(socialLinks.email!, 'email')}
                className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
              >
                <Mail className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        )}

        {/* Contact Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContactClick}
          className="mt-auto w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            boxShadow: isHovered 
              ? '0 8px 25px rgba(0, 255, 136, 0.4)' 
              : '0 4px 15px rgba(0, 255, 136, 0.2)',
          }}
        >
          <Mail className="w-4 h-4" />
          {contactText}
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Interactive overlay for enhanced hover effect */}
      <div 
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--glow-x) var(--glow-y), 
            rgba(0, 255, 136, ${glowIntensity * 0.1}) 0%, 
            transparent 70%)`,
        }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BentoProfileCard;