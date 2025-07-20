import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

const AutoVideoEditor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editStyle, setEditStyle] = useState('dynamic');
  const [musicStyle, setMusicStyle] = useState('upbeat');
  const [targetDuration, setTargetDuration] = useState([60]);
  const [autoTransitions, setAutoTransitions] = useState(true);
  const [autoColorGrading, setAutoColorGrading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const [editedVideos, setEditedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const mockEditedVideos = [
    {
      id: 1,
      title: 'Product Launch Video - Edited',
      originalDuration: '5:32',
      editedDuration: '1:45',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b6?w=400',
      style: 'Dynamic',
      improvements: ['Auto-cropped highlights', 'Added transitions', 'Color correction', 'Background music'],
      timestamp: '15 mins ago',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Interview Footage - Edited',
      originalDuration: '12:14',
      editedDuration: '3:22',
      thumbnail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
      style: 'Professional',
      improvements: ['Removed filler words', 'Auto-subtitles', 'Noise reduction', 'Scene cuts'],
      timestamp: '32 mins ago',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Event Highlights - Edited',
      originalDuration: '45:18',
      editedDuration: '4:15',
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
      style: 'Cinematic',
      improvements: ['Best moments extraction', 'Motion stabilization', 'Color grading', 'Smooth transitions'],
      timestamp: '1 hour ago',
      status: 'completed'
    }
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            
            const newVideo = {
              id: Date.now(),
              title: `${selectedFile?.name || 'Video'} - Edited`,
              originalDuration: '8:45',
              editedDuration: `${Math.floor(targetDuration[0] / 60)}:${targetDuration[0] % 60}`,
              thumbnail: mockEditedVideos[Math.floor(Math.random() * mockEditedVideos.length)].thumbnail,
              style: editStyle,
              improvements: ['Auto-edited', 'Optimized pacing', 'Enhanced quality', 'Smart cuts'],
              timestamp: 'just now',
              status: 'completed'
            };
            
            setEditedVideos(prev => [newVideo, ...prev]);
            return 0;
          }
          return prev + Math.random() * 6;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isProcessing, selectedFile, editStyle, targetDuration]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleStartEditing = () => {
    if (!selectedFile) {
      alert('Please upload a video file first');
      return;
    }
    setIsProcessing(true);
    setProcessProgress(0);
  };

  const editStyles = [
    { value: 'dynamic', label: 'Dynamic & Engaging' },
    { value: 'professional', label: 'Professional' },
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'social', label: 'Social Media Optimized' },
    { value: 'minimal', label: 'Minimal & Clean' }
  ];

  const musicStyles = [
    { value: 'upbeat', label: 'Upbeat & Energetic' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'ambient', label: 'Ambient' },
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'none', label: 'No Music' }
  ];

  const allVideos = [...editedVideos, ...mockEditedVideos];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
              ✂️
            </div>
            <div>
              <h1 className="text-3xl font-bold">Auto Video Editor</h1>
              <p className="text-slate-400">Automatically edit and optimize your video content with AI</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                🟢 AI Editor Online
              </Badge>
              <Badge variant="secondary">
                {editedVideos.length + mockEditedVideos.length} Videos Processed
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upload & Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📁</span>
                  Upload Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                      📹
                    </div>
                    <p className="text-sm font-medium">Click to upload video</p>
                    <p className="text-xs text-slate-400">MP4, MOV, AVI up to 500MB</p>
                  </label>
                </div>

                {selectedFile && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm font-medium text-green-400">✅ File Selected</p>
                    <p className="text-xs text-slate-300 mt-1">{selectedFile.name}</p>
                    <p className="text-xs text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Edit Style</label>
                  <Select value={editStyle} onValueChange={setEditStyle}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {editStyles.map(style => (
                        <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Music Style</label>
                  <Select value={musicStyle} onValueChange={setMusicStyle}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {musicStyles.map(music => (
                        <SelectItem key={music.value} value={music.value}>{music.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Target Duration: {Math.floor(targetDuration[0] / 60)}:{String(targetDuration[0] % 60).padStart(2, '0')}
                  </label>
                  <Slider
                    value={targetDuration}
                    onValueChange={setTargetDuration}
                    max={300}
                    min={30}
                    step={15}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Auto Transitions</label>
                    <Switch
                      checked={autoTransitions}
                      onCheckedChange={setAutoTransitions}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Auto Color Grading</label>
                    <Switch
                      checked={autoColorGrading}
                      onCheckedChange={setAutoColorGrading}
                    />
                  </div>
                </div>

                {isProcessing && (
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-medium">Processing Video...</span>
                      <span className="text-purple-400">{Math.round(processProgress)}%</span>
                    </div>
                    <Progress value={processProgress} className="h-2" />
                    <p className="text-sm text-slate-400 mt-2">
                      {processProgress < 25 ? 'Analyzing footage...' : 
                       processProgress < 50 ? 'Identifying key moments...' :
                       processProgress < 75 ? 'Applying edits...' : 'Finalizing video...'}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleStartEditing}
                  disabled={isProcessing || !selectedFile}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>✂️ Start AI Editing</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">🤖 AI Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Auto scene detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Smart cropping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Noise reduction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Auto subtitles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Motion stabilization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✅</span>
                    <span>Smart audio leveling</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Gallery */}
          <div className="lg:col-span-3 space-y-6">
            {selectedVideo && (
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <img
                        src={selectedVideo.thumbnail}
                        alt={selectedVideo.title}
                        className="w-80 h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                          ▶️ Play Edited
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Original Duration</p>
                          <p className="text-lg font-semibold">{selectedVideo.originalDuration}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Edited Duration</p>
                          <p className="text-lg font-semibold text-green-400">{selectedVideo.editedDuration}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-slate-300 mb-2">AI Improvements:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedVideo.improvements.map((improvement, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {improvement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-500">
                          📥 Download Edited
                        </Button>
                        <Button size="sm" variant="outline">
                          📊 Compare Versions
                        </Button>
                        <Button size="sm" variant="outline">
                          ✏️ Fine-tune Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedVideo(null)}
                        >
                          ✕ Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Edited Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allVideos.map((video) => (
                    <div
                      key={video.id}
                      className="group relative bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Button
                            size="sm"
                            className="bg-white/90 text-black hover:bg-white"
                          >
                            ▶️ Preview
                          </Button>
                        </div>

                        <div className="absolute top-2 right-2 space-y-1">
                          <Badge variant="secondary" className="text-xs block">
                            {video.editedDuration}
                          </Badge>
                          <Badge variant="outline" className="text-xs block">
                            {video.style}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-white truncate mb-2">{video.title}</h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400">
                            {video.originalDuration} → {video.editedDuration}
                          </span>
                          <span className="text-xs text-slate-500">{video.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className="text-xs text-green-400 border-green-400"
                          >
                            ✅ {video.status}
                          </Badge>
                          {video.timestamp === 'just now' && (
                            <Badge variant="default" className="bg-purple-500 text-xs">New</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoVideoEditor;