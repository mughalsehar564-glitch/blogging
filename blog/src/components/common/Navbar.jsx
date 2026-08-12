import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin, user, logout } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Trends', path: '/trends' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Dashboard button sirf tab dikhay ga jab admin login ho
  if (isAdmin) {
    navLinks.push({ name: 'Dashboard', path: '/admin' });
  }

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4',
        isScrolled 
          ? 'bg-luxury-white/80 backdrop-blur-lg py-3 shadow-luxury border-b border-luxury-pink/10' 
          : 'bg-luxury-beige/40 backdrop-blur-sm border-b border-luxury-black/5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 text-xl md:text-4xl font-playfair font-bold tracking-tighter text-luxury-black group">
            {settings.logo && (
              <img src={settings.logo} alt={settings.siteTitle} className="h-8 w-8 md:h-12 md:w-12 object-cover rounded-full border border-luxury-pink/20" />
            )}
            <span className="truncate max-w-[120px] sm:max-w-none">
              {settings.siteTitle.split(' ')[0]}<span className="text-luxury-pink group-hover:animate-pulse">.</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-[10px] font-montserrat font-bold uppercase tracking-[0.2em] transition-all hover:text-luxury-pink',
                location.pathname === link.path ? 'text-luxury-pink' : 'text-luxury-black'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button & Desktop Auth */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <div className="hidden lg:block">
            {user || isAdmin ? (
              <button 
                onClick={handleLogout}
                className="text-[10px] font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-black hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="bg-luxury-black text-white px-6 py-2.5 text-[10px] font-montserrat font-bold uppercase tracking-widest hover:bg-luxury-pink transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
          <button
            className="lg:hidden text-luxury-black p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-luxury-white border-t border-luxury-pink/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'text-xs font-montserrat font-bold uppercase tracking-[0.2em] py-2 text-center',
                    location.pathname === link.path ? 'text-luxury-pink' : 'text-luxury-black'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-luxury-black/5 w-full flex flex-col items-center">
                {user || isAdmin ? (
                  <button 
                    onClick={handleLogout}
                    className="text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-red-500 w-full text-center"
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-pink text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
