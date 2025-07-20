// Mock data for Sociact AI Dashboard

export const agentStatus = {
  videoGenerator: {
    id: 'video-gen',
    name: 'Video Generator',
    description: 'Creating UGC ads with avatars',
    status: 'active', // active, processing, idle, generating
    progress: 75,
    icon: '🎬',
    color: 'blue',
    currentTask: 'Generated 3 videos',
    completedTasks: 3,
    totalTasks: 4
  },
  imageCreator: {
    id: 'image-gen',
    name: 'Image Creator',
    description: 'AI-powered image generation',
    status: 'processing',
    progress: 45,
    icon: '🖼️',
    color: 'green',
    currentTask: 'Creating thumbnails',
    completedTasks: 12,
    totalTasks: 20
  },
  commentAutomator: {
    id: 'comment-auto',
    name: 'Comment Automator',
    description: 'Managing Instagram & YouTube',
    status: 'active',
    progress: 90,
    icon: '💬',
    color: 'orange',
    currentTask: 'Replied to 12 comments',
    completedTasks: 45,
    totalTasks: 50
  },
  autoVideoEditor: {
    id: 'video-editor',
    name: 'Auto Video Editor',
    description: 'Editing and optimizing content',
    status: 'generating',
    progress: 30,
    icon: '✂️',
    color: 'purple',
    currentTask: 'Processing video clips',
    completedTasks: 8,
    totalTasks: 25
  }
};

export const activityFeed = [
  {
    id: 1,
    agent: 'Editor Agent',
    action: 'completed video editing task',
    timestamp: 'just now',
    icon: '✂️',
    color: 'red'
  },
  {
    id: 2,
    agent: 'SEO Agent',
    action: 'optimized content for search',
    timestamp: 'just now',
    icon: '🔍',
    color: 'blue'
  },
  {
    id: 3,
    agent: 'Video Agent',
    action: 'generated a new avatar video',
    timestamp: 'just now',
    icon: '🎬',
    color: 'purple'
  },
  {
    id: 4,
    agent: 'Comment Agent',
    action: 'auto-replied to YouTube comments',
    timestamp: 'just now',
    icon: '💬',
    color: 'white'
  }
];

export const quickActions = [
  { id: 'generate-video', label: 'Generate Video', icon: '🎬', color: 'purple' },
  { id: 'create-image', label: 'Create Image', icon: '🖼️', color: 'green' },
  { id: 'auto-comments', label: 'Auto Comments', icon: '💬', color: 'gray' },
  { id: 'edit-video', label: 'Edit Video', icon: '✂️', color: 'red' },
  { id: 'write-script', label: 'Write Script', icon: '📝', color: 'pink' },
  { id: 'view-analytics', label: 'View Analytics', icon: '📊', color: 'blue' },
  { id: 'schedule-content', label: 'Schedule Content', icon: '📅', color: 'indigo' },
  { id: 'seo-optimize', label: 'SEO Optimize', icon: '🔍', color: 'teal' }
];

export const todaysStats = [
  { label: 'Videos Generated', value: 24, icon: '🎬', color: 'blue' },
  { label: 'Images Created', value: 156, icon: '🖼️', color: 'green' },
  { label: 'Comments Managed', value: 89, icon: '💬', color: 'orange' },
  { label: 'Videos Edited', value: 12, icon: '✂️', color: 'purple' }
];

export const dashboardStats = [
  { label: 'Comments Automated', value: '1,247', change: '+12%' },
  { label: 'Images Generated', value: '89', change: '+5%' },
  { label: 'Videos Created', value: '23', change: '+8%' },
  { label: 'Ad Campaigns', value: '15', change: '+3%' },
  { label: 'Avg Rating', value: '4.8', change: '+0.2' }
];

export const sidebarItems = [
  {
    section: 'DASHBOARD',
    items: [
      { label: 'Overview', icon: '📊', path: '/dashboard' },
      { label: 'Analytics', icon: '📈', path: '/analytics' }
    ]
  },
  {
    section: 'AI TOOLS',
    items: [
      { label: 'Comment Automation', icon: '💬', path: '/comment-automation', badge: 'NEW' },
      { label: 'Image Generation', icon: '🖼️', path: '/image-generation' },
      { label: 'Video Generation', icon: '🎬', path: '/video-generation' },
      { label: 'Auto Video Editor', icon: '✂️', path: '/auto-video-editor' }
    ]
  },
  {
    section: 'AD CREATION',
    items: [
      { label: 'UGC Ads Creator', icon: '🎭', path: '/ugc-ads' },
      { label: 'Product Ads Creator', icon: '📦', path: '/product-ads' },
      { label: 'Avatar Studio', icon: '👤', path: '/avatar-studio' }
    ]
  },
  {
    section: 'ACCOUNT',
    items: [
      { label: 'Settings', icon: '⚙️', path: '/settings' },
      { label: 'Help & Support', icon: '❓', path: '/support' }
    ]
  }
];

export const commandOptions = {
  actions: [
    'Generate Video',
    'Create Image',
    'Write Script',
    'Auto Comments',
    'Edit Video',
    'Schedule Content',
    'Optimize SEO'
  ],
  targets: [
    'Instagram Posts',
    'YouTube Videos',
    'TikTok Content',
    'Facebook Ads',
    'Product Campaigns'
  ],
  timeframes: [
    'Now',
    'In 1 hour',
    'Tomorrow',
    'This week',
    'Custom schedule'
  ]
};