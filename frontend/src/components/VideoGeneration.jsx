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
  Share2
} from 'lucide-react';

const VideoGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('script');
  const [script, setScript] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('professional');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  
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
    
    // Simulate video generation process
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Video className="h-8 w-8 mr-3 text-blue-400" />
              Video Generation
            </h1>
            <p className="text-slate-400">Generate professional videos with AI avatars and automated editing</p>
          </div>
          <Badge variant="outline" className="border-blue-400 text-blue-400 animate-pulse">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            Active
          </Badge>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Creation Panel */}
          <div className="col-span-4 space-y-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Create Video</h3>
              
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-slate-700/50 p-1 rounded-lg mb-4">
                <button
                  onClick={() => setActiveTab('script')}
                  className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === 'script' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Script
                </button>
                <button
                  onClick={() => setActiveTab('avatar')}
                  className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === 'avatar' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Avatar
                </button>
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === 'voice' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Voice
                </button>
              </div>

              {/* Script Tab */}
              {activeTab === 'script' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Video Script
                    </label>
                    <textarea
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                      placeholder="Write your video script here... Hi everyone! Welcome to my channel where I share amazing tips about social media automation..."
                      className="w-full h-32 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>{script.length} characters</span>
                      <span>~{Math.ceil(script.length / 100)} seconds</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-slate-600">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Script with AI
                  </Button>
                </div>
              )}

              {/* Avatar Tab */}
              {activeTab === 'avatar' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Choose Avatar
                  </label>
                  {avatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedAvatar === avatar.id
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-slate-700/50 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="font-medium text-white">{avatar.name}</p>
                          <p className="text-xs text-slate-400">{avatar.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Voice Tab */}
              {activeTab === 'voice' && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Select Voice
                  </label>
                  {voices.map((voice) => (
                    <div
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedVoice === voice.id
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-slate-700/50 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Volume2 className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="font-medium text-white">{voice.name}</p>
                            <p className="text-xs text-slate-400">{voice.description}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Generate Button */}
              <div className="mt-6 space-y-4">
                <Button
                  onClick={generateVideo}
                  disabled={isGenerating || !script.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Generating Video...
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4 mr-2" />
                      Generate Video
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Creating video...</span>
                      <span className="text-white">45%</span>
                    </div>
                    <Progress value={45} className="h-2 bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 rounded-full" style={{ width: '45%' }}></div>
                    </Progress>
                    <p className="text-xs text-slate-400">Processing avatar animations...</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Settings */}
            <Card className="p-4 bg-slate-800/50 border-slate-700">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Video Settings
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Video Quality</label>
                  <select className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded text-white text-sm">
                    <option>4K Ultra HD</option>
                    <option>1080p HD</option>
                    <option>720p</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Format</label>
                  <select className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded text-white text-sm">
                    <option>MP4</option>
                    <option>MOV</option>
                    <option>AVI</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Video Gallery */}
          <div className="col-span-8">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Generated Videos</h3>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="border-slate-600">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {generatedVideos.map((video) => (
                  <div key={video.id} className="group relative bg-slate-700/30 rounded-lg overflow-hidden">
                    {/* Video Thumbnail */}
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <h4 className="font-medium text-white mb-2 truncate">{video.title}</h4>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span>Avatar: {video.avatar}</span>
                        <span>Voice: {video.voice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{video.timestamp}</span>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-6">
                <Button variant="outline" className="border-slate-600">
                  Load More Videos
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneration;