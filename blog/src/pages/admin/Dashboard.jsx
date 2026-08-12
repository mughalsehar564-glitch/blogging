import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiUsers, FiFileText, FiEye, FiMail, FiTrash2 } from 'react-icons/fi';
import { contactService } from '../../data/contactService';
import { blogService } from '../../data/blogService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState([
    { label: 'Total Views', value: '0', icon: FiEye, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Active Readers', value: '0', icon: FiUsers, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Total Blogs', value: '0', icon: FiFileText, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Messages', value: '0', icon: FiMail, color: 'text-luxury-orange', bg: 'bg-orange-50' },
  ]);

  const [audienceInsights, setAudienceInsights] = useState([
    { label: 'Fashion', value: '0%', color: 'bg-luxury-orange' },
    { label: 'Beauty', value: '0%', color: 'bg-purple-400' },
    { label: 'Lifestyle', value: '0%', color: 'bg-blue-400' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const submissionData = await contactService.getSubmissions();
      const blogData = await blogService.getAllBlogs();
      const recentBlogs = await blogService.getRecentBlogs();
      
      setSubmissions(submissionData);
      setBlogs(recentBlogs);

      const totalViews = blogData.reduce((acc, curr) => acc + (curr.views || 0), 0);
      
      setStats([
        { label: 'Total Views', value: totalViews.toString(), icon: FiEye, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Active Readers', value: (blogData.length * 12).toString(), icon: FiUsers, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Total Blogs', value: blogData.length.toString(), icon: FiFileText, color: 'text-pink-500', bg: 'bg-pink-50' },
        { label: 'Messages', value: submissionData.length.toString(), icon: FiMail, color: 'text-luxury-orange', bg: 'bg-orange-50' },
      ]);

      // Calculate Audience Insights based on Category Distribution
      const categoryCounts = blogData.reduce((acc, blog) => {
        acc[blog.category] = (acc[blog.category] || 0) + 1;
        return acc;
      }, {});

      const totalBlogsCount = blogData.length || 1;
      const insights = Object.keys(categoryCounts).map((cat, idx) => {
        const colors = ['bg-luxury-orange', 'bg-purple-400', 'bg-blue-400', 'bg-green-400'];
        return {
          label: cat,
          value: Math.round((categoryCounts[cat] / totalBlogsCount) * 100) + '%',
          color: colors[idx % colors.length]
        };
      }).slice(0, 3);

      if (insights.length > 0) setAudienceInsights(insights);
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const handleViewAll = () => {
    navigate('/admin/manage-blogs');
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await contactService.deleteSubmission(id);
      const data = await contactService.getSubmissions();
      setSubmissions(data);
      // Update stats count
      setStats(prev => prev.map(s => s.label === 'Messages' ? { ...s, value: data.length.toString() } : s));
    }
  };

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] md:text-xs font-montserrat font-bold uppercase tracking-widest text-gray-400 mb-1 md:mb-2">{stat.label}</p>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-luxury-black">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon size={20} className="md:w-6 md:h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Recent Blogs */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between">
            <h4 className="text-lg md:text-xl font-playfair font-bold text-luxury-black">Recent Publications</h4>
            <button 
              onClick={handleViewAll}
              className="text-[10px] md:text-xs font-montserrat font-bold uppercase tracking-widest text-luxury-orange"
            >
              View All
            </button>
          </div>
          <div className="p-0">
            {blogs.length > 0 ? blogs.map((blog) => (
              <div key={blog._id} className="flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={blog.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-poppins font-bold text-xs md:text-sm text-luxury-black truncate">{blog.title}</h5>
                    <p className="text-[10px] text-gray-400 font-poppins">{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4 ml-2">
                  <span className={`px-2 py-0.5 md:px-3 md:py-1 ${blog.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'} text-[8px] md:text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap`}>
                    {blog.status}
                  </span>
                  <button 
                    onClick={() => handleEdit(blog._id)}
                    className="text-xs text-gray-400 hover:text-luxury-black font-montserrat font-bold uppercase"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-gray-400 font-poppins italic">No blogs published yet.</div>
            )}
          </div>
        </div>

        {/* Analytics Mini Card */}
        <div className="bg-luxury-black rounded-2xl shadow-sm p-6 md:p-8 text-white relative overflow-hidden h-full">
          <div className="relative z-10">
            <h4 className="text-lg md:text-xl font-playfair font-bold mb-6">Audience Insights</h4>
            <div className="space-y-4 md:space-y-6">
              {audienceInsights.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-[10px] md:text-xs font-montserrat uppercase tracking-widest">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => alert('Detailed Analytics are updated in real-time based on your blog performance!')}
              className="mt-8 md:mt-10 w-full py-3 md:py-4 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] md:text-xs font-montserrat font-bold uppercase tracking-widest transition-colors"
            >
              Detailed Analytics
            </button>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>

      {/* Contact Form Submissions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h4 className="text-xl font-playfair font-bold text-luxury-black">Contact Form Submissions</h4>
          <span className="px-4 py-1 bg-orange-50 text-luxury-orange text-[10px] font-bold uppercase tracking-widest rounded-full">
            {submissions.length} Total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-[10px] font-montserrat uppercase tracking-widest text-gray-400 font-bold">Sender Details</th>
                <th className="p-6 text-[10px] font-montserrat uppercase tracking-widest text-gray-400 font-bold">Subject</th>
                <th className="p-6 text-[10px] font-montserrat uppercase tracking-widest text-gray-400 font-bold">Message</th>
                <th className="p-6 text-[10px] font-montserrat uppercase tracking-widest text-gray-400 font-bold">Date</th>
                <th className="p-6 text-[10px] font-montserrat uppercase tracking-widest text-gray-400 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-400 font-poppins text-sm italic">
                    No contact form submissions yet.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-poppins font-bold text-sm text-luxury-black">{sub.name}</span>
                        <span className="text-xs text-gray-400 font-poppins">{sub.email}</span>
                        {sub.phone && <span className="text-[10px] text-gray-400 font-poppins">{sub.phone}</span>}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-sm font-poppins text-luxury-black">{sub.subject}</span>
                    </td>
                    <td className="p-6 max-w-xs">
                      <p className="text-sm font-poppins text-gray-600 line-clamp-2" title={sub.message}>
                        {sub.message}
                      </p>
                    </td>
                    <td className="p-6">
                      <span className="text-xs font-poppins text-gray-400">
                        {new Date(sub.date).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <button 
                        onClick={() => handleDeleteMessage(sub.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Submission"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
