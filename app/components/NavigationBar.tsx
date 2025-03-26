import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-[#000913]/80 backdrop-blur-sm px-4 pt-2 pb-4 border-b border-blue-500/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl font-dm-sans">
          Apoio Jurídico
        </Link>
        <div className="hidden lg:flex items-center justify-left flex-grow ml-10">
          <div className="flex space-x-6 font-dm-sans">
            <Link href="#services" className="text-blue-200 hover:text-blue-100">Services</Link>
            <Link href="#about" className="text-blue-200 hover:text-blue-100">About</Link>
            <Link href="#contact" className="text-blue-200 hover:text-blue-100">Contact</Link>
            <Link href="#faq" className="text-blue-200 hover:text-blue-100">FAQ</Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center">
          <Link href="#contact" className="text-blue-200 hover:text-blue-100 font-dm-sans">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-[2px] bg-blue-200 my-[3px]"></span>
          <span className="w-5 h-[2px] bg-blue-200 my-[3px]"></span>
          <span className="w-5 h-[2px] bg-blue-200 my-[3px]"></span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          >
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="absolute right-2 top-2 w-64 bg-[#000913] bg-opacity-95 p-4 shadow-lg z-50 border border-blue-500/20 rounded-xl backdrop-blur-sm"
            >
              <Link href="#services" className="block text-blue-200 hover:text-blue-100 py-2 font-dm-sans" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="#about" className="block text-blue-200 hover:text-blue-100 py-2 font-dm-sans" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="#contact" className="block text-blue-200 hover:text-blue-100 py-2 font-dm-sans" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="#faq" className="block text-blue-200 hover:text-blue-100 py-2 font-dm-sans" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
              <Link href="#contact" className="block text-blue-200 hover:text-blue-100 py-2 font-dm-sans" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar; 