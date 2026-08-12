import React, { useState, useEffect } from 'react';
import { FiSave, FiUpload, FiGlobe, FiShield, FiBell } from 'react-icons/fi';
import { settingsService } from '../../data/settingsService';
import { useSettings } from '../../context/SettingsContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { refreshSettings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteTitle: 'ELITE Fashion Blog',
    siteDescription: 'Modern luxury fashion and style inspiration for the contemporary individual.',
    logo: '',
    socials: {
      instagram: '',
      twitter: '',
      facebook: '',
      youtube: ''
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await settingsService.getSettings();
      if (data) {
        setFormData({
          siteTitle: data.siteTitle || '',
          siteDescription: data.siteDescription || '',
          logo: data.logo || '',
          socials: {
            instagram: data.socials?.instagram || '',
            twitter: data.socials?.twitter || '',
            facebook: data.socials?.facebook || '',
            youtube: data.socials?.youtube || ''
          }
        });
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    const toastId = toast.loading('Saving settings...');
    setLoading(true);
    try {
      await settingsService.updateSettings(formData);
      await refreshSettings(); // Sync global settings
      toast.success('Settings saved successfully!', { id: toastId });
    } catch (error) {
      toast.error('Failed to save settings', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = () => {
    const url = prompt('Enter Logo Image URL:', formData.logo);
    if (url !== null) {
      setFormData({ ...formData, logo: url });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-playfair font-bold text-luxury-black">Platform <span className="italic font-normal">Settings</span></h1>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center space-x-2 bg-luxury-black text-white px-8 py-3 rounded-lg font-montserrat text-xs font-bold uppercase tracking-widest hover:bg-luxury-pink transition-colors shadow-lg shadow-black/10 disabled:bg-gray-400"
        >
          <FiSave />
          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Navigation Sidebar for Settings */}
        <div className="space-y-2">
          {[
            { name: 'General', icon: FiGlobe },
            { name: 'Security', icon: FiShield },
            { name: 'Notifications', icon: FiBell },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all ${i === 0 ? 'bg-white text-luxury-black shadow-sm font-bold' : 'text-gray-400 hover:text-luxury-black hover:bg-white/50'}`}>
              <item.icon size={18} />
              <span className="font-montserrat text-xs uppercase tracking-widest">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-xl font-playfair font-bold text-luxury-black border-b border-gray-50 pb-6">General Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-8">
                <div className="w-20 h-20 bg-luxury-beige rounded-full flex items-center justify-center text-luxury-black border border-luxury-pink/20 overflow-hidden">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <FiUpload size={24} />
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest text-luxury-black">Logo & Branding</h4>
                  <p className="text-xs text-gray-400 font-poppins">Upload your brand logo (Image URL recommended)</p>
                  <button 
                    onClick={handleLogoChange}
                    className="text-xs font-montserrat font-bold text-luxury-pink uppercase tracking-widest border-b border-luxury-pink/20 pb-1"
                  >
                    Change Logo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-gray-400">Site Title</label>
                  <input 
                    type="text" 
                    value={formData.siteTitle} 
                    onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                    className="w-full bg-gray-50 border-0 rounded-xl px-6 py-4 font-poppins text-sm focus:ring-2 focus:ring-luxury-pink" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-gray-400">Site Description</label>
                  <textarea 
                    rows={3} 
                    value={formData.siteDescription}
                    onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                    className="w-full bg-gray-50 border-0 rounded-xl px-6 py-4 font-poppins text-sm focus:ring-2 focus:ring-luxury-pink resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-xl font-playfair font-bold text-luxury-black border-b border-gray-50 pb-6">Social Connections</h3>
            <div className="space-y-4">
              {['Instagram', 'Twitter', 'Facebook', 'YouTube'].map(social => (
                <div key={social} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <span className="text-sm font-montserrat font-bold uppercase tracking-widest text-gray-600">{social}</span>
                  <input 
                    type="text" 
                    value={formData.socials[social.toLowerCase()]}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socials: { ...formData.socials, [social.toLowerCase()]: e.target.value } 
                    })}
                    placeholder={`@elite_${social.toLowerCase()}`} 
                    className="bg-transparent border-0 text-right text-sm font-poppins text-luxury-pink focus:ring-0 w-1/2" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
