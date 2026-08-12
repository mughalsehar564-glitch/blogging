import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiPlusCircle, FiList, FiGrid, FiSettings, FiLogOut, FiMenu, FiX, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { settings } = useSettings();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/admin' },
    { name: 'Add Blog', icon: FiPlusCircle, path: '/admin/add-blog' },
    { name: 'Manage Blogs', icon: FiList, path: '/admin/manage-blogs' },
    { name: 'Categories', icon: FiGrid, path: '/admin/categories' },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Overlay */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div 
          className="fixed inset-0 bg-black/50 z-[45] backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`bg-luxury-black text-white transition-all duration-300 
        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 md:w-20 -translate-x-full md:translate-x-0'} 
        fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col overflow-hidden`}>
        <div className="p-6 flex items-center justify-between mb-10 flex-shrink-0">
          <Link to="/" className={`flex items-center space-x-2 font-playfair font-bold text-2xl tracking-widest ${!isSidebarOpen && 'md:hidden'}`}>
            {settings.logo && (
              <img src={settings.logo} alt={settings.siteTitle} className="h-10 w-10 object-cover rounded-full border border-white/20 invert" />
            )}
            <span>
              {settings.siteTitle.split(' ')[0]}<span className="text-luxury-pink">.</span>
            </span>
          </Link>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white p-2 md:hidden">
            <FiX size={20} />
          </button>
        </div>

        <nav className="px-4 space-y-2 flex-grow overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => window.innerWidth <= 768 && setIsSidebarOpen(false)}
              className={`flex items-center p-4 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-luxury-pink text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {(isSidebarOpen || window.innerWidth <= 768) && (
                <span className={`ml-4 font-montserrat text-sm uppercase tracking-widest truncate ${!isSidebarOpen && 'md:hidden'}`}>
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 flex-shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center p-4 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <FiLogOut size={20} className="flex-shrink-0" />
            {(isSidebarOpen || window.innerWidth <= 768) && (
              <span className={`ml-4 font-montserrat text-sm uppercase tracking-widest truncate ${!isSidebarOpen && 'md:hidden'}`}>
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-grow min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 p-4 md:p-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-luxury-black p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiMenu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-playfair font-bold text-luxury-black truncate">Admin Panel</h2>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-6">
            <button className="text-gray-400 hover:text-luxury-black relative p-2">
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-luxury-pink rounded-full" />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer group p-1">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-luxury-beige flex items-center justify-center text-luxury-black group-hover:bg-luxury-pink group-hover:text-white transition-colors">
                <FiUser size={18} />
              </div>
              <span className="text-xs md:text-sm font-montserrat font-bold text-luxury-black hidden sm:block uppercase tracking-widest">ADMIN</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors p-2"
              title="Logout"
            >
              <FiLogOut size={20} />
              <span className="text-[10px] font-montserrat font-bold uppercase tracking-widest hidden lg:block">Logout</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
