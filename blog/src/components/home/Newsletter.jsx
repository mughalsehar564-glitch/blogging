import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] bg-luxury-black p-12 md:p-24 text-center">
          {/* Animated Background Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-luxury-purple/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-pink/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <span className="text-luxury-pink font-montserrat text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Newsletter</span>
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-8">
              Stay in the <span className="italic font-normal text-luxury-purple">Luxury Circle</span>
            </h2>
            <p className="text-gray-400 font-poppins text-lg mb-12">
              Subscribe to receive weekly fashion insights, exclusive trends, and curated luxury lifestyle content.
            </p>

            <form className="flex flex-col md:row items-stretch space-y-4 md:space-y-0 md:space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-white/10 border border-white/20 px-8 py-5 text-white font-poppins focus:outline-none focus:border-luxury-pink transition-colors rounded-full"
              />
              <button className="bg-white text-luxury-black px-10 py-5 rounded-full font-montserrat text-sm font-bold uppercase tracking-widest hover:bg-luxury-pink hover:text-white transition-all duration-300">
                Subscribe Now
              </button>
            </form>
            <p className="mt-6 text-[10px] text-gray-500 font-montserrat uppercase tracking-widest">
              By subscribing, you agree to our privacy policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
