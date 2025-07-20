import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Video, 
  Play,
  Pause,
  Download,
  Settings,
  Upload,
  User,
  Mic,
  Volume2,
  Clock,
  FileVideo,
  Sparkles,
  RotateCcw,
  Share2,
  ChevronDown,
  Zap
} from 'lucide-react';

const VideoGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState('');
  const [selectedModel, setSelectedModel] = useState('google-veo-2');
  const [selectedAvatar, setSelectedAvatar] = useState('professional');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [duration, setDuration] = useState('60');
  
  const [generatedVideos, setGeneratedVideos] = useState([
    {
      id: 1,
      title: 'Product Demo - Sociact Features',
      thumbnail: 'https://images.unsplash.com/photo-1720962158789-9389a4f399da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDB8fHx8MTc1MzAxMDM0M3ww&ixlib=rb-4.1.0&q=85',
      duration: '2:34',
      avatar: 'Professional',
      voice: 'Sarah',
      timestamp: '10 mins ago',
      status: 'completed',
      views: 147
    },
    {
      id: 2,
      title: 'Instagram Reel - Quick Tips',
      thumbnail: 'https://images.unsplash.com/photo-1720962158858-5fb16991d2b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHx0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDB8fHx8MTc1MzAxMDM0M3ww&ixlib=rb-4.1.0&q=85',
      duration: '0:45',
      avatar: 'Casual',
      voice: 'Mike',
      timestamp: '25 mins ago',
      status: 'completed',
      views: 89
    }
  ]);

  const models = [
    {
      id: 'google-veo-2',
      name: 'Google Veo 2',
      description: 'HD outputs with visually rich content',
      time: '5 min',
      credits: '20+',
      badge: 'Hot'
    },
    {
      id: 'kling-2',
      name: 'Kling 2.0',
      description: 'Better motion dynamics and aesthetics',
      time: '8 min',
      credits: '100+',
      badge: null
    },
    {
      id: 'pixverse-v4',
      name: 'Pixverse V4',
      description: 'Improved motion and coherence',
      time: '60 sec',
      credits: '10+',
      badge: null
    }
  ];

  const avatars = [
    { id: 'professional', name: 'Professional', description: 'Business suit, formal look' },
    { id: 'casual', name: 'Casual', description: 'Friendly, approachable style' },
    { id: 'creative', name: 'Creative', description: 'Artistic, trendy appearance' },
    { id: 'tech', name: 'Tech Expert', description: 'Modern, tech-savvy look' }
  ];

  const voices = [
    { id: 'sarah', name: 'Sarah', description: 'Professional female voice' },
    { id: 'mike', name: 'Mike', description: 'Friendly male voice' },
    { id: 'alex', name: 'Alex', description: 'Energetic unisex voice' },
    { id: 'emma', name: 'Emma', description: 'Warm female narrator' }
  ];

  const generateVideo = () => {
    if (!script.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const newVideo = {
        id: Date.now(),
        title: script.slice(0, 30) + '...',
        thumbnail: 'https://images.unsplash.com/photo-1590417286292-4274afeee179?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1MzAxMDM1MHww&ixlib=rb-4.1.0&q=85',
        duration: '1:23',
        avatar: avatars.find(a => a.id === selectedAvatar)?.name || 'Professional',
        voice: voices.find(v => v.id === selectedVoice)?.name || 'Sarah',
        timestamp: 'Just now',
        status: 'completed',
        views: 0
      };
      setGeneratedVideos(prev => [newVideo, ...prev]);
      setIsGenerating(false);
      setScript('');
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Video Generation</h1>
            <p className="text-slate-400">Turn scripts into professional videos with AI avatars</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Zap className="h-3 w-3 mr-1" />
              Credits: 1,247
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Controls */}
          <div className="col-span-4">
            <div className="space-y-6">
              {/* Model Selection */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-white mb-3">Model</label>
                  <div className="relative">
                    <select 
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    >
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name} - {model.description}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  
                  {/* Model Info */}
                  <div className="mt-3 p-3 bg-slate-700/30 rounded-lg">
                    {(() => {
                      const model = models.find(m => m.id === selectedModel);
                      return (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white">{model?.name}</span>
                              {model?.badge && (
                                <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-400">
                                  {model.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-400 mt-1">{model?.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-300">{model?.time}</p>
                            <p className="text-xs text-slate-400">{model?.credits} credits</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </Card>

              {/* Video Upload Area */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Reference Video (Optional)</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                  <Video className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium mb-1">Click to upload a reference</p>
                  <p className="text-sm text-slate-500">MP4, MOV up to 100MB</p>
                </div>
              </Card>

              {/* Script Input */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Script</label>
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder="Write your video script here... Hi everyone! Welcome to my channel where I share amazing tips about social media automation..."
                  className="w-full h-32 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500">{script.length} characters (~{Math.ceil(script.length / 100)} seconds)</span>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Enhance
                  </Button>
                </div>
              </Card>

              {/* Settings */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Avatar</label>
                    <select 
                      value={selectedAvatar}
                      onChange={(e) => setSelectedAvatar(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400"
                    >
                      {avatars.map(avatar => (
                        <option key={avatar.id} value={avatar.id}>{avatar.name} - {avatar.description}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Voice</label>
                    <select 
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400"
                    >
                      {voices.map(voice => (
                        <option key={voice.id} value={voice.id}>{voice.name} - {voice.description}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Duration</label>
                    <select 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400"
                    >
                      <option value="15">15 seconds</option>
                      <option value="30">30 seconds</option>
                      <option value="60">1 minute</option>
                      <option value="120">2 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Quality</label>
                    <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400">
                      <option value="4k">4K Ultra HD</option>
                      <option value="1080p">1080p HD</option>
                      <option value="720p">720p</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Credits required:</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {models.find(m => m.id === selectedModel)?.credits || '20+'} Credits
                    </Badge>
                  </div>
                  <Button
                    onClick={generateVideo}
                    disabled={isGenerating || !script.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Generating Video...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Video className="h-4 w-4 mr-2" />
                        Generate Video
                      </div>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="mt-4">
                      <Progress value={45} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-400 mt-2 text-center">Processing avatar animations...</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Right Panel - Generated Videos */}
          <div className="col-span-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Generated Videos</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-slate-600">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>

            {generatedVideos.length === 0 ? (
              <div className="text-center py-16">
                <Video className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No videos generated yet</p>
                <p className="text-slate-500 text-sm">Create your first video using the panel on the left</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                {generatedVideos.map((video) => (
                  <div key={video.id} className="group relative">
                    <Card className="overflow-hidden bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full aspect-video object-cover"
                        />
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                          {video.duration}
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-medium text-white mb-2 line-clamp-2">{video.title}</h4>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                          <span>Avatar: {video.avatar}</span>
                          <span>Voice: {video.voice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{video.timestamp}</span>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}

            {generatedVideos.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-slate-600">
                  Load More Videos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneration;