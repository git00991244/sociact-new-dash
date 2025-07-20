import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [currentPageTitle, setCurrentPageTitle] = useState('Dashboard');

  const handleNavigation = (path, label) => {
    setCurrentPath(path);
    setCurrentPageTitle(label);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex min-h-screen bg-slate-900">
          <Sidebar currentPath={currentPath} onNavigate={handleNavigation} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route 
                path="/analytics" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
                      <p className="text-slate-400">Coming soon... This will show detailed analytics and insights.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/comment-automation" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Comment Automation</h1>
                      <p className="text-slate-400">Automate engaging comments on YouTube and Instagram with AI-powered responses.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/image-generation" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">AI Image Generation</h1>
                      <p className="text-slate-400">Create stunning visuals and graphics for your social media campaigns.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/video-generation" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Video Generation</h1>
                      <p className="text-slate-400">Generate professional videos with AI avatars and automated editing.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/auto-video-editor" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Auto Video Editor</h1>
                      <p className="text-slate-400">Automatically edit and optimize your video content with AI.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/ugc-ads" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">UGC Ad Creator</h1>
                      <p className="text-slate-400">Create authentic user-generated content ads with custom avatars.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/product-ads" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Product Ad Creator</h1>
                      <p className="text-slate-400">Design compelling product advertisements with AI assistance.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/avatar-studio" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Avatar Studio</h1>
                      <p className="text-slate-400">Create and manage custom avatars for your video content.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Settings</h1>
                      <p className="text-slate-400">Manage your account settings and preferences.</p>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/support" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
                      <p className="text-slate-400">Get help with using Sociact AI and contact our support team.</p>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;