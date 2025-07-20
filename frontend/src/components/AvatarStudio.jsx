import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

const AvatarStudio = () => {
  const [avatarName, setAvatarName] = useState('');
  const [selectedGender, setSelectedGender] = useState('female');
  const [selectedAge, setSelectedAge] = useState([28]);
  const [selectedEthnicity, setSelectedEthnicity] = useState('caucasian');
  const [selectedStyle, setSelectedStyle] = useState('professional');
  const [voiceType, setVoiceType] = useState('friendly');
  const [enableCustomization, setEnableCustomization] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [createProgress, setCreateProgress] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const mockAvatars = [
    {
      id: 1,
      name: 'Sarah Professional',
      gender: 'Female',
      age: 32,
      style: 'Professional',
      ethnicity: 'Caucasian',
      voice: 'Friendly',
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=400',
      usageCount: 45,
      rating: 4.8,
      timestamp: '2 days ago',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Alex Casual',
      gender: 'Male',
      age: 26,
      style: 'Casual',
      ethnicity: 'Hispanic',
      voice: 'Energetic',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      usageCount: 38,
      rating: 4.6,
      timestamp: '4 days ago',
      status: 'ready'
    },
    {
      id: 3,
      name: 'Maya Creative',
      gender: 'Female',
      age: 29,
      style: 'Creative',
      ethnicity: 'Asian',
      voice: 'Calm',
      thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      usageCount: 52,
      rating: 4.9,
      timestamp: '1 week ago',
      status: 'ready'
    }
  ];

  useEffect(() => {
    if (isCreating) {
      const interval = setInterval(() => {
        setCreateProgress(prev => {
          if (prev >= 100) {
            setIsCreating(false);
            
            const newAvatar = {
              id: Date.now(),
              name: avatarName || `Avatar ${Date.now()}`,
              gender: selectedGender,
              age: selectedAge[0],
              style: selectedStyle,
              ethnicity: selectedEthnicity,
              voice: voiceType,
              thumbnail: mockAvatars[Math.floor(Math.random() * mockAvatars.length)].thumbnail,
              usageCount: 0,
              rating: 0,
              timestamp: 'just now',
              status: 'ready'
            };
            
            setAvatars(prev => [newAvatar, ...prev]);
            setAvatarName('');
            return 0;
          }
          return prev + Math.random() * 8;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isCreating, avatarName, selectedGender, selectedAge, selectedStyle, selectedEthnicity, voiceType]);

  const handleCreate = () => {
    setIsCreating(true);
    setCreateProgress(0);
  };

  const genderOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'non-binary', label: 'Non-binary' }
  ];

  const ethnicityOptions = [
    { value: 'caucasian', label: 'Caucasian' },
    { value: 'african', label: 'African American' },
    { value: 'asian', label: 'Asian' },
    { value: 'hispanic', label: 'Hispanic/Latino' },
    { value: 'middle-eastern', label: 'Middle Eastern' },
    { value: 'mixed', label: 'Mixed Heritage' }
  ];

  const styleOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'creative', label: 'Creative' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'friendly', label: 'Friendly' }
  ];

  const voiceOptions = [
    { value: 'friendly', label: 'Friendly & Warm' },
    { value: 'professional', label: 'Professional' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'calm', label: 'Calm & Soothing' },
    { value: 'authoritative', label: 'Authoritative' }
  ];

  const allAvatars = [...avatars, ...mockAvatars];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="text-3xl font-bold">Avatar Studio</h1>
              <p className="text-slate-400">Create and manage custom avatars for your video content</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400">
                🟢 Studio Ready
              </Badge>
              <Badge variant="secondary">
                {avatars.length + mockAvatars.length} Avatars
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
                  <span>🎭</span>
                  Create Avatar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Avatar Name</label>
                  <Input
                    placeholder="Enter avatar name..."
                    value={avatarName}
                    onChange={(e) => setAvatarName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Gender</label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {genderOptions.map(gender => (
                        <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Age: {selectedAge[0]} years old
                  </label>
                  <Slider
                    value={selectedAge}
                    onValueChange={setSelectedAge}
                    max={60}
                    min={18}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Ethnicity</label>
                  <Select value={selectedEthnicity} onValueChange={setSelectedEthnicity}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {ethnicityOptions.map(ethnicity => (
                        <SelectItem key={ethnicity.value} value={ethnicity.value}>{ethnicity.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Style</label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {styleOptions.map(style => (
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
                      {voiceOptions.map(voice => (
                        <SelectItem key={voice.value} value={voice.value}>{voice.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-slate-300">Advanced Customization</label>
                    <p className="text-xs text-slate-400">Fine-tune facial features</p>
                  </div>
                  <Switch
                    checked={enableCustomization}
                    onCheckedChange={setEnableCustomization}
                  />
                </div>

                {isCreating && (
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 font-medium">Creating Avatar...</span>
                      <span className="text-cyan-400">{Math.round(createProgress)}%</span>
                    </div>
                    <Progress value={createProgress} className="h-2" />
                    <p className="text-sm text-slate-400 mt-2">
                      {createProgress < 30 ? 'Generating facial structure...' : 
                       createProgress < 60 ? 'Applying customizations...' :
                       createProgress < 90 ? 'Training voice model...' : 'Finalizing avatar...'}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleCreate}
                  disabled={isCreating}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>👤 Create Avatar</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Avatar Presets */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">🎯 Quick Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    'Business Professional',
                    'Social Media Influencer',
                    'Friendly Customer Service',
                    'Tech Expert',
                    'Creative Artist'
                  ].map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => {
                        setAvatarName(preset);
                        setSelectedStyle(preset.toLowerCase().includes('professional') ? 'professional' : 
                                       preset.toLowerCase().includes('creative') ? 'creative' : 'friendly');
                      }}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avatar Gallery */}
          <div className="lg:col-span-3 space-y-6">
            {selectedAvatar && (
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <img
                        src={selectedAvatar.thumbnail}
                        alt={selectedAvatar.name}
                        className="w-48 h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="lg" className="bg-white/90 text-black hover:bg-white">
                          🎤 Test Voice
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{selectedAvatar.name}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">Gender:</span>
                            <span className="text-sm">{selectedAvatar.gender}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">Age:</span>
                            <span className="text-sm">{selectedAvatar.age} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">Style:</span>
                            <span className="text-sm">{selectedAvatar.style}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">Voice:</span>
                            <span className="text-sm">{selectedAvatar.voice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">Usage:</span>
                            <span className="text-sm">{selectedAvatar.usageCount} videos</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-400">Rating:</span>
                            <span className="text-sm">⭐ {selectedAvatar.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500">
                          🎬 Use in Video
                        </Button>
                        <Button size="sm" variant="outline">
                          ✏️ Customize
                        </Button>
                        <Button size="sm" variant="outline">
                          📊 Analytics
                        </Button>
                        <Button size="sm" variant="outline">
                          🔄 Clone Avatar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedAvatar(null)}
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
                <CardTitle>Avatar Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allAvatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      className="group relative bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <div className="relative">
                        <img
                          src={avatar.thumbnail}
                          alt={avatar.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Button
                            size="sm"
                            className="bg-white/90 text-black hover:bg-white"
                          >
                            👁️ View Details
                          </Button>
                        </div>

                        <div className="absolute top-2 right-2">
                          <Badge 
                            variant="default"
                            className="bg-green-500 text-xs"
                          >
                            {avatar.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-medium text-white truncate mb-1">{avatar.name}</h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400">{avatar.gender}, {avatar.age}</span>
                          <span className="text-xs text-slate-500">{avatar.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex gap-2">
                            <span>🎬 {avatar.usageCount}</span>
                            {avatar.rating > 0 && <span>⭐ {avatar.rating}</span>}
                          </div>
                          {avatar.timestamp === 'just now' && (
                            <Badge variant="default" className="bg-cyan-500 text-xs">New</Badge>
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

export default AvatarStudio;