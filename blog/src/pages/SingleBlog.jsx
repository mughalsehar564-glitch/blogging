import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiShare2, FiBookmark, FiMessageCircle, FiChevronRight } from 'react-icons/fi';
import { blogService } from '../data/blogService';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const data = await blogService.getBlogById(id);
      setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-poppins text-gray-400 italic">
        Loading the story...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-playfair font-bold text-luxury-black mb-4">Story Not Found</h1>
        <Link to="/blogs" className="text-luxury-pink font-montserrat text-xs font-bold uppercase tracking-widest hover:underline">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex items-center space-x-2 text-[10px] font-montserrat uppercase tracking-widest text-gray-400">
        <Link to="/" className="hover:text-luxury-pink transition-colors">Home</Link>
        <FiChevronRight />
        <Link to="/blogs" className="hover:text-luxury-pink transition-colors">Journal</Link>
        <FiChevronRight />
        <span className="text-luxury-black truncate max-w-[200px]">{blog.title}</span>
      </div>

      {/* Hero Header */}
      <header className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-luxury-pink font-montserrat text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-luxury-black mb-8 leading-[1.2]">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-sm font-poppins text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-luxury-beige flex items-center justify-center text-luxury-black font-bold uppercase">
                {blog.author?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-luxury-black font-bold">{blog.author?.name || 'Admin'}</span>
            </div>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{Math.ceil(blog.content.length / 1000)} min read</span>
          </div>
        </motion.div>
      </header>

      {/* Main Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-20"
      >
        <div className="w-full overflow-hidden luxury-shadow rounded-sm bg-gray-50">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-auto object-contain max-h-[80vh] mx-auto block" 
          />
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24">
        {/* Left Sidebar - Socials */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center space-y-8 sticky top-32 h-fit">
          <button className="p-3 rounded-full hover:bg-luxury-beige transition-colors text-luxury-black">
            <FiShare2 size={20} />
          </button>
          <button className="p-3 rounded-full hover:bg-luxury-beige transition-colors text-luxury-black">
            <FiBookmark size={20} />
          </button>
          <button className="p-3 rounded-full hover:bg-luxury-beige transition-colors text-luxury-black">
            <FiMessageCircle size={20} />
          </button>
        </div>

        {/* Article Body */}
        <article className="lg:col-span-8 space-y-8">
          <div className="prose prose-luxury max-w-none">
            <div className="text-lg font-poppins text-gray-600 leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-12 border-t border-gray-100 flex flex-wrap gap-3">
              {blog.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-luxury-beige text-[10px] font-montserrat font-bold uppercase tracking-widest text-luxury-black">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );};

export default SingleBlog;
