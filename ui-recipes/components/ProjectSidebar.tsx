import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  MessageSquareDashed,
  LayoutDashboard,
  Map as MapIcon,
  Book,
  ChevronRight,
  Github,
  Triangle,
  Rabbit,
  MoreHorizontal,
  Zap,
  MoreVertical,
  RotateCcw,
  Pencil,
  UserPlus,
  UserCog
} from 'lucide-react';

const ProjectSidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="w-64 h-full flex flex-col bg-[#0c0c0c] border-r border-neutral-800/50 flex-shrink-0 z-10">
      {/* Project Selector Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800/30 hover:bg-neutral-800/20 transition-colors group relative">
        <div className="flex flex-col justify-center cursor-pointer">
          <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wide">Current Project</span>
          <div className="flex items-center gap-2 text-neutral-200 font-medium text-sm">
            <span>Delivery App v2</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300" />
          </div>
        </div>
        
        {/* Menu Trigger */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className={`p-1.5 rounded-md transition-all ${isMenuOpen ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/50'}`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="absolute top-14 right-2 w-48 bg-[#151515] border border-neutral-800 rounded-lg shadow-xl shadow-black/50 z-50 overflow-hidden ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-100">
            <div className="p-1 flex flex-col gap-0.5">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <Pencil className="w-3.5 h-3.5" />
                Rename
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <UserPlus className="w-3.5 h-3.5" />
                Add member
              </button>
              <div className="h-px bg-neutral-800/50 my-0.5 mx-1"></div>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <UserCog className="w-3.5 h-3.5" />
                Change of Owner
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Project Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        
        <div className="space-y-0.5 mb-8">
          {/* Orchestrator (Active) */}
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded bg-indigo-500/10 text-indigo-100 border border-indigo-500/20 group mb-1">
            <MessageSquareDashed className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium">Orchestrator</span>
          </a>

          {/* Dashboard */}
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200 transition-colors group">
            <LayoutDashboard className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300" />
            <span className="text-sm">Dashboard</span>
          </a>

          {/* Roadmap */}
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200 transition-colors group">
            <MapIcon className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300" />
            <span className="text-sm">Roadmap</span>
          </a>

          {/* Knowledge Base */}
          <div className="relative group">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200 transition-colors">
              <Book className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300" />
              <span className="text-sm">Knowledge Base</span>
              <ChevronRight className="w-3 h-3 ml-auto text-neutral-600" />
            </a>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-3 mb-3">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Integrations</span>
          </div>
          <div className="flex flex-col gap-1">
            {/* GitHub (Active) */}
            <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <Github className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-neutral-200">GitHub</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
            </div>

            {/* Linear (Active) */}
            <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center">
                  <Triangle className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 rotate-90" />
                </div>
                <span className="text-sm font-medium text-neutral-200">Linear</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
            </div>

            {/* CodeRabbit (Inactive) */}
            <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800/30 transition-colors group cursor-pointer opacity-60 hover:opacity-100">
              <div className="flex items-center gap-3">
                <Rabbit className="w-4 h-4 text-neutral-500 group-hover:text-neutral-400" />
                <span className="text-sm text-neutral-500 group-hover:text-neutral-400">CodeRabbit</span>
              </div>
              <div className="w-2 h-2 rounded-full border border-neutral-700 bg-transparent"></div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">History</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {/* History Item 1 */}
            <div className="relative group flex items-start justify-between px-3 py-2 rounded hover:bg-neutral-800/40 transition-colors cursor-pointer">
              <div className="flex-1 min-w-0 pr-2">
                <div className="text-xs font-medium text-neutral-300 group-hover:text-white truncate">Auth Logic Update</div>
                <div className="text-[10px] text-neutral-500 truncate mt-0.5">Today, 10:23 AM</div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700 rounded-sm text-neutral-400 hover:text-white transition-all focus:opacity-100" title="Options">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* History Item 2 */}
            <div className="relative group flex items-start justify-between px-3 py-2 rounded hover:bg-neutral-800/40 transition-colors cursor-pointer">
              <div className="flex-1 min-w-0 pr-2">
                <div className="text-xs font-medium text-neutral-300 group-hover:text-white truncate">Database Migration</div>
                <div className="text-[10px] text-neutral-500 truncate mt-0.5">Yesterday</div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700 rounded-sm text-neutral-400 hover:text-white transition-all focus:opacity-100" title="Options">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Plan Status Card */}
      <div className="p-3 bg-[#0c0c0c]">
        <div className="rounded-xl bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 border border-neutral-800 p-4 shadow-sm relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl -mr-8 -mt-8 transition-all group-hover:bg-indigo-500/20"></div>
            
            <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Zap className="w-3.5 h-3.5 fill-indigo-400" />
                    </div>
                    <span className="text-sm font-semibold text-white">Pro Plan</span>
                </div>
                <span className="text-[10px] font-medium bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">80%</span>
            </div>
            
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-2">
                <div className="w-[80%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] text-neutral-500">12 days left</span>
                <button className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Upgrade</button>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;