import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrbitingSkills from '@/components/ui/orbiting-skills';

interface Skill {
  id: number;
  title: string;
  level: number;
  icon: React.ReactNode;
  category: string;
  color: string;
}

interface EnhancedTechnicalSkillsProps {
  skills: Skill[];
}

const EnhancedTechnicalSkills: React.FC<EnhancedTechnicalSkillsProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Orbiting Skills View */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center min-h-[500px]"
      >
        <div className="relative w-full max-w-2xl mx-auto">
          <OrbitingSkills />
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedTechnicalSkills;