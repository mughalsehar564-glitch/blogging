import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const { isAdmin } = useAuth();
  const { settings } = useSettings();
  return (
    <footer className="bg-luxury-beige pt-20 pb-10 px-6 md:px-12 border-t border-luxury-pink/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Quote */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3 text-3xl font-playfair font-bold tracking-widest text-luxury-black">
            {settings.logo && (
              <img src={settings.logo} alt={settings.siteTitle} className="h-12 w-12 object-cover rounded-full border border-luxury-pink/20" />
            )}
            <span>
              {settings.siteTitle.split(' ')[0]}<span className="text-luxury-pink">.</span>
            </span>
          </Link>
          <p className="italic font-playfair text-gray-600 leading-relaxed">
            {settings.siteDescription}
          </p>
          <div className="flex space-x-5">
            {Object.keys(settings.socials).map((key) => {
              const icons = { instagram: FiInstagram, twitter: FiTwitter, facebook: FiFacebook, youtube: FiYoutube };
              const Icon = icons[key];
              return settings.socials[key] ? (
                <a key={key} href={`https://${key}.com/${settings.socials[key].replace('@', '')}`} target="_blank" rel="noreferrer" className="text-luxury-black hover:text-luxury-pink transition-colors">
                  <Icon size={20} />
                </a>
              ) : null;
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Blogs', 'Trends', 'Categories', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className="text-gray-600 hover:text-luxury-pink transition-colors font-poppins text-sm">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest mb-6">Categories</h4>
          <ul className="space-y-4">
            {['Fashion', 'Beauty', 'Lifestyle', 'Makeup', 'Accessories'].map((item) => (
              <li key={item}>
                <Link to="/categories" className="text-gray-600 hover:text-luxury-pink transition-colors font-poppins text-sm">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest mb-6">Stay Inspired</h4>
          <p className="text-sm text-gray-600 mb-6 font-poppins leading-relaxed">
            Join our luxury circle for the latest trends and exclusive style tips.
          </p>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white px-4 py-3 text-sm border border-luxury-pink/20 focus:outline-none focus:border-luxury-pink transition-colors"
            />
            <button className="bg-luxury-black text-white py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-200 flex flex-col md:row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-xs text-gray-400 font-poppins uppercase">
          © {new Date().getFullYear()} {settings.siteTitle}. ALL RIGHTS RESERVED.
        </p>
        <div className="flex space-x-6 text-xs text-gray-400 font-poppins">
          {isAdmin ? (
            <Link to="/admin" className="hover:text-luxury-pink">Admin Dashboard</Link>
          ) : (
            <Link to="/admin-login" className="hover:text-luxury-black/30 hover:text-luxury-pink transition-colors">Admin</Link>
          )}
          <a href="#" className="hover:text-luxury-pink">Privacy Policy</a>
          <a href="#" className="hover:text-luxury-pink">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
