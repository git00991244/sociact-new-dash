import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

const UGCAdCreator = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [adType, setAdType] = useState('testimonial');
  const [avatarType, setAvatarType] = useState('millennial-female');
  const [toneOfVoice, setToneOfVoice] = useState('authentic');
  const [includeCallToAction, setIncludeCallToAction] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generatedAds, setGeneratedAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const mockAds = [
    {
      id: 1,
      title: 'Fitness App Testimonial',
      product: 'FitLife Pro App',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      avatar: 'Millennial Female',
      adType: 'Testimonial',
      script: 'Hey guys! I just had to share this amazing fitness app I discovered...',
      duration: '32s',
      engagement: '94%',
      ctr: '3.8%',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Skincare Routine UGC',
      product: 'GlowUp Serum',
      thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      avatar: 'Gen Z Female',
      adType: 'Tutorial',
      script: 'OMG, this skincare routine has completely transformed my skin...',
      duration: '45s',
      engagement: '89%',
      ctr: '4.2%',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Tech Gadget Review',
      product: 'SmartWatch Pro',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      avatar: 'Millennial Male',
      adType: 'Review',
      script: 'As someone who\'s always on the go, this smartwatch has been a game-changer...',
      duration: '38s',
      engagement: '91%',
      ctr: '3.5%',
      timestamp: '6 hours ago',
      status: 'completed'
    }
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerateProgress(prev => {
          if (prev >= 100) {
            setIsGenerating(false);
            
            const newAd = {
              id: Date.now(),
              title: `${productName} UGC Ad`,
              product: productName,
              thumbnail: mockAds[Math.floor(Math.random() * mockAds.length)].thumbnail,
              avatar: avatarType,
              adType: adType,
              script: `Generated UGC script for ${productName}...`,
              duration: '35s',
              engagement: '0%',
              ctr: '0%',
              timestamp: 'just now',
              status: 'completed'
            };
            
            setGeneratedAds(prev => [newAd, ...prev]);
            return 0;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isGenerating, productName, adType, avatarType]);

  const handleGenerate = () => {
    if (!productName.trim() || !productDescription.trim()) {
      alert('Please fill in product name and description');
      return;
    }
    setIsGenerating(true);
    setGenerateProgress(0);
  };

  const adTypes = [
    { value: 'testimonial', label: 'Customer Testimonial' },
    { value: 'review', label: 'Product Review' },
    { value: 'tutorial', label: 'How-to/Tutorial' },
    { value: 'unboxing', label: 'Unboxing Experience' },
    { value: 'comparison', label: 'Product Comparison' },
    { value: 'lifestyle', label: 'Lifestyle Integration' }
  ];

  const avatarTypes = [
    { value: 'millennial-female', label: 'Millennial Female' },
    { value: 'millennial-male', label: 'Millennial Male' },
    { value: 'genz-female', label: 'Gen Z Female' },
    { value: 'genz-male', label: 'Gen Z Male' },
    { value: 'professional-female', label: 'Professional Female' },
    { value: 'professional-male', label: 'Professional Male' }
  ];

  const toneOptions = [
    { value: 'authentic', label: 'Authentic & Real' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'expert', label: 'Expert/Authority' },
    { value: 'relatable', label: 'Relatable' }
  ];

  const allAds = [...generatedAds, ...mockAds];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-2xl">
              🎭
            </div>
            <div>
              <h1 className="text-3xl font-bold">UGC Ad Creator</h1>
              <p className="text-slate-400">Create authentic user-generated content ads with custom avatars</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="secondary" className="bg-pink-500/20 text-pink-400">
                🟢 Avatar Studio Ready
              </Badge>
              <Badge variant="secondary">
                {generatedAds.length + mockAds.length} Ads Created
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Creation Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🎬</span>
                  Create UGC Ad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Product Name</label>
                  <Input
                    placeholder="Enter your product name..."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Product Description</label>
                  <Textarea
                    placeholder="Describe your product and its key benefits..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Target Audience</label>
                  <Input
                    placeholder="e.g., Young professionals, fitness enthusiasts..."
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Ad Type</label>
                  <Select value={adType} onValueChange={setAdType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {adTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Avatar Type</label>
                  <Select value={avatarType} onValueChange={setAvatarType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {avatarTypes.map(avatar => (
                        <SelectItem key={avatar.value} value={avatar.value}>{avatar.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Tone of Voice</label>
                  <Select value={toneOfVoice} onValueChange={setToneOfVoice}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {toneOptions.map(tone => (
                        <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-slate-300">Include Call-to-Action</label>
                    <p className="text-xs text-slate-400">Add CTA at the end of the ad</p>
                  </div>
                  <Switch
                    checked={includeCallToAction}
                    onCheckedChange={setIncludeCallToAction}
                  />
                </div>

                {isGenerating && (
                  <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-pink-400 font-medium">Creating UGC Ad...</span>
                      <span className="text-pink-400">{Math.round(generateProgress)}%</span>
                    </div>
                    <Progress value={generateProgress} className="h-2" />
                    <p className="text-sm text-slate-400 mt-2">
                      {generateProgress < 30 ? 'Analyzing product...' : 
                       generateProgress < 60 ? 'Creating avatar...' :
                       generateProgress < 90 ? 'Writing UGC script...' : 'Generating video...'}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !productName.trim() || !productDescription.trim()}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>🎭 Create UGC Ad</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* UGC Tips */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">💡 UGC Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-300 space-y-2">
                <p>• Keep it authentic and conversational</p>
                <p>• Show real product benefits</p>
                <p>• Use relatable scenarios</p>
                <p>• Include social proof elements</p>
                <p>• Add clear call-to-actions</p>
                <p>• Optimize for mobile viewing</p>
              </CardContent>
            </Card>
          </div>

          {/* Ad Gallery */}
          <div className="lg:col-span-3 space-y-6">
            {selectedAd && (
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <img
                        src={selectedAd.thumbnail}
                        alt={selectedAd.title}
                        className="w-80 h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                          ▶️ Play UGC Ad
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{selectedAd.title}</h3>
                      <p className="text-slate-300 mb-4">{selectedAd.product}</p>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Duration</p>
                          <p className="text-lg font-semibold">{selectedAd.duration}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Engagement</p>
                          <p className="text-lg font-semibold text-green-400">{selectedAd.engagement}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">CTR</p>
                          <p className="text-lg font-semibold text-blue-400">{selectedAd.ctr}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-slate-300 mb-2">Script Preview:</p>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-200">{selectedAd.script}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-pink-600 hover:bg-pink-500">
                          📥 Download Ad
                        </Button>
                        <Button size="sm" variant="outline">
                          ✏️ Edit Script
                        </Button>
                        <Button size="sm" variant="outline">
                          🔄 Generate Variant
                        </Button>
                        <Button size="sm" variant="outline">
                          📊 Performance
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedAd(null)}
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
                <CardTitle>UGC Ad Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allAds.map((ad) => (
                    <div
                      key={ad.id}
                      className="group relative bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedAd(ad)}
                    >
                      <div className="relative">
                        <img
                          src={ad.thumbnail}
                          alt={ad.title}
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
                            {ad.duration}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-white truncate mb-1">{ad.title}</h3>
                        <p className="text-sm text-slate-400 truncate mb-2">{ad.product}</p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">{ad.adType}</Badge>
                          <span className="text-xs text-slate-500">{ad.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex gap-2">
                            <span>💚 {ad.engagement}</span>
                            <span>👆 {ad.ctr}</span>
                          </div>
                          {ad.timestamp === 'just now' && (
                            <Badge variant="default" className="bg-pink-500 text-xs">New</Badge>
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

export default UGCAdCreator;