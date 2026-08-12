import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogService } from '../../data/blogService';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const TrendingSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await blogService.getAllBlogs();
      setBlogs(data);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  return (
    <section className="py-24 bg-luxury-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-luxury-black">
          Trending <span className="italic font-normal">Now</span>
        </h2>
      </div>

      <div className="px-4 md:px-12">
        {loading ? (
          <div className="w-full text-center py-12 text-gray-400 font-poppins italic">Loading trending stories...</div>
        ) : blogs.length > 0 ? (
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={0}
            slidesPerView={1}
            freeMode={false}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
                freeMode: true,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 30,
                freeMode: true,
              },
              1440: {
                slidesPerView: 4.5,
                spaceBetween: 30,
                freeMode: true,
              },
            }}
            className="trending-swiper"
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={blog._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${blog._id}`}>
                    <div className="relative aspect-[3/4] mb-6 overflow-hidden luxury-shadow rounded-sm">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-left">
                        <span className="text-[10px] font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-pink mb-2 block">
                          {blog.category}
                        </span>
                        <h3 className="text-white text-xl md:text-2xl font-playfair font-bold leading-tight group-hover:text-luxury-pink transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full text-center py-12 text-gray-400 font-poppins italic">No trending stories yet.</div>
        )}
      </div>
    </section>
  );
};

export default TrendingSection;
