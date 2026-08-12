import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/dummyData';
import * as Icons from 'react-icons/fi';

const Categories = () => {
  return (
    <div className="min-h-screen bg-luxury-white pb-24">
      <div className="bg-luxury-black py-24 md:py-32 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Category Hero" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-playfair font-bold text-white mb-6">
            Our <span className="italic font-normal text-luxury-pink">Universes</span>
          </h1>
          <p className="text-gray-400 font-montserrat text-[10px] sm:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em]">Explore our curated collections</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, index) => {
            const IconComponent = Icons[cat.icon];
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer bg-white p-8 md:p-12 luxury-shadow flex flex-col items-center text-center hover:bg-luxury-beige transition-colors duration-500 border border-gray-50"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-luxury-pink/10 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                  {IconComponent && <IconComponent size={28} md:size={32} className="text-luxury-black" />}
                </div>
                <h3 className="text-2xl md:text-3xl font-playfair font-bold text-luxury-black mb-3 md:mb-4 uppercase tracking-widest">{cat.name}</h3>
                <p className="text-gray-500 font-poppins text-xs md:text-sm mb-6 md:mb-8 leading-relaxed line-clamp-3">
                  Deep dive into our {cat.name.toLowerCase()} stories, featuring exclusive tips and the latest trends from around the world.
                </p>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <span className="text-[10px] md:text-xs font-montserrat font-bold uppercase tracking-widest text-luxury-pink">{cat.count} Articles</span>
                  <div className="w-8 md:w-10 h-[1px] bg-luxury-pink/30" />
                  <button className="text-[10px] md:text-xs font-montserrat font-bold uppercase tracking-widest text-luxury-black group-hover:text-luxury-pink transition-colors">Explore</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
