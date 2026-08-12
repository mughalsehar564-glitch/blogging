import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { contactService } from '../data/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your message...' });

    const result = await contactService.saveSubmission(formData);

    if (result.success) {
      setStatus({ type: 'success', message: 'Thank you! Your message has been received.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } else {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-luxury-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-luxury-orange font-montserrat text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-luxury-black mb-8 leading-tight">
            Let's <span className="italic font-normal">Connect</span>
          </h1>
          <p className="text-lg font-poppins text-gray-600 leading-relaxed mb-12">
            Have a story to share, a collaboration in mind, or simply want to say hello? We'd love to hear from you.
          </p>

          <div className="space-y-8 mb-16">
            <div className="flex items-center space-x-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-luxury-orange group-hover:text-white transition-colors duration-300">
                <FiMail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                <p className="text-lg font-poppins text-luxury-black font-bold">hello@elitefashion.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-luxury-orange group-hover:text-white transition-colors duration-300">
                <FiPhone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400 mb-1">Call Us</p>
                <p className="text-lg font-poppins text-luxury-black font-bold">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-luxury-orange group-hover:text-white transition-colors duration-300">
                <FiMapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400 mb-1">Visit Us</p>
                <p className="text-lg font-poppins text-luxury-black font-bold">123 Fashion Ave, Paris, FR</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-6">
            {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 border border-luxury-black/10 rounded-full flex items-center justify-center hover:bg-luxury-black hover:text-white transition-all duration-300">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-12 luxury-shadow rounded-sm border border-gray-50"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-orange transition-colors font-poppins" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-orange transition-colors font-poppins" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-orange transition-colors font-poppins" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-orange transition-colors font-poppins" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-montserrat uppercase tracking-widest text-gray-400">Your Message</label>
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-orange transition-colors font-poppins resize-none" 
              />
            </div>

            {status.message && (
              <div className={`p-4 text-xs font-montserrat font-bold uppercase tracking-widest rounded ${
                status.type === 'success' ? 'bg-green-50 text-green-600' : 
                status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {status.message}
              </div>
            )}

            <button 
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full bg-luxury-black text-white py-5 rounded-sm font-montserrat text-xs font-bold uppercase tracking-[0.3em] hover:bg-luxury-orange transition-all duration-300 disabled:opacity-50"
            >
              {status.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
