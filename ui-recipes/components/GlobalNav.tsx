import React from 'react';
import { 
  Sparkles, 
  LayoutGrid, 
  Building2, 
  CreditCard, 
  Settings 
} from 'lucide-react';

const GlobalNav: React.FC = () => {
  return (
    <nav className="w-16 h-full flex flex-col items-center py-5 border-r border-neutral-800/50 bg-[#0a0a0a] z-20 flex-shrink-0">
      {/* Brand Icon */}
      <div className="mb-8 group cursor-pointer">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
          <Sparkles className="text-white w-5 h-5 fill-white/20" />
        </div>
      </div>

      {/* Global Items */}
      <div className="flex flex-col gap-4 w-full items-center">
        {/* Projects */}
        <button className="p-2.5 rounded-md bg-neutral-800 text-white shadow-inner ring-1 ring-white/10 group relative">
          <LayoutGrid className="w-5 h-5" />
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Projects</span>
        </button>
        
        {/* Organization */}
        <button className="p-2.5 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all group relative">
          <Building2 className="w-5 h-5" />
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Organization</span>
        </button>
        
        {/* Billing */}
        <button className="p-2.5 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all group relative">
          <CreditCard className="w-5 h-5" />
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Billing</span>
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-4 w-full items-center pb-2">
        {/* Global Settings */}
        <button className="p-2.5 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all group relative">
          <Settings className="w-5 h-5" />
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Settings</span>
        </button>
        
        {/* Profile */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-600 border border-neutral-500/30 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-600 transition-all">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full opacity-80" />
        </div>
      </div>
    </nav>
  );
};

export default GlobalNav;