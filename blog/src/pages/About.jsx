import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-luxury-pink font-montserrat text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-luxury-black mb-8 leading-tight">
            Crafting a New <br />
            <span className="italic font-normal">Fashion Legacy</span>
          </h1>
          <p className="text-lg font-poppins text-gray-600 leading-relaxed mb-8">
            ELITE was born from a passion for timeless elegance and modern sophistication. We believe that fashion is more than what you wear; it's a form of self-expression and a way to navigate the world with confidence and grace.
          </p>
          <div className="grid grid-cols-2 gap-8 py-8 border-t border-gray-100">
            <div>
              <h4 className="text-3xl font-playfair font-bold text-luxury-black mb-2">10k+</h4>
              <p className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">Monthly Readers</p>
            </div>
            <div>
              <h4 className="text-3xl font-playfair font-bold text-luxury-black mb-2">500+</h4>
              <p className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">Style Guides</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden luxury-shadow">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-luxury-beige -z-10" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-luxury-beige px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-luxury-black mb-12 italic">"Luxury is not a price tag, it's a state of mind."</h2>
          <p className="text-xl font-poppins text-gray-600 leading-relaxed">
            Our mission is to bridge the gap between high-end couture and everyday wearable style. We curate the best of the fashion world, bringing you insights that are both aspirational and accessible.
          </p>
        </div>
      </section>

      {/* Team / Editor Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: "Elena Vance", role: "Editor in Chief", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
            { name: "Julian Moore", role: "Creative Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
            { name: "Sophia Loren", role: "Senior Stylist", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="group"
            >
              <div className="aspect-square overflow-hidden mb-6 luxury-shadow grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-2xl font-playfair font-bold text-luxury-black">{member.name}</h4>
              <p className="text-xs font-montserrat uppercase tracking-[0.2em] text-luxury-pink mt-2">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
