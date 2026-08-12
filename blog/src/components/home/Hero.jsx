import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-start justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Fashion Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-white/90 via-luxury-white/40 to-black/20" />
      </div>

      {/* Floating Gradient Lights */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-pink/10 rounded-full blur-[100px] z-10"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-luxury-pink/5 rounded-full blur-[120px] z-10"
      />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 md:pt-12">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-playfair font-bold text-luxury-black leading-[1.1] md:leading-[0.95] mb-4 md:mb-6"
          >
            Modern Fashion & <br className="hidden sm:block" />
            <span className="italic font-normal">Style Inspiration</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl lg:text-xl font-poppins text-luxury-black mb-8 md:mb-8 max-w-2xl leading-relaxed"
          >
            Discover the latest trends, luxury aesthetics, and high-end fashion stories curated for the modern individual.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/blogs" className="w-full sm:w-auto group relative bg-luxury-pink text-luxury-white px-8 py-4 overflow-hidden flex items-center justify-center sm:justify-start space-x-3">
              <span className="relative z-10 font-montserrat text-sm font-bold uppercase tracking-widest">Explore Blogs</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-luxury-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <Link to="/trends" className="text-sm font-montserrat font-bold uppercase tracking-widest text-luxury-black border-b-2 border-luxury-black/10 hover:border-luxury-pink transition-colors py-1">
              Latest Trends
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-luxury-black to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
