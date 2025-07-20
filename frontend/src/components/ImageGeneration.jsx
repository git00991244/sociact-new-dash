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
  Eye
} from 'lucide-react';

const ImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
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

  const [imageStyles] = useState([
    'Photorealistic', 'Digital Art', 'Oil Painting', 'Watercolor', 
    'Sketch', 'Anime', 'Cartoon', 'Abstract', 'Minimalist', 'Vintage'
  ]);

  const [selectedStyle, setSelectedStyle] = useState('Photorealistic');

  const generateImages = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate image generation process
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <ImageIcon className="h-8 w-8 mr-3 text-pink-400" />
              AI Image Generation
            </h1>
            <p className="text-slate-400">Create stunning visuals and graphics for your social media campaigns</p>
          </div>
          <Badge variant="outline" className="border-pink-400 text-pink-400 animate-pulse">
            <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
            Processing
          </Badge>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Generation Panel */}
          <div className="col-span-4 space-y-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Create Image</h3>
              
              {/* Prompt Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Describe your image
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic cityscape at sunset with flying cars and neon lights..."
                  className="w-full h-24 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all"
                />
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Art Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {imageStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`p-2 text-xs rounded-lg transition-colors ${
                        selectedStyle === style
                          ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                          : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generation Controls */}
              <div className="space-y-4">
                <Button
                  onClick={generateImages}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Images
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Processing prompt...</span>
                      <span className="text-white">65%</span>
                    </div>
                    <Progress value={65} className="h-2 bg-slate-700">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-500 rounded-full" style={{ width: '65%' }}></div>
                    </Progress>
                  </div>
                )}
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-4 bg-slate-800/50 border-slate-700">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Generation Settings
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Image Quality</label>
                  <select className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded text-white text-sm">
                    <option>High Quality</option>
                    <option>Standard</option>
                    <option>Fast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Aspect Ratio</label>
                  <select className="w-full px-2 py-1 bg-slate-700/50 border border-slate-600 rounded text-white text-sm">
                    <option>1:1 Square</option>
                    <option>16:9 Landscape</option>
                    <option>9:16 Portrait</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Statistics */}
            <Card className="p-4 bg-slate-800/50 border-slate-700">
              <h4 className="font-semibold text-white mb-3">Today's Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Images Generated</span>
                  <span className="text-white font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Downloads</span>
                  <span className="text-white font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Favorites</span>
                  <span className="text-white font-semibold">47</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Generated Images Gallery */}
          <div className="col-span-8">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Generated Images</h3>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="border-slate-600">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {generatedImages.map((image) => (
                  <div key={image.id} className="group relative bg-slate-700/30 rounded-lg overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.prompt}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="p-3">
                      <p className="text-sm text-slate-300 truncate mb-2">{image.prompt}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{image.timestamp}</span>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{image.likes}</span>
                          </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{image.downloads}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-6">
              <Button variant="outline" className="border-slate-600">
                Load More Images
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ImageGeneration;