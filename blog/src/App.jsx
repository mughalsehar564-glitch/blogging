import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import { Toaster } from 'react-hot-toast';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Blogs = lazy(() => import('./pages/Blogs'));
const SingleBlog = lazy(() => import('./pages/SingleBlog'));
const Categories = lazy(() => import('./pages/Categories'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const UserAuth = lazy(() => import('./pages/UserAuth'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AddBlog = lazy(() => import('./pages/admin/AddBlog'));
const ManageBlogs = lazy(() => import('./pages/admin/ManageBlogs'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const Settings = lazy(() => import('./pages/admin/Settings'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-luxury-white font-playfair italic text-luxury-black">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-2 border-luxury-pink border-t-transparent rounded-full animate-spin"></div>
      <p className="animate-pulse">Loading Elite Journal...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Main Website Routes */}
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/blogs" element={<MainLayout><Blogs /></MainLayout>} />
                <Route path="/blog/:id" element={<MainLayout><SingleBlog /></MainLayout>} />
                <Route path="/categories" element={<MainLayout><Categories /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                <Route path="/trends" element={<MainLayout><Blogs /></MainLayout>} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/auth" element={<MainLayout><UserAuth /></MainLayout>} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout><AdminDashboard /></AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/add-blog" element={
                  <ProtectedRoute>
                    <AdminLayout><AddBlog /></AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit-blog/:id" element={
                  <ProtectedRoute>
                    <AdminLayout><AddBlog /></AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/manage-blogs" element={
                  <ProtectedRoute>
                    <AdminLayout><ManageBlogs /></AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/categories" element={
                  <ProtectedRoute>
                    <AdminLayout><AdminCategories /></AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute>
                    <AdminLayout><Settings /></AdminLayout>
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </Router>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
