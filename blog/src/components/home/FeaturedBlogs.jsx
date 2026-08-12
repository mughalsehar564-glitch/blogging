import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogService } from '../../data/blogService';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await blogService.getAllBlogs();
      setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-luxury-black mb-4">
              Featured <span className="italic font-normal">Stories</span>
            </h2>
            <div className="w-24 h-1 bg-luxury-pink mx-auto" />
          </div>
          <p className="max-w-2xl text-gray-500 font-poppins text-sm leading-relaxed">
            Carefully curated articles focusing on the intersection of modern lifestyle and high-end aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-400 font-poppins italic">Loading featured stories...</div>
          ) : blogs.length > 0 ? blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${blog._id}`}>
                <div className="relative overflow-hidden aspect-[4/5] mb-6 luxury-shadow">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 text-[10px] font-montserrat font-bold uppercase tracking-widest">
                    {blog.category}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <FiArrowRight size={24} className="text-luxury-black" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-luxury-black mb-3 group-hover:text-luxury-pink transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 font-poppins text-sm mb-4 line-clamp-2">
                  {blog.description || blog.content.substring(0, 100) + "..."}
                </p>
                <button className="text-xs font-montserrat font-bold uppercase tracking-widest text-luxury-black border-b border-luxury-black/20 pb-1 hover:border-luxury-pink transition-colors">
                  Read More
                </button>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-12 text-center text-gray-400 font-poppins italic">No featured stories found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
