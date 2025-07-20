import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Bot, 
  Video, 
  Image as ImageIcon, 
  MessageCircle, 
  Edit3, 
  Calendar, 
  BarChart3, 
  Search,
  Sparkles,
  Play,
  Pause,
  Settings,
  Upload,
  Download,
  LayoutDashboard,
  PieChart,
  Wand2,
  User,
  Plus
} from 'lucide-react';
import mockData from '../data/mockData';

const Dashboard = ({ activePage, setActivePage }) => {
  const [agents, setAgents] = useState(mockData.agents);
  const [activities, setActivities] = useState(mockData.recentActivities);
  const [searchInput, setSearchInput] = useState('');

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = mockData.generateRandomActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sidebarSections = [
    {
      title: 'DASHBOARD',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: PieChart }
      ]
    },
    {
      title: 'AI TOOLS',
      items: [
        { id: 'comment-automation', label: 'Comment Automation', icon: MessageCircle, badge: 'NEW' },
        { id: 'image-generation', label: 'Image Generation', icon: ImageIcon },
        { id: 'video-generation', label: 'Video Generation', icon: Video },
        { id: 'auto-video-editor', label: 'Auto Video Editor', icon: Edit3 }
      ]
    },
    {
      title: 'AD CREATION',
      items: [
        { id: 'ugc-ads', label: 'UGC Ads Creator', icon: Wand2 },
        { id: 'product-ads', label: 'Product Ads Creator', icon: Sparkles },
        { id: 'avatar-studio', label: 'Avatar Studio', icon: User }
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const mainFeatures = [
    {
      id: 'comment-automation',
      title: 'Comment Automation',
      description: 'Automate engaging comments on YouTube and Instagram with AI-powered responses',
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/20',
      status: 'Active',
      statusColor: 'bg-green-500'
    },
    {
      id: 'image-generation',
      title: 'AI Image Generation',
      description: 'Create stunning visuals and graphics for your social media campaigns',
      icon: ImageIcon,
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-500/20',
      status: 'Processing',
      statusColor: 'bg-blue-500'
    },
    {
      id: 'video-generation',
      title: 'Video Generation',
      description: 'Generate professional videos with AI avatars and automated editing',
      icon: Video,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      status: 'Active',
      statusColor: 'bg-green-500'
    },
    {
      id: 'ugc-ads',
      title: 'UGC Ad Creator',
      description: 'Create authentic user-generated content ads with custom avatars',
      icon: Wand2,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      status: 'Generating',
      statusColor: 'bg-purple-500'
    }
  ];

  const getAgentStatus = (status) => {
    const statusMap = {
      'Active': { color: 'bg-green-500', text: 'Active', icon: '🟢' },
      'Processing': { color: 'bg-blue-500', text: 'Processing', icon: '🔄' },
      'Generating': { color: 'bg-purple-500', text: 'Generating', icon: '⚡' },
      'Idle': { color: 'bg-gray-400', text: 'Idle', icon: '⚫' }
    };
    return statusMap[status] || statusMap.Idle;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // Process natural language commands
      const command = searchInput.toLowerCase();
      let response = '';
      let targetPage = null;

      if (command.includes('generate') && (command.includes('reel') || command.includes('video'))) {
        response = `🎬 Processing: "${searchInput}" - Redirecting to Video Generation...`;
        targetPage = 'video-generation';
      } else if (command.includes('create') && (command.includes('image') || command.includes('thumbnail'))) {
        response = `🖼️ Processing: "${searchInput}" - Redirecting to Image Generation...`;
        targetPage = 'image-generation';
      } else if (command.includes('comment') && (command.includes('reply') || command.includes('automate'))) {
        response = `💬 Processing: "${searchInput}" - Redirecting to Comment Automation...`;
        targetPage = 'comment-automation';
      } else if (command.includes('ugc') || command.includes('ad')) {
        response = `🎭 Processing: "${searchInput}" - Redirecting to UGC Ad Creator...`;
        targetPage = 'ugc-ads';
      } else {
        response = `🤖 Processing: "${searchInput}" - Analyzing request...`;
      }

      const newActivity = {
        id: Date.now(),
        agent: 'Command Agent',
        action: response,
        timestamp: 'Just now',
        icon: '🤖',
        color: 'text-purple-500'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      
      if (targetPage) {
        setTimeout(() => setActivePage(targetPage), 1500);
      }
      
      setSearchInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/50 backdrop-blur-sm border-r border-slate-700">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Sociact AI</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-6">
          {sidebarSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Active Agents Counter */}
        <div className="absolute bottom-6 left-4 right-4">
          <Card className="p-3 bg-slate-800/50 border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">Active Agents</span>
              </div>
              <Badge variant="outline" className="border-green-400 text-green-400">
                {agents.filter(a => a.status === 'active').length}
              </Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, Creator! 👋
            </h1>
            <p className="text-slate-400">
              Let's automate your social media and create amazing content with AI
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Ask Sociact Agents to... generate 5 captions & schedule them"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Execute
              </Button>
            </form>
          </div>

          {/* Main Feature Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {mainFeatures.map((feature) => {
              const Icon = feature.icon;
              const statusInfo = getAgentStatus(feature.status);
              return (
                <Card key={feature.id} className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer" onClick={() => setActivePage(feature.id)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${statusInfo.color} animate-pulse`}></div>
                      <span className="text-xs text-slate-400">{feature.status}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {feature.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-600 hover:border-blue-400 hover:bg-blue-400/10 transition-all"
                  >
                    Launch Tool
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            {mockData.stats.map((stat, index) => (
              <Card key={index} className="p-4 bg-slate-800/30 border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon === 'video' && <Video className="h-4 w-4 text-white" />}
                    {stat.icon === 'image' && <ImageIcon className="h-4 w-4 text-white" />}
                    {stat.icon === 'comment' && <MessageCircle className="h-4 w-4 text-white" />}
                    {stat.icon === 'edit' && <Edit3 className="h-4 w-4 text-white" />}
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="text-xl font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Activity Feed */}
        <div className="w-80 p-6 border-l border-slate-700">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Live Activity Feed</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activities.slice(0, 8).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div className="flex-shrink-0">
                    <span className="text-base">{activity.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {activity.agent}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {activity.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Button */}
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            Create New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;