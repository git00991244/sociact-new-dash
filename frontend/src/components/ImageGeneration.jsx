import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState([85]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const mockImages = [
    {
      id: 1,
      prompt: 'A futuristic AI robot in a modern office',
      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      style: 'realistic',
      timestamp: '2 mins ago',
      downloads: 45,
      likes: 23
    },
    {
      id: 2,
      prompt: 'Colorful abstract digital art with geometric patterns',
      url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
      style: 'abstract',
      timestamp: '5 mins ago',
      downloads: 67,
      likes: 34
    },
    {
      id: 3,
      prompt: 'Professional portrait of a business person',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      style: 'portrait',
      timestamp: '8 mins ago',
      downloads: 89,
      likes: 56
    },
    {
      id: 4,
      prompt: 'Stunning landscape with mountains and sunset',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      style: 'landscape',
      timestamp: '12 mins ago',
      downloads: 123,
      likes: 78
    }
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerateProgress(prev => {
          if (prev >= 100) {
            setIsGenerating(false);
            
            // Add new generated image
            const newImage = {
              id: Date.now(),
              prompt: prompt,
              url: mockImages[Math.floor(Math.random() * mockImages.length)].url,
              style: style,
              timestamp: 'just now',
              downloads: 0,
              likes: 0
            };
            
            setGeneratedImages(prev => [newImage, ...prev]);
            return 0;
          }
          return prev + Math.random() * 12;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isGenerating, prompt, style]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt for image generation');
      return;
    }
    setIsGenerating(true);
    setGenerateProgress(0);
  };

  const handleDownload = (image) => {
    const updatedImages = generatedImages.map(img => 
      img.id === image.id ? { ...img, downloads: img.downloads + 1 } : img
    );
    setGeneratedImages(updatedImages);
  };

  const handleLike = (image) => {
    const updatedImages = generatedImages.map(img => 
      img.id === image.id ? { ...img, likes: img.likes + 1 } : img
    );
    setGeneratedImages(updatedImages);
  };

  const styles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Landscape' },
    { value: 'digital-art', label: 'Digital Art' },
    { value: 'vintage', label: 'Vintage' }
  ];

  const ratios = [
    { value: '1:1', label: 'Square (1:1)' },
    { value: '16:9', label: 'Landscape (16:9)' },
    { value: '9:16', label: 'Portrait (9:16)' },
    { value: '4:3', label: 'Standard (4:3)' },
    { value: '3:2', label: 'Photo (3:2)' }
  ];

  const allImages = [...generatedImages, ...mockImages];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl">
              🖼️
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Image Generation</h1>
              <p className="text-slate-400">Create stunning visuals and graphics for your social media campaigns</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                🟢 AI Online
              </Badge>
              <Badge variant="secondary">
                {generatedImages.length + mockImages.length} Images
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
                  <span>⚡</span>
                  Generate Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Prompt</label>
                  <Textarea
                    placeholder="Describe the image you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {styles.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Aspect Ratio</label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {ratios.map(r => (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Quality: {quality[0]}%
                  </label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                {isGenerating && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400 font-medium">Generating Image...</span>
                      <span className="text-green-400">{Math.round(generateProgress)}%</span>
                    </div>
                    <Progress value={generateProgress} className="h-2" />
                    <p className="text-sm text-slate-400 mt-2">AI is creating your masterpiece...</p>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>🎨 Generate Image</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Prompts */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">💡 Quick Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    'Social media post background',
                    'Professional headshot',
                    'Product photography',
                    'Abstract art pattern',
                    'Corporate banner design'
                  ].map((quickPrompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => setPrompt(quickPrompt)}
                    >
                      {quickPrompt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gallery */}
          <div className="lg:col-span-3 space-y-6">
            {selectedImage && (
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.prompt}
                      className="w-64 h-64 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Selected Image</h3>
                      <p className="text-slate-300 mb-4">{selectedImage.prompt}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline">{selectedImage.style}</Badge>
                        <span className="text-sm text-slate-400">{selectedImage.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">❤️ {selectedImage.likes}</span>
                          <span className="text-sm">📥 {selectedImage.downloads}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
                          📥 Download HD
                        </Button>
                        <Button size="sm" variant="outline">
                          ✏️ Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          🔄 Generate Similar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedImage(null)}
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
                <CardTitle>Generated Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(image);
                            }}
                          >
                            ❤️
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(image);
                            }}
                          >
                            📥
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <p className="text-xs text-slate-300 truncate mb-2">{image.prompt}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{image.style}</Badge>
                          <span className="text-xs text-slate-500">{image.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex gap-3 text-xs text-slate-400">
                            <span>❤️ {image.likes}</span>
                            <span>📥 {image.downloads}</span>
                          </div>
                          {image.timestamp === 'just now' && (
                            <Badge variant="default" className="bg-green-500 text-xs">New</Badge>
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

export default ImageGeneration;