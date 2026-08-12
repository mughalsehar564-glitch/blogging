import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { categoryService } from '../../data/categoryService';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const data = await categoryService.getAllCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleAddCategory = async () => {
    const name = prompt('Enter category name:');
    if (name) {
      const toastId = toast.loading('Creating category...');
      try {
        await categoryService.createCategory({ name });
        toast.success('Category created successfully', { id: toastId });
        fetchCategories();
      } catch (error) {
        toast.error('Failed to create category', { id: toastId });
      }
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      const toastId = toast.loading('Deleting category...');
      const success = await categoryService.deleteCategory(id);
      if (success) {
        toast.success('Category deleted successfully', { id: toastId });
        fetchCategories();
      } else {
        toast.error('Failed to delete category', { id: toastId });
      }
    }
  };

  const handleEdit = (name) => {
    toast.error(`Edit functionality for "${name}" will be connected soon!`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-playfair font-bold text-luxury-black">Manage <span className="italic font-normal">Categories</span></h1>
        <button 
          onClick={handleAddCategory}
          className="flex items-center space-x-2 bg-luxury-black text-white px-6 py-3 rounded-lg font-montserrat text-xs font-bold uppercase tracking-widest hover:bg-luxury-pink transition-colors"
        >
          <FiPlus />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-400 font-poppins italic">Loading categories...</div>
        ) : categories.length > 0 ? categories.map((cat, i) => (
          <div key={cat._id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 group hover:border-luxury-pink transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-luxury-beige to-white flex items-center justify-center mb-6`}>
              <div className="w-6 h-6 bg-luxury-black/10 rounded-full" />
            </div>
            <h3 className="text-xl font-playfair font-bold text-luxury-black mb-2">{cat.name}</h3>
            <p className="text-xs text-gray-400 font-montserrat uppercase tracking-widest mb-6">{cat.count || 0} Articles</p>
            <div className="flex items-center space-x-4 border-t border-gray-50 pt-6">
              <button 
                onClick={() => handleEdit(cat.name)}
                className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-black transition-colors flex items-center space-x-2"
              >
                <FiEdit2 size={14} />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDelete(cat._id, cat.name)}
                className="text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-2"
              >
                <FiTrash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-gray-400 font-poppins italic">No categories found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;

