import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Incorrect Password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-beige px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-2xl shadow-luxury border border-gray-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-playfair font-bold text-luxury-black mb-2">Admin Login</h1>
          <p className="text-xs font-montserrat uppercase tracking-widest text-gray-400">Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-gray-50 border-0 rounded-xl px-6 py-4 font-poppins text-sm focus:ring-2 focus:ring-luxury-pink outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-montserrat uppercase tracking-widest text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-luxury-black text-white py-5 rounded-xl font-montserrat text-xs font-bold uppercase tracking-[0.3em] hover:bg-luxury-pink transition-all duration-300 shadow-lg shadow-black/10"
          >
            Login as Admin
          </button>
        </form>

        {/* Hint removed for security */}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
