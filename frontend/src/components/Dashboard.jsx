import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { agentStatus, activityFeed, quickActions, todaysStats, commandOptions } from '../data/mockData';

const Dashboard = () => {
  const [agents, setAgents] = useState(agentStatus);
  const [activities, setActivities] = useState(activityFeed);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [activeQuickAction, setActiveQuickAction] = useState(null);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update agent progress randomly
      setAgents(prev => {
        const newAgents = { ...prev };
        Object.keys(newAgents).forEach(key => {
          if (newAgents[key].status === 'active' || newAgents[key].status === 'processing') {
            const currentProgress = newAgents[key].progress;
            const increment = Math.random() * 5;
            newAgents[key].progress = Math.min(100, currentProgress + increment);
            
            if (newAgents[key].progress >= 100) {
              newAgents[key].status = 'idle';
              newAgents[key].progress = 0;
              setTimeout(() => {
                setAgents(current => ({
                  ...current,
                  [key]: {
                    ...current[key],
                    status: Math.random() > 0.5 ? 'active' : 'processing',
                    progress: Math.random() * 30
                  }
                }));
              }, 2000);
            }
          }
        });
        return newAgents;
      });

      // Add new activity occasionally
      if (Math.random() > 0.7) {
        const newActivities = [
          'generated new avatar video',
          'completed image optimization',
          'replied to 5 comments',
          'created product thumbnail',
          'optimized SEO content',
          'scheduled Instagram post'
        ];
        
        const agents = ['Video Agent', 'Image Agent', 'Comment Agent', 'SEO Agent', 'Editor Agent'];
        const icons = ['🎬', '🖼️', '💬', '🔍', '✂️'];
        const colors = ['purple', 'green', 'orange', 'blue', 'red'];
        
        const randomIndex = Math.floor(Math.random() * newActivities.length);
        const agentIndex = Math.floor(Math.random() * agents.length);
        
        setActivities(prev => [
          {
            id: Date.now(),
            agent: agents[agentIndex],
            action: newActivities[randomIndex],
            timestamp: 'just now',
            icon: icons[agentIndex],
            color: colors[agentIndex]
          },
          ...prev.slice(0, 9)
        ]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const executeCommand = async () => {
    if (!selectedAction || !selectedTarget) return;
    
    setIsExecuting(true);
    setExecutionProgress(0);
    
    // Simulate execution progress
    const progressInterval = setInterval(() => {
      setExecutionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExecuting(false);
          
          // Add success activity
          setActivities(prev => [
            {
              id: Date.now(),
              agent: 'Command Agent',
              action: `executed: ${selectedAction} for ${selectedTarget}`,
              timestamp: 'just now',
              icon: '⚡',
              color: 'yellow'
            },
            ...prev.slice(0, 9)
          ]);
          
          setSelectedAction('');
          setSelectedTarget('');
          return 0;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleQuickAction = async (actionId) => {
    setActiveQuickAction(actionId);
    
    // Simulate action execution
    setTimeout(() => {
      const action = quickActions.find(a => a.id === actionId);
      setActivities(prev => [
        {
          id: Date.now(),
          agent: 'Quick Action',
          action: `executed: ${action.label}`,
          timestamp: 'just now',
          icon: action.icon,
          color: action.color
        },
        ...prev.slice(0, 9)
      ]);
      setActiveQuickAction(null);
    }, 2000);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-green-400',
      processing: 'text-blue-400',
      generating: 'text-purple-400',
      idle: 'text-gray-400'
    };
    return colors[status] || 'text-gray-400';
  };

  const getStatusDot = (status) => {
    const colors = {
      active: 'bg-green-400',
      processing: 'bg-blue-400', 
      generating: 'bg-purple-400',
      idle: 'bg-gray-400'
    };
    return colors[status] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sociact AI
              </h1>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                2 Agents Active
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <span className="text-sm">⚙️</span>
              Settings
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Command Bar */}
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-4 max-w-4xl">
          <div className="flex-1 flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50">
            <span className="text-blue-400">⚡</span>
            <span className="text-sm text-slate-400">Ask Sociact Agents to...</span>
            
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-40 bg-transparent border-slate-600 text-sm">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {commandOptions.actions.map(action => (
                  <SelectItem key={action} value={action} className="text-white hover:bg-slate-700">
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-slate-400">for</span>

            <Select value={selectedTarget} onValueChange={setSelectedTarget}>
              <SelectTrigger className="w-44 bg-transparent border-slate-600 text-sm">
                <SelectValue placeholder="Select target" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {commandOptions.targets.map(target => (
                  <SelectItem key={target} value={target} className="text-white hover:bg-slate-700">
                    {target}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={executeCommand}
            disabled={!selectedAction || !selectedTarget || isExecuting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6"
          >
            {isExecuting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></div>
                Execute {Math.round(executionProgress)}%
              </div>
            ) : (
              <>⚡ Execute</>
            )}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Creator!</h2>
            <p className="text-slate-400">Let's automate your social media and create amazing content with AI</p>
          </div>

          {/* Agent Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {Object.entries(agents).map(([key, agent]) => (
              <Card key={key} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusDot(agent.status)} animate-pulse`}></div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <p className="text-sm text-slate-400 mt-1">{agent.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${getStatusColor(agent.status)} border-current capitalize`}>
                      {agent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-medium">{Math.round(agent.progress)}%</span>
                    </div>
                    <Progress value={agent.progress} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{agent.currentTask}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-700">
                          ▶️
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-700">
                          ⏸️
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    onClick={() => handleQuickAction(action.id)}
                    disabled={activeQuickAction === action.id}
                    className="h-20 flex flex-col items-center gap-2 bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 hover:border-slate-500 transition-all duration-200"
                  >
                    {activeQuickAction === action.id ? (
                      <div className="animate-spin w-6 h-6 border-2 border-current/20 border-t-current rounded-full"></div>
                    ) : (
                      <span className="text-lg">{action.icon}</span>
                    )}
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Live Activity & Stats */}
        <div className="w-80 border-l border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
          {/* Live Activity Feed */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Live Activity Feed</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-700/30 transition-all duration-200 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium text-blue-400">{activity.agent}</span>
                      <br />
                      <span className="text-slate-300">{activity.action}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Stats */}
          <div className="p-6">
            <h3 className="font-semibold mb-4">Today's Stats</h3>
            <div className="space-y-4">
              {todaysStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center text-sm">
                      {stat.icon}
                    </div>
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <span className="font-bold text-lg">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;