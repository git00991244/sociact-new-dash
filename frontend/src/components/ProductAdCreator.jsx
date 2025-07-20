import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ShoppingBag, 
  Play,
  Sparkles,
  Upload,
  Zap,
  ChevronDown,
  Download,
  Share2,
  Settings,
  Target,
  TrendingUp,
  Palette,
  Eye
} from 'lucide-react';

const ProductAdCreator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('product-showcase');
  const [productUrl, setProductUrl] = useState('');
  const [adObjective, setAdObjective] = useState('sales');
  const [brandVoice, setBrandVoice] = useState('professional');

  const [generatedAds, setGeneratedAds] = useState([
    {
      id: 1,
      title: 'Lavender Glow Serum - Premium Skincare',
      thumbnail: 'https://images.unsplash.com/photo-1720962158789-9389a4f399da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDB8fHx8MTc1MzAxMDM0M3ww&ixlib=rb-4.1.0&q=85',
      duration: '0:30',
      template: 'Product Showcase',
      cta: 'Shop Now - 25% Off',
      performance: 'High Converting',
      timestamp: '1 hour ago'
    },
    {
      id: 2,
      title: 'Smart Watch Pro - Tech Innovation',
      thumbnail: 'https://images.unsplash.com/photo-1720962158858-5fb16991d2b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHx0ZWNobm9sb2d5JTIwaW50ZXJmYWNlfGVufDB8fHx8MTc1MzAxMDM0M3ww&ixlib=rb-4.1.0&q=85',
      duration: '0:45',
      template: 'Feature Demo',
      cta: 'Pre-Order Today',
      performance: 'Trending',
      timestamp: '3 hours ago'
    }
  ]);

  const adTemplates = [
    {
      id: 'product-showcase',
      name: 'Product Showcase',
      description: 'Beautiful product displays with elegant animations',
      style: '360° Views',
      duration: '15-30s',
      badge: 'Popular',
      icon: '✨'
    },
    {
      id: 'feature-demo',
      name: 'Feature Demo',
      description: 'Highlight key features and benefits',
      style: 'Interactive',
      duration: '30-60s',
      badge: 'Converting',
      icon: '🎯'
    },
    {
      id: 'lifestyle-story',
      name: 'Lifestyle Story',
      description: 'Product in real-life scenarios and contexts',
      style: 'Narrative',
      duration: '45-60s',
      badge: null,
      icon: '🌟'
    },
    {
      id: 'comparison',
      name: 'Comparison Ad',
      description: 'Show advantages over competitors',
      style: 'Analytical',
      duration: '30-45s',
      badge: 'Hot',
      icon: '⚔️'
    }
  ];

  const adObjectives = [
    { value: 'sales', label: 'Drive Sales', description: 'Maximize purchases and revenue' },
    { value: 'awareness', label: 'Brand Awareness', description: 'Increase product visibility' },
    { value: 'consideration', label: 'Product Consideration', description: 'Generate interest and research' },
    { value: 'retargeting', label: 'Retargeting', description: 'Re-engage previous visitors' }
  ];

  const brandVoices = [
    { value: 'professional', label: 'Professional', description: 'Formal, trustworthy, expert tone' },
    { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, conversational' },
    { value: 'bold', label: 'Bold', description: 'Confident, edgy, attention-grabbing' },
    { value: 'luxury', label: 'Luxury', description: 'Premium, exclusive, sophisticated' }
  ];

  const generateAd = () => {
    if (!productUrl.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const templates = ['Product Showcase', 'Feature Demo', 'Lifestyle Story', 'Comparison'];
      const ctas = ['Shop Now - 25% Off', 'Get Yours Today', 'Limited Time Offer', 'Free Shipping'];
      const performances = ['High Converting', 'Trending', 'Viral Potential', 'ROI Optimized'];
      
      const newAd = {
        id: Date.now(),
        title: `${productUrl.split('/')[2] || 'Product'} - Professional Ad`,
        thumbnail: 'https://images.unsplash.com/photo-1590417286292-4274afeee179?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwd29ya3NwYWNlfGVufDB8fHx8MTc1MzAxMDM1MHww&ixlib=rb-4.1.0&q=85',
        duration: '0:35',
        template: templates[Math.floor(Math.random() * templates.length)],
        cta: ctas[Math.floor(Math.random() * ctas.length)],
        performance: performances[Math.floor(Math.random() * performances.length)],
        timestamp: 'Just now'
      };
      
      setGeneratedAds(prev => [newAd, ...prev]);
      setIsGenerating(false);
      setProductUrl('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Product Ad Creator</h1>
            <p className="text-slate-400">Create professional product advertisements that drive sales</p>
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
        {/* Featured Ad Templates */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Professional Ad Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`p-6 cursor-pointer transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? 'bg-blue-600/20 border-blue-500/50 ring-2 ring-blue-500/30'
                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800/70'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                    {template.icon}
                  </div>
                  {template.badge && (
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                      {template.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{template.style}</span>
                  <span>{template.duration}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Creation Form */}
          <div className="col-span-4">
            <div className="space-y-6">
              {/* Product Information */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Product URL or Details</label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://your-product-page.com"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                  <p className="text-xs text-slate-400">We'll extract product details, images, and pricing automatically</p>
                </div>
              </Card>

              {/* Visual Assets Upload */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Custom Assets (Optional)</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium mb-1">Upload product images or videos</p>
                  <p className="text-sm text-slate-500">High-quality PNG, JPG, MP4 files</p>
                </div>
              </Card>

              {/* Campaign Objective */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Campaign Objective</label>
                <div className="relative">
                  <select 
                    value={adObjective}
                    onChange={(e) => setAdObjective(e.target.value)}
                    className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  >
                    {adObjectives.map((objective) => (
                      <option key={objective.value} value={objective.value}>
                        {objective.label} - {objective.description}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
              </Card>

              {/* Brand Voice */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <label className="block text-sm font-semibold text-white mb-3">Brand Voice & Style</label>
                <div className="space-y-4">
                  <div className="relative">
                    <select 
                      value={brandVoice}
                      onChange={(e) => setBrandVoice(e.target.value)}
                      className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    >
                      {brandVoices.map((voice) => (
                        <option key={voice.value} value={voice.value}>
                          {voice.label} - {voice.description}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg border-2 border-slate-600"></div>
                        <input type="color" value="#3B82F6" className="w-10 h-10 rounded-lg border-2 border-slate-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Style</label>
                      <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400">
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="minimalist">Minimalist</option>
                        <option value="bold">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Advanced Options */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">Advanced Options</h4>
                  <Settings className="h-4 w-4 text-slate-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Call-to-Action</label>
                    <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400">
                      <option value="shop-now">Shop Now</option>
                      <option value="get-yours">Get Yours Today</option>
                      <option value="learn-more">Learn More</option>
                      <option value="limited-offer">Limited Time Offer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Platform Optimization</label>
                    <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400">
                      <option value="instagram">Instagram Feed</option>
                      <option value="facebook">Facebook Ads</option>
                      <option value="tiktok">TikTok Ads</option>
                      <option value="youtube">YouTube Pre-roll</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Duration</label>
                    <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-400">
                      <option value="15">15 seconds</option>
                      <option value="30">30 seconds</option>
                      <option value="60">60 seconds</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Generate Button */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">Credits required:</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">30 Credits</Badge>
                </div>
                <Button
                  onClick={generateAd}
                  disabled={isGenerating || !productUrl.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Product Ad...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create Product Ad
                    </div>
                  )}
                </Button>

                {isGenerating && (
                  <div className="mt-4">
                    <Progress value={60} className="h-2 bg-slate-700" />
                    <p className="text-xs text-slate-400 mt-2 text-center">Analyzing product and generating professional ad...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Generated Ads */}
          <div className="col-span-8">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Professional Product Ads</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {generatedAds.length} Ads Created
                  </Badge>
                </div>
              </div>
            </div>

            {generatedAds.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-10 w-10 text-slate-400" />
                </div>
                <p className="text-slate-400 text-lg mb-2">No product ads created yet</p>
                <p className="text-slate-500 text-sm">Add your product details to start creating professional advertisements</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                {generatedAds.map((ad) => (
                  <div key={ad.id} className="group">
                    <Card className="overflow-hidden bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                      <div className="relative">
                        <img 
                          src={ad.thumbnail} 
                          alt={ad.title}
                          className="w-full aspect-video object-cover"
                        />
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>

                        {/* Performance Badge */}
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-blue-500/80 text-white text-xs">
                            {ad.performance}
                          </Badge>
                        </div>

                        {/* Duration */}
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                          {ad.duration}
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-medium text-white mb-2 line-clamp-2">{ad.title}</h4>
                        <div className="text-xs text-slate-400 mb-2">
                          <div className="flex items-center justify-between">
                            <span>Template: {ad.template}</span>
                            <span>{ad.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-green-400 mb-3 bg-green-500/10 rounded px-2 py-1">
                          <span>CTA: {ad.cta}</span>
                          <Target className="h-3 w-3" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="flex-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 hover:bg-blue-600/30">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="ghost" className="px-2">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="px-2">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}

            {generatedAds.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-slate-600">
                  Load More Ads
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdCreator;