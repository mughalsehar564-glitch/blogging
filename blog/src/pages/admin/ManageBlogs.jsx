import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { blogService } from '../../data/blogService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await blogService.getAllBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const toastId = toast.loading('Deleting blog...');
      const success = await blogService.deleteBlog(id);
      if (success) {
        toast.success('Blog deleted successfully', { id: toastId });
        fetchBlogs();
      } else {
        toast.error('Failed to delete blog', { id: toastId });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-3xl font-playfair font-bold text-luxury-black">Manage <span className="italic font-normal">Publications</span></h1>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input type="text" placeholder="Search blogs..." className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg focus:outline-none focus:border-luxury-pink text-sm w-full" />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-luxury-black">
            <FiFilter />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Blog Details</th>
                <th className="px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-poppins italic">Loading publications...</td>
                </tr>
              ) : blogs.length > 0 ? blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={blog.image} className="w-12 h-12 rounded object-cover flex-shrink-0" alt="" />
                      <div className="min-w-0">
                        <p className="font-poppins font-bold text-sm text-luxury-black line-clamp-1">{blog.title}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{new Date(blog.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-luxury-beige text-luxury-black text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${blog.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`} />
                      <span className="text-xs text-gray-600 font-poppins">{blog.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => handleEdit(blog._id)}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog._id, blog.title)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-poppins italic">No publications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;

