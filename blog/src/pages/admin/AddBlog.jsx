import React, { useState, useEffect } from 'react';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';
import { blogService } from '../../data/blogService';
import { categoryService } from '../../data/categoryService';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID if in edit mode
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fashion',
    tags: '',
    image: '', // Empty by default so user can add their own link
    content: '',
    status: 'Published'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Categories
      const catData = await categoryService.getAllCategories();
      setCategories(catData);

      // If ID exists, fetch blog for editing
      if (id) {
        const blogToEdit = await blogService.getBlogById(id);
        if (blogToEdit) {
          setFormData({
            title: blogToEdit.title,
            category: blogToEdit.category,
            tags: blogToEdit.tags.join(', '),
            image: blogToEdit.image,
            content: blogToEdit.content,
            status: blogToEdit.status || 'Published'
          });
        }
      }
    };
    fetchData();
  }, [id]);

  const handlePublish = async () => {
    if (!formData.title || !formData.content || !formData.image) {
      toast.error('Please fill in all required fields (Title, Content, and Image URL)');
      return;
    }

    const toastId = toast.loading(id ? 'Updating story...' : 'Publishing story...');
    setLoading(true);
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      if (id) {
        // Update existing blog
        await blogService.updateBlog(id, blogData);
        toast.success('Story updated successfully!', { id: toastId });
      } else {
        // Create new blog
        await blogService.createBlog(blogData);
        toast.success('Story published successfully!', { id: toastId });
      }
      navigate('/admin/manage-blogs');
    } catch (error) {
      toast.error(id ? 'Failed to update story' : 'Failed to publish story', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-playfair font-bold text-luxury-black">
          {id ? 'Edit' : 'Create New'} <span className="italic font-normal">Story</span>
        </h1>
        <button 
          onClick={handlePublish}
          disabled={loading}
          className="flex items-center space-x-2 bg-luxury-black text-white px-8 py-3 rounded-lg font-montserrat text-xs font-bold uppercase tracking-widest hover:bg-luxury-pink transition-colors disabled:bg-gray-400"
        >
          <FiCheckCircle />
          <span>{loading ? (id ? 'Updating...' : 'Publishing...') : (id ? 'Update Story' : 'Publish Story')}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Story Title</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. The Renaissance of Silk in Modern Fashion" 
            className="w-full text-2xl font-playfair font-bold border-b border-gray-100 py-4 focus:outline-none focus:border-luxury-pink transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-50 border-0 rounded-xl px-6 py-4 font-poppins text-sm focus:ring-2 focus:ring-luxury-pink"
            >
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Lifestyle</option>
              <option>Trends</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          {/* Tags */}
          <div className="space-y-2">
            <label className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Tags (comma separated)</label>
            <input 
              type="text" 
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="luxury, silk, spring2026" 
              className="w-full bg-gray-50 border-0 rounded-xl px-6 py-4 font-poppins text-sm focus:ring-2 focus:ring-luxury-pink"
            />
          </div>
        </div>

        {/* Image Upload Placeholder */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Cover Image URL</label>
            <input 
              type="text" 
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..." 
              className="w-full bg-gray-50 border-0 rounded-xl px-6 py-4 font-poppins text-sm focus:ring-2 focus:ring-luxury-pink"
            />
          </div>
          
          {/* Image Preview */}
          {formData.image && (
            <div className="relative w-full h-64 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                }}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 text-[10px] font-montserrat font-bold uppercase tracking-widest text-luxury-black">
                Preview
              </div>
            </div>
          )}
        </div>

        {/* Content Placeholder */}
        <div className="space-y-2">
          <label className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Story Content</label>
          <textarea 
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Start writing your luxury story here..."
            className="w-full min-h-[400px] bg-gray-50 rounded-2xl p-8 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-luxury-pink"
          />
        </div>
      </div>
    </div>
  );
};

export default AddBlog;

