import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/dummyData';
import * as Icons from 'react-icons/fi';

const CategoriesSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-black mb-4">
            Explore <span className="italic font-normal">Categories</span>
          </h2>
          <p className="text-gray-500 font-poppins text-sm uppercase tracking-widest">Find your style inspiration</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => {
            const IconComponent = Icons[cat.icon];
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${cat.color} p-8 flex flex-col items-center justify-center transition-all duration-300 border border-transparent group-hover:border-luxury-pink/30 group-hover:shadow-luxury`}>
                  <div className="mb-4 text-luxury-black group-hover:scale-110 transition-transform">
                    {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                  </div>
                  <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest text-luxury-black mb-1">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-poppins">{cat.count} Blogs</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
