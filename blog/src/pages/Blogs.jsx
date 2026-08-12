import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogService } from '../data/blogService';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-luxury-white pb-24">
      {/* Header */}
      <div className="bg-luxury-beige py-16 md:py-24 px-6 md:px-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold text-luxury-black mb-6">
          The <span className="italic font-normal">Journal</span>
        </h1>
        <p className="text-gray-500 font-montserrat text-[10px] sm:text-sm uppercase tracking-[0.3em]">Curated style insights & stories</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 md:mt-12">
        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 md:mb-16 space-y-8 lg:space-y-0">
          <div className="relative w-full lg:w-96 order-2 lg:order-1">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b border-luxury-black/10 py-3 pl-10 focus:outline-none focus:border-luxury-pink transition-colors font-poppins text-sm"
            />
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto w-full lg:w-auto no-scrollbar pb-4 lg:pb-0 order-1 lg:order-2 justify-start sm:justify-center lg:justify-end">
            {['All', 'Fashion', 'Beauty', 'Lifestyle', 'Trends'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] sm:text-xs font-montserrat font-bold uppercase tracking-widest transition-colors whitespace-nowrap px-1 ${selectedCategory === cat ? 'text-luxury-pink border-b border-luxury-pink' : 'text-luxury-black hover:text-luxury-pink'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-20">
          {loading ? (
            <div className="col-span-full py-24 text-center text-gray-400 font-poppins italic">Loading our latest stories...</div>
          ) : filteredBlogs.length > 0 ? filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${blog._id}`}>
                <div className="aspect-[4/5] overflow-hidden mb-6 luxury-shadow">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-pink">
                    {blog.category}
                  </span>
                  <h3 className="text-2xl font-playfair font-bold text-luxury-black group-hover:text-luxury-pink transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-poppins line-clamp-2">
                    {blog.description || blog.content.substring(0, 150) + "..."}
                  </p>
                  <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                    <span className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <button className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-luxury-black hover:text-luxury-pink transition-colors">Read Article</button>
                  </div>
                </div>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-24 text-center text-gray-400 font-poppins italic">No stories found matching your criteria.</div>
          )}
        </div>

        {/* Load More */}
        {filteredBlogs.length > 9 && (
          <div className="mt-24 text-center">
            <button className="px-12 py-4 border border-luxury-black/10 hover:border-luxury-pink hover:text-luxury-pink transition-all font-montserrat text-xs font-bold uppercase tracking-widest">
              Load More Stories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
