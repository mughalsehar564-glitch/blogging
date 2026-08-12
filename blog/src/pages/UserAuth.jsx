import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { userLogin, userSignup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (formData.email && formData.password) {
        const result = await userLogin(formData.email, formData.password);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.message);
        }
      } else {
        setError('Please fill all fields');
      }
    } else {
      if (formData.name && formData.email && formData.password) {
        const result = await userSignup(formData.name, formData.email, formData.password);
        if (result.success) {
          navigate('/');
        } else {
          setError(result.message);
        }
      } else {
        setError('Please fill all fields');
      }
    }
  };

  return (
    <div className="min-h-screen bg-luxury-beige flex items-center justify-center px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-luxury p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-black mb-2">
            {isLogin ? 'Welcome Back' : 'Join Elite'}
          </h1>
          <p className="text-gray-500 font-poppins text-sm">
            {isLogin ? 'Please enter your details to sign in' : 'Create an account to start your journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode='wait'>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border-0 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-luxury-pink/20 font-poppins text-sm transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-gray-400">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-50 border-0 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-luxury-pink/20 font-poppins text-sm transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-gray-400">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-50 border-0 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-luxury-pink/20 font-poppins text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-poppins">{error}</p>}

          <button
            type="submit"
            className="w-full bg-luxury-black text-white py-4 rounded-xl font-montserrat font-bold uppercase tracking-[0.2em] text-xs hover:bg-luxury-pink transition-all flex items-center justify-center space-x-2 group"
          >
            <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-poppins text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-luxury-pink font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserAuth;
