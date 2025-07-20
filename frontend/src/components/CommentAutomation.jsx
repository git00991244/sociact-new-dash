import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  MessageCircle, 
  Instagram, 
  Youtube, 
  Settings,
  Play,
  Pause,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const CommentAutomation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('instagram');
  const [automationRules, setAutomationRules] = useState([
    {
      id: 1,
      platform: 'Instagram',
      trigger: 'New comment with question',
      response: 'Thank you for your question! We\'ll get back to you soon.',
      status: 'active',
      processed: 24
    },
    {
      id: 2,
      platform: 'YouTube',
      trigger: 'Comment with compliment',
      response: 'Thank you so much! We really appreciate your support! ❤️',
      status: 'active',
      processed: 18
    },
    {
      id: 3,
      platform: 'Instagram',
      trigger: 'Comment with purchase inquiry',
      response: 'Check our bio link for purchasing options! 🛒',
      status: 'paused',
      processed: 12
    }
  ]);

  const [recentComments, setRecentComments] = useState([
    {
      id: 1,
      platform: 'Instagram',
      username: '@sarah_loves_art',
      comment: 'Where can I buy this amazing product?',
      response: 'Check our bio link for purchasing options! 🛒',
      timestamp: '2 mins ago',
      status: 'replied'
    },
    {
      id: 2,
      platform: 'YouTube',
      username: '@techie_mike',
      comment: 'This tutorial is incredible! Thank you!',
      response: 'Thank you so much! We really appreciate your support! ❤️',
      timestamp: '5 mins ago',
      status: 'replied'
    },
    {
      id: 3,
      platform: 'Instagram',
      username: '@fitness_guru_22',
      comment: 'How long does shipping usually take?',
      response: 'Processing...',
      timestamp: '8 mins ago',
      status: 'processing'
    }
  ]);

  const startAutomation = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Add new activity
      const newComment = {
        id: Date.now(),
        platform: activeTab === 'instagram' ? 'Instagram' : 'YouTube',
        username: `@user_${Math.floor(Math.random() * 1000)}`,
        comment: 'This looks amazing! How much does it cost?',
        response: 'Check our bio link for pricing details! 💰',
        timestamp: 'Just now',
        status: 'replied'
      };
      setRecentComments(prev => [newComment, ...prev.slice(0, 9)]);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <MessageCircle className="h-8 w-8 mr-3 text-purple-400" />
              Comment Automation
            </h1>
            <p className="text-slate-400">Automate engaging comments on YouTube and Instagram with AI-powered responses</p>
          </div>
          <Badge variant="outline" className="border-green-400 text-green-400 animate-pulse">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Active
          </Badge>
        </div>

        {/* Platform Tabs */}
        <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('instagram')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'instagram' 
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'youtube' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Youtube className="h-4 w-4" />
            <span>YouTube</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Control Panel */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Automation Control</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={startAutomation}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Automation
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-slate-600">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              {isProcessing && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Processing comments...</span>
                    <span className="text-sm text-white">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full" style={{ width: '75%' }}></div>
                  </Progress>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">89</p>
                  <p className="text-sm text-slate-400">Comments Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">67</p>
                  <p className="text-sm text-slate-400">Auto Replies</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">95%</p>
                  <p className="text-sm text-slate-400">Response Rate</p>
                </div>
              </div>
            </Card>

            {/* Automation Rules */}
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Automation Rules</h3>
                <Button size="sm" variant="outline" className="border-slate-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
              
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              rule.platform === 'Instagram' 
                                ? 'bg-pink-500/20 text-pink-400 border-pink-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}
                          >
                            {rule.platform}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              rule.status === 'active'
                                ? 'border-green-400 text-green-400'
                                : 'border-gray-400 text-gray-400'
                            }`}
                          >
                            {rule.status}
                          </Badge>
                        </div>
                        <p className="font-medium text-white mb-1">{rule.trigger}</p>
                        <p className="text-sm text-slate-400 mb-2">"{rule.response}"</p>
                        <p className="text-xs text-slate-500">{rule.processed} comments processed</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="col-span-4">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Comments</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentComments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {comment.platform === 'Instagram' ? (
                          <Instagram className="h-4 w-4 text-pink-400" />
                        ) : (
                          <Youtube className="h-4 w-4 text-red-400" />
                        )}
                        <span className="text-sm font-medium text-white">{comment.username}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {comment.status === 'replied' && <CheckCircle className="h-3 w-3 text-green-400" />}
                        {comment.status === 'processing' && <Clock className="h-3 w-3 text-yellow-400 animate-spin" />}
                        <span className="text-xs text-slate-500">{comment.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{comment.comment}</p>
                    <p className="text-xs text-slate-300 bg-slate-600/30 p-2 rounded">
                      <strong>Reply:</strong> {comment.response}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentAutomation;