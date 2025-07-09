import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter from this import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExploreData from './pages/ExploreData';
import Profile from './pages/Profile';
import SubmitData from './pages/SubmitData';

import { useUserStore } from './context/useUserStore';
import { initAuth } from './services/auth';
import LoadingSpinner from './components/LoadingSpinner';
import DaoDashboard from './pages/DaoDashboard';
import NotFound from './pages/NotFound';
import AuthWrapper from './components/AuthWrapper';

const App = () => {
  const { isAuthenticated, isLoading, initializeAuth } = useUserStore();

  useEffect(() => {
    const init = async () => {
      try {
        await initAuth();
        initializeAuth();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    };
    init();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
  <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
      <div className="min-h-screen bg-black/20 backdrop-blur-sm">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreData />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/submit" element={<SubmitData />} />
            <Route path="/dashboard" element={<DaoDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </div>
  </AuthWrapper>
  );
};

export default App;