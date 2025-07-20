import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import CommentAutomation from "./components/CommentAutomation";
import ImageGeneration from "./components/ImageGeneration";
import VideoGeneration from "./components/VideoGeneration";
import AutoVideoEditor from "./components/AutoVideoEditor";
import UGCAdCreator from "./components/UGCAdCreator";
import ProductAdCreator from "./components/ProductAdCreator";
import AvatarStudio from "./components/AvatarStudio";

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
              <Route path="/comment-automation" element={<CommentAutomation />} />
              <Route path="/image-generation" element={<ImageGeneration />} />
              <Route path="/video-generation" element={<VideoGeneration />} />
              <Route path="/auto-video-editor" element={<AutoVideoEditor />} />
              <Route path="/ugc-ads" element={<UGCAdCreator />} />
              <Route path="/product-ads" element={<ProductAdCreator />} />
              <Route path="/avatar-studio" element={<AvatarStudio />} />
              <Route 
                path="/analytics" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-6xl mx-auto">
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl">
                            📊
                          </div>
                          <div>
                            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                            <p className="text-slate-400">Track your AI automation performance and insights</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-2">Total Automations</h3>
                          <p className="text-3xl font-bold text-green-400">1,247</p>
                          <p className="text-sm text-slate-400 mt-1">+12% from last month</p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-2">Content Generated</h3>
                          <p className="text-3xl font-bold text-blue-400">342</p>
                          <p className="text-sm text-slate-400 mt-1">Videos, images, and ads</p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
                          <p className="text-3xl font-bold text-purple-400">94.2%</p>
                          <p className="text-sm text-slate-400 mt-1">Across all platforms</p>
                        </div>
                      </div>
                      
                      <div className="text-center text-slate-400">
                        <p className="text-lg mb-2">🚀 Advanced Analytics Coming Soon</p>
                        <p>Detailed insights, performance metrics, and AI optimization reports will be available here.</p>
                      </div>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center text-2xl">
                            ⚙️
                          </div>
                          <div>
                            <h1 className="text-3xl font-bold">Settings</h1>
                            <p className="text-slate-400">Manage your account settings and AI preferences</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span>Email Notifications</span>
                              <span className="text-green-400">✅ Enabled</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>AI Model Preference</span>
                              <span className="text-blue-400">Advanced GPT-4</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Auto-Save Projects</span>
                              <span className="text-green-400">✅ Enabled</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">AI Automation Settings</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span>Auto Comment Response</span>
                              <span className="text-green-400">✅ Active</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Content Quality Level</span>
                              <span className="text-blue-400">Premium</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>API Rate Limiting</span>
                              <span className="text-yellow-400">⚠️ Standard</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                } 
              />
              <Route 
                path="/support" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                            ❓
                          </div>
                          <div>
                            <h1 className="text-3xl font-bold">Help & Support</h1>
                            <p className="text-slate-400">Get help with using Sociact AI and contact our support team</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">📚 Documentation</h3>
                          <div className="space-y-3">
                            <div className="p-3 bg-slate-700/30 rounded-lg">
                              <h4 className="font-medium">Getting Started Guide</h4>
                              <p className="text-sm text-slate-400">Learn the basics of Sociact AI</p>
                            </div>
                            <div className="p-3 bg-slate-700/30 rounded-lg">
                              <h4 className="font-medium">AI Features Overview</h4>
                              <p className="text-sm text-slate-400">Understand all automation tools</p>
                            </div>
                            <div className="p-3 bg-slate-700/30 rounded-lg">
                              <h4 className="font-medium">Best Practices</h4>
                              <p className="text-sm text-slate-400">Tips for optimal results</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">🎧 Support Options</h3>
                          <div className="space-y-3">
                            <div className="p-3 bg-slate-700/30 rounded-lg">
                              <h4 className="font-medium">Live Chat Support</h4>
                              <p className="text-sm text-slate-400">Available 24/7 for assistance</p>
                            </div>
                            <div className="p-3 bg-slate-700/30 rounded-lg">
                              <h4 className="font-medium">Email Support</h4>
                              <p className="text-sm text-slate-400">support@sociact.ai</p>
                            </div>
                            <div className="p-3 bg-slate-700/30 rounded-lg">
                              <h4 className="font-medium">Community Forum</h4>
                              <p className="text-sm text-slate-400">Connect with other users</p>
                            </div>
                          </div>
                        </div>
                      </div>
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