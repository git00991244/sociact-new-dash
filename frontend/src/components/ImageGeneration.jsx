import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Image as ImageIcon, 
  Wand2,
  Download,
  RefreshCw,
  Settings,
  Sparkles,
  Upload,
  Copy,
  Heart,
  Share2,
  Eye,
  ChevronDown,
  Zap
} from 'lucide-react';

const ImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('flux-dev');
  const [selectedStyle, setSelectedStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState('High Quality');
  
  const [generatedImages, setGeneratedImages] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1720962158789-9389a4f399da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDB8fHx8MTc1MzAxMDM0M3ww&ixlib=rb-4.1.0&q=85',
      prompt: 'Modern tech interface with holographic elements',
      timestamp: '2 mins ago',
      likes: 24,
      downloads: 12
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1720962158858-5fb16991d2b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHx0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDB8fHx8MTc1MzAxMDM0M3ww&ixlib=rb-4.1.0&q=85',
      prompt: 'Colorful AI dashboard with data visualization',
      timestamp: '5 mins ago',
      likes: 18,
      downloads: 8
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1590417286292-4274afeee179?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1MzAxMDM1MHww&ixlib=rb-4.1.0&q=85',
      prompt: 'Clean workspace with modern technology',
      timestamp: '10 mins ago',
      likes: 32,
      downloads: 15
    }
  ]);

  const models = [
    {
      id: 'flux-dev',
      name: 'Flux Dev',
      description: 'For short and basic scenes',
      time: '30 sec',
      badge: 'Popular'
    },
    {
      id: 'flux-pro',
      name: 'Flux Pro',
      description: 'For general art and design',
      time: '45 sec',
      badge: 'Premium'
    },
    {
      id: 'stable-diffusion',
      name: 'Stable Diffusion 3',
      description: 'For detailed, complex scenes',
      time: '60 sec',
      badge: null
    }
  ];

  const styles = [
    'Photorealistic', 'Digital Art', 'Oil Painting', 'Watercolor', 
    'Sketch', 'Anime', 'Cartoon', 'Abstract', 'Minimalist', 'Vintage'
  ];

  const generateImages = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const newImage = {
        id: Date.now(),
        url: `https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHx0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDB8fHx8MTc1MzAxMDM0M3ww&ixlib=rb-4.1.0&q=85`,
        prompt: prompt,
        timestamp: 'Just now',
        likes: 0,
        downloads: 0
      };
      setGeneratedImages(prev => [newImage, ...prev]);
      setIsGenerating(false);
      setPrompt('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Image Generation</h1>
            <p className="text-slate-400">Create stunning visuals for your content</p>
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
                                <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400">
                                  {model.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-400 mt-1">{model?.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-300">{model?.time}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </Card>

              {/* Image Upload Area */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Image (Optional)</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium mb-1">Click to upload an image</p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 20MB</p>
                </div>
              </Card>

              {/* Prompt Input */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What do you want to create with this image?"
                  className="w-full h-24 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500">{prompt.length} characters</span>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Enhance
                  </Button>
                </div>
              </Card>

              {/* Settings */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Style</label>
                    <select 
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400"
                    >
                      {styles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Aspect Ratio</label>
                    <select 
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400"
                    >
                      <option value="1:1">1:1 Square</option>
                      <option value="16:9">16:9 Landscape</option>
                      <option value="9:16">9:16 Portrait</option>
                      <option value="4:3">4:3 Standard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Quality</label>
                    <select 
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400"
                    >
                      <option value="High Quality">High Quality</option>
                      <option value="Standard">Standard</option>
                      <option value="Fast">Fast</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Credits required:</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">2 Credits</Badge>
                  </div>
                  <Button
                    onClick={generateImages}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate
                      </div>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="mt-4">
                      <Progress value={65} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-400 mt-2 text-center">Processing your request...</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Right Panel - Generated Images */}
          <div className="col-span-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Generated Images</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-slate-600">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>

            {generatedImages.length === 0 ? (
              <div className="text-center py-16">
                <ImageIcon className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No images generated yet</p>
                <p className="text-slate-500 text-sm">Create your first image using the panel on the left</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                {generatedImages.map((image) => (
                  <div key={image.id} className="group relative">
                    <Card className="overflow-hidden bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                      <div className="relative">
                        <img 
                          src={image.url} 
                          alt={image.prompt}
                          className="w-full aspect-square object-cover"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-sm text-slate-300 mb-3 line-clamp-2">{image.prompt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{image.timestamp}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-400">{image.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-400">{image.downloads}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}

            {generatedImages.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-slate-600">
                  Load More Images
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;