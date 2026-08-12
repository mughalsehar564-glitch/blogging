import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedBlogs from '../components/home/FeaturedBlogs';
import TrendingSection from '../components/home/TrendingSection';
import CategoriesSection from '../components/home/CategoriesSection';
import Newsletter from '../components/home/Newsletter';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedBlogs />
      <TrendingSection />
      <CategoriesSection />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
