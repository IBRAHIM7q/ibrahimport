import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useModalState } from '../hooks/useModalState.tsx';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, changeLanguage, currentLanguage, isRTL } = useLanguage();
  const { isModalOpen } = useModalState();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'WORK', href: '#showcase' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-6 left-0 right-0 z-40 flex justify-center px-6 hidden lg:block ${isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {/* Circular/Pill-shaped Navigation Container - Made Wider */}
      <div className={`transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-green-900/90 backdrop-blur-xl border border-green-700/50 shadow-2xl' 
          : 'bg-green-900/70 backdrop-blur-md border border-green-800/30'
      } rounded-full px-12 py-5 mx-auto max-w-5xl w-full max-w-4xl`}>
        
        <div className="flex items-center justify-center space-x-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer group flex-shrink-0"
            onClick={() => scrollToSection('#home')}
          >
            <div className="flex items-center">
              <div className="relative">
                <img src="/logo.jpg" alt="IBRAHIM Logo" className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
              </div>
              <div className="text-white group-hover:text-[#22c55e] transition-colors duration-300">
                <div className="font-bold text-sm sm:text-base leading-tight drop-shadow-lg">IBRAHIM</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-[#22c55e] transition-colors duration-300">DEVELOPER</div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name.toString()}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="text-white font-medium text-xs tracking-wider hover:text-[#22c55e] transition-all duration-300 px-3 py-2 rounded-full hover:bg-white/5"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-[#22c55e] transition-colors duration-300 rounded-full hover:bg-white/10"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-green-900/90 backdrop-blur-xl border border-green-700/50 rounded-2xl overflow-hidden"
            >
              <div className="px-6 pt-4 pb-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name.toString()}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="block w-full text-white font-medium text-base tracking-wider hover:text-[#22c55e] py-3 px-4 rounded-xl transition-all duration-300 text-left hover:bg-white/5"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;