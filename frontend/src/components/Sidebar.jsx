import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { sidebarItems } from '../data/mockData';

const Sidebar = ({ currentPath = '/dashboard', onNavigate }) => {
  const [activeItem, setActiveItem] = useState(currentPath);

  const handleItemClick = (path, label) => {
    setActiveItem(path);
    if (onNavigate) {
      onNavigate(path, label);
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sociact AI
          </h1>
        </div>

        <nav className="space-y-8">
          {sidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = activeItem === item.path;
                  return (
                    <li key={itemIndex}>
                      <button
                        onClick={() => handleItemClick(item.path, item.label)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-0.5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;