import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

const VideoGeneration = () => {
  const [script, setScript] = useState('');
  const [videoType, setVideoType] = useState('ugc-ad');
  const [avatarStyle, setAvatarStyle] = useState('professional');
  const [voiceType, setVoiceType] = useState('female-friendly');
  const [duration, setDuration] = useState([30]);
  const [includeSubtitles, setIncludeSubtitles] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const mockVideos = [
    {
      id: 1,
      title: 'Product Demo - Fitness App',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      duration: '30s',
      type: 'Product Demo',
      avatar: 'Professional Male',
      status: 'completed',
      timestamp: '5 mins ago',
      views: 234,
      engagement: '94%'
    },
    {
      id: 2,
      title: 'UGC Testimonial - Beauty Product',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
      duration: '45s',
      type: 'UGC Testimonial',
      avatar: 'Casual Female',
      status: 'completed',
      timestamp: '12 mins ago',
      views: 567,
      engagement: '89%'
    },
    {
      id: 3,
      title: 'Brand Story - Tech Startup',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
      duration: '60s',
      type: 'Brand Story',
      avatar: 'Professional Female',
      status: 'completed',
      timestamp: '25 mins ago',
      views: 891,
      engagement: '92%'
    }
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerateProgress(prev => {
          if (prev >= 100) {
            setIsGenerating(false);
            
            const newVideo = {
              id: Date.now(),
              title: `AI Generated Video - ${videoType}`,
              thumbnail: mockVideos[Math.floor(Math.random() * mockVideos.length)].thumbnail,
              duration: `${duration[0]}s`,
              type: videoType,
              avatar: avatarStyle,
              status: 'completed',
              timestamp: 'just now',
              views: 0,
              engagement: '0%'
            };
            
            setGeneratedVideos(prev => [newVideo, ...prev]);
            return 0;
          }
          return prev + Math.random() * 8;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isGenerating, videoType, avatarStyle, duration]);

  const handleGenerate = () => {
    if (!script.trim()) {
      alert('Please enter a script for video generation');
      return;
    }
    setIsGenerating(true);
    setGenerateProgress(0);
  };

  const videoTypes = [
    { value: 'ugc-ad', label: 'UGC Advertisement' },
    { value: 'product-demo', label: 'Product Demo' },
    { value: 'testimonial', label: 'Customer Testimonial' },
    { value: 'brand-story', label: 'Brand Story' },
    { value: 'tutorial', label: 'Tutorial/How-to' },
    { value: 'announcement', label: 'Announcement' }
  ];

  const avatarStyles = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'enthusiastic', label: 'Enthusiastic' }
  ];

  const voiceTypes = [
    { value: 'female-friendly', label: 'Female - Friendly' },
    { value: 'male-professional', label: 'Male - Professional' },
    { value: 'female-energetic', label: 'Female - Energetic' },
    { value: 'male-casual', label: 'Male - Casual' },
    { value: 'neutral-calm', label: 'Neutral - Calm' }
  ];

  const allVideos = [...generatedVideos, ...mockVideos];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
              🎬
            </div>
            <div>
              <h1 className="text-3xl font-bold">Video Generation</h1>
              <p className="text-slate-400">Generate professional videos with AI avatars and automated editing</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                🟢 AI Ready
              </Badge>
              <Badge variant="secondary">
                {generatedVideos.length + mockVideos.length} Videos
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🎥</span>
                  Create Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Video Script</label>
                  <Textarea
                    placeholder="Enter your video script here. The AI avatar will speak these words..."
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Estimated duration: {Math.ceil(script.length / 15)} seconds
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Video Type</label>
                  <Select value={videoType} onValueChange={setVideoType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {videoTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Avatar Style</label>
                  <Select value={avatarStyle} onValueChange={setAvatarStyle}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {avatarStyles.map(style => (
                        <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Voice Type</label>
                  <Select value={voiceType} onValueChange={setVoiceType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {voiceTypes.map(voice => (
                        <SelectItem key={voice.value} value={voice.value}>{voice.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Max Duration: {duration[0]}s
                  </label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={120}
                    min={15}
                    step={15}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Include Subtitles</label>
                    <Switch
                      checked={includeSubtitles}
                      onCheckedChange={setIncludeSubtitles}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Background Music</label>
                    <Switch
                      checked={backgroundMusic}
                      onCheckedChange={setBackgroundMusic}
                    />
                  </div>
                </div>

                {isGenerating && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 font-medium">Generating Video...</span>
                      <span className="text-blue-400">{Math.round(generateProgress)}%</span>
                    </div>
                    <Progress value={generateProgress} className="h-2" />
                    <p className="text-sm text-slate-400 mt-2">
                      {generateProgress < 30 ? 'Creating avatar...' : 
                       generateProgress < 60 ? 'Generating speech...' :
                       generateProgress < 90 ? 'Rendering video...' : 'Finalizing...'}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !script.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>🎬 Generate Video</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Templates */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">📋 Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    'Product launch announcement',
                    'Customer testimonial',
                    'Tutorial introduction',
                    'Brand story overview',
                    'Call-to-action message'
                  ].map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => setScript(`Hi! I'm excited to share ${template.toLowerCase()}. This amazing solution will help you...`)}
                    >
                      {template}
                    </Button>
                  ))}
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
                          ▶️ Play
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline">{selectedVideo.type}</Badge>
                        <Badge variant="outline">{selectedVideo.avatar}</Badge>
                        <span className="text-sm text-slate-400">{selectedVideo.duration}</span>
                        <span className="text-sm text-slate-400">{selectedVideo.timestamp}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Views</p>
                          <p className="text-lg font-semibold">{selectedVideo.views}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Engagement</p>
                          <p className="text-lg font-semibold">{selectedVideo.engagement}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
                          📥 Download
                        </Button>
                        <Button size="sm" variant="outline">
                          ✏️ Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          📊 Analytics
                        </Button>
                        <Button size="sm" variant="outline">
                          🔄 Create Similar
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
                <CardTitle>Generated Videos</CardTitle>
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
                            ▶️ Play
                          </Button>
                        </div>

                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {video.duration}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-white truncate mb-2">{video.title}</h3>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">{video.type}</Badge>
                          <span className="text-xs text-slate-500">{video.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-3 text-xs text-slate-400">
                            <span>👁️ {video.views}</span>
                            <span>📈 {video.engagement}</span>
                          </div>
                          {video.timestamp === 'just now' && (
                            <Badge variant="default" className="bg-blue-500 text-xs">New</Badge>
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

export default VideoGeneration;