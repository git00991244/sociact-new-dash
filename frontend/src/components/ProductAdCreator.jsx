import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

const ProductAdCreator = () => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productFeatures, setProductFeatures] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('awareness');
  const [adFormat, setAdFormat] = useState('static');
  const [brandColors, setBrandColors] = useState('#3B82F6');
  const [includePrice, setIncludePrice] = useState(true);
  const [productPrice, setProductPrice] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generatedAds, setGeneratedAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const mockAds = [
    {
      id: 1,
      title: 'Wireless Headphones - Premium',
      product: 'SoundMax Pro',
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      format: 'Static Image',
      goal: 'Purchase',
      impressions: '125K',
      clicks: '4.2K',
      ctr: '3.4%',
      timestamp: '3 hours ago',
      status: 'active'
    },
    {
      id: 2,
      title: 'Fitness Tracker Campaign',
      product: 'FitBand Ultra',
      thumbnail: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400',
      format: 'Video',
      goal: 'Awareness',
      impressions: '89K',
      clicks: '2.8K',
      ctr: '3.1%',
      timestamp: '5 hours ago',
      status: 'active'
    },
    {
      id: 3,
      title: 'Smart Home Device Ad',
      product: 'HomeAI Assistant',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      format: 'Carousel',
      goal: 'Lead Generation',
      impressions: '156K',
      clicks: '6.1K',
      ctr: '3.9%',
      timestamp: '1 day ago',
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
              title: `${productName} - ${campaignGoal}`,
              product: productName,
              thumbnail: mockAds[Math.floor(Math.random() * mockAds.length)].thumbnail,
              format: adFormat,
              goal: campaignGoal,
              impressions: '0',
              clicks: '0',
              ctr: '0%',
              timestamp: 'just now',
              status: 'draft'
            };
            
            setGeneratedAds(prev => [newAd, ...prev]);
            return 0;
          }
          return prev + Math.random() * 12;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isGenerating, productName, campaignGoal, adFormat]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProductImage(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleGenerate = () => {
    if (!productName.trim() || !productFeatures.trim()) {
      alert('Please fill in product name and features');
      return;
    }
    setIsGenerating(true);
    setGenerateProgress(0);
  };

  const campaignGoals = [
    { value: 'awareness', label: 'Brand Awareness' },
    { value: 'consideration', label: 'Consideration' },
    { value: 'purchase', label: 'Purchase Intent' },
    { value: 'leads', label: 'Lead Generation' },
    { value: 'traffic', label: 'Website Traffic' },
    { value: 'engagement', label: 'Engagement' }
  ];

  const adFormats = [
    { value: 'static', label: 'Static Image' },
    { value: 'video', label: 'Video Ad' },
    { value: 'carousel', label: 'Carousel' },
    { value: 'collection', label: 'Collection Ad' },
    { value: 'slideshow', label: 'Slideshow' }
  ];

  const allAds = [...generatedAds, ...mockAds];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
              📦
            </div>
            <div>
              <h1 className="text-3xl font-bold">Product Ad Creator</h1>
              <p className="text-slate-400">Design compelling product advertisements with AI assistance</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-400">
                🟢 AI Designer Ready
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
                  <span>🎨</span>
                  Create Product Ad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Product Image</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="product-image"
                    />
                    <label htmlFor="product-image" className="cursor-pointer flex flex-col items-center gap-2">
                      {productImage ? (
                        <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                          <span className="text-green-400">✅</span>
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center">
                          📸
                        </div>
                      )}
                      <p className="text-xs font-medium">Upload product image</p>
                    </label>
                  </div>
                </div>

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
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Key Features</label>
                  <Textarea
                    placeholder="List the main features and benefits of your product..."
                    value={productFeatures}
                    onChange={(e) => setProductFeatures(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Campaign Goal</label>
                  <Select value={campaignGoal} onValueChange={setCampaignGoal}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {campaignGoals.map(goal => (
                        <SelectItem key={goal.value} value={goal.value}>{goal.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Ad Format</label>
                  <Select value={adFormat} onValueChange={setAdFormat}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {adFormats.map(format => (
                        <SelectItem key={format.value} value={format.value}>{format.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Brand Colors</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandColors}
                      onChange={(e) => setBrandColors(e.target.value)}
                      className="w-10 h-10 rounded border border-slate-600 bg-slate-700"
                    />
                    <Input
                      value={brandColors}
                      onChange={(e) => setBrandColors(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Include Price</label>
                      <p className="text-xs text-slate-400">Show product price in ad</p>
                    </div>
                    <Switch
                      checked={includePrice}
                      onCheckedChange={setIncludePrice}
                    />
                  </div>
                  
                  {includePrice && (
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Product Price</label>
                      <Input
                        placeholder="$99.99"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  )}
                </div>

                {isGenerating && (
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-indigo-400 font-medium">Creating Ad...</span>
                      <span className="text-indigo-400">{Math.round(generateProgress)}%</span>
                    </div>
                    <Progress value={generateProgress} className="h-2" />
                    <p className="text-sm text-slate-400 mt-2">
                      {generateProgress < 25 ? 'Analyzing product...' : 
                       generateProgress < 50 ? 'Generating copy...' :
                       generateProgress < 75 ? 'Designing layout...' : 'Finalizing ad...'}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !productName.trim() || !productFeatures.trim()}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>📦 Create Product Ad</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Ad Templates */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">🎯 Ad Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    'Flash Sale Banner',
                    'Product Showcase',
                    'Feature Highlight',
                    'Comparison Chart',
                    'Testimonial Overlay'
                  ].map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                    >
                      {template}
                    </Button>
                  ))}
                </div>
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
                          👁️ Preview Ad
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{selectedAd.title}</h3>
                      <p className="text-slate-300 mb-4">{selectedAd.product}</p>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Impressions</p>
                          <p className="text-lg font-semibold">{selectedAd.impressions}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">Clicks</p>
                          <p className="text-lg font-semibold text-blue-400">{selectedAd.clicks}</p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <p className="text-sm text-slate-400">CTR</p>
                          <p className="text-lg font-semibold text-green-400">{selectedAd.ctr}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline">{selectedAd.format}</Badge>
                        <Badge variant="outline">{selectedAd.goal}</Badge>
                        <Badge 
                          variant={selectedAd.status === 'active' ? 'default' : 'secondary'}
                          className={selectedAd.status === 'active' ? 'bg-green-500' : ''}
                        >
                          {selectedAd.status}
                        </Badge>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500">
                          📥 Download Ad
                        </Button>
                        <Button size="sm" variant="outline">
                          ✏️ Edit Design
                        </Button>
                        <Button size="sm" variant="outline">
                          🎯 Launch Campaign
                        </Button>
                        <Button size="sm" variant="outline">
                          📊 View Analytics
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
                <CardTitle>Product Ad Gallery</CardTitle>
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
                            👁️ Preview
                          </Button>
                        </div>

                        <div className="absolute top-2 right-2 space-y-1">
                          <Badge 
                            variant={ad.status === 'active' ? 'default' : 'secondary'}
                            className={`text-xs block ${ad.status === 'active' ? 'bg-green-500' : ''}`}
                          >
                            {ad.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-white truncate mb-1">{ad.title}</h3>
                        <p className="text-sm text-slate-400 truncate mb-2">{ad.product}</p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">{ad.format}</Badge>
                          <span className="text-xs text-slate-500">{ad.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex gap-2">
                            <span>👁️ {ad.impressions}</span>
                            <span>👆 {ad.ctr}</span>
                          </div>
                          {ad.timestamp === 'just now' && (
                            <Badge variant="default" className="bg-indigo-500 text-xs">New</Badge>
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

export default ProductAdCreator;