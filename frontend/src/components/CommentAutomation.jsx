import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

const CommentAutomation = () => {
  const [isActive, setIsActive] = useState(false);
  const [platform, setPlatform] = useState('youtube');
  const [accountUrl, setAccountUrl] = useState('');
  const [responseStyle, setResponseStyle] = useState('friendly');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const [completedComments, setCompletedComments] = useState(0);
  const [recentComments, setRecentComments] = useState([]);

  const mockComments = [
    {
      id: 1,
      platform: 'YouTube',
      video: 'AI Tutorial - Getting Started',
      comment: 'Great tutorial! Very helpful for beginners.',
      aiResponse: 'Thank you so much! I\'m glad you found it helpful. Feel free to ask if you have any questions!',
      timestamp: '2 mins ago',
      status: 'replied'
    },
    {
      id: 2,
      platform: 'Instagram',
      post: 'Latest AI Update Post',
      comment: 'When will this feature be available?',
      aiResponse: 'Great question! This feature is currently in beta and will be available next month. Stay tuned for updates!',
      timestamp: '5 mins ago',
      status: 'replied'
    },
    {
      id: 3,
      platform: 'YouTube',
      video: 'Advanced AI Techniques',
      comment: 'Can you make a video about machine learning?',
      aiResponse: 'Absolutely! Machine learning is a fantastic topic. I\'ll add it to my content calendar. Thanks for the suggestion!',
      timestamp: '8 mins ago',
      status: 'replied'
    }
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            setCompletedComments(prev => prev + Math.floor(Math.random() * 3) + 1);
            
            // Add new comment to recent list
            const newComment = mockComments[Math.floor(Math.random() * mockComments.length)];
            setRecentComments(prev => [
              { ...newComment, id: Date.now(), timestamp: 'just now' },
              ...prev.slice(0, 4)
            ]);
            return 0;
          }
          return prev + Math.random() * 15;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleStartAutomation = () => {
    if (!accountUrl) {
      alert('Please enter an account URL or video URL');
      return;
    }
    setIsProcessing(true);
    setProcessProgress(0);
  };

  const stats = [
    { label: 'Comments Processed Today', value: 124, icon: '💬' },
    { label: 'Response Rate', value: '98%', icon: '📈' },
    { label: 'Avg Response Time', value: '2.3s', icon: '⚡' },
    { label: 'Platforms Connected', value: 2, icon: '🔗' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-2xl">
              💬
            </div>
            <div>
              <h1 className="text-3xl font-bold">Comment Automation</h1>
              <p className="text-slate-400">Automate engaging comments on YouTube and Instagram with AI-powered responses</p>
            </div>
            <div className="ml-auto">
              <Badge variant={isActive ? "default" : "secondary"} className={isActive ? "bg-green-500" : "bg-gray-500"}>
                {isActive ? "🟢 Active" : "⚫ Inactive"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>⚙️</span>
                  Automation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Platform</label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="both">Both Platforms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Response Style</label>
                    <Select value={responseStyle} onValueChange={setResponseStyle}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Account/Video URL</label>
                  <Input
                    placeholder="Enter YouTube channel or Instagram profile URL"
                    value={accountUrl}
                    onChange={(e) => setAccountUrl(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Custom Response Prompt (Optional)</label>
                  <Textarea
                    placeholder="Add custom instructions for AI responses..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <h3 className="font-medium">Auto-Reply Mode</h3>
                    <p className="text-sm text-slate-400">Automatically respond to new comments</p>
                  </div>
                  <Switch
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                </div>

                {isProcessing && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-medium">Processing Comments...</span>
                      <span className="text-blue-400">{Math.round(processProgress)}%</span>
                    </div>
                    <Progress value={processProgress} className="h-2" />
                    <p className="text-sm text-slate-400 mt-2">Analyzing and generating responses...</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleStartAutomation}
                    disabled={isProcessing || !accountUrl}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>🚀 Start Comment Automation</>
                    )}
                  </Button>
                  
                  <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                    ⚙️ Advanced Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent AI Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(recentComments.length > 0 ? recentComments : mockComments).slice(0, 5).map((comment) => (
                    <div key={comment.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {comment.platform}
                          </Badge>
                          <span className="text-sm text-slate-400">{comment.video || comment.post}</span>
                        </div>
                        <span className="text-xs text-slate-500">{comment.timestamp}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="p-2 bg-slate-800/50 rounded text-sm">
                          <span className="text-slate-400">Original: </span>
                          <span className="text-slate-200">{comment.comment}</span>
                        </div>
                        <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded text-sm">
                          <span className="text-blue-400">AI Response: </span>
                          <span className="text-white">{comment.aiResponse}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          ✅ {comment.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          Edit Response
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          View Thread
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">📊 Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Rate</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Response Quality</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Satisfaction</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">⚡ Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    📝 Create Response Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    📈 View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    🔔 Set Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    ⚙️ Configure Keywords
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Panel */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">🤖 AI Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">YouTube Bot</span>
                    <Badge variant="default" className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Instagram Bot</span>
                    <Badge variant="default" className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Generator</span>
                    <Badge variant="default" className="bg-blue-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sentiment Analysis</span>
                    <Badge variant="default" className="bg-purple-500">Running</Badge>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400 font-medium">✅ All systems operational</p>
                  <p className="text-xs text-green-300 mt-1">Last updated: just now</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentAutomation;