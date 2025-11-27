import React, { useState, useRef, useEffect } from 'react';

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
    <aside className="w-64 h-full flex flex-col bg-[#0c0c0c] border-r border-neutral-800/50 flex-shrink-0 z-10 min-w-0">
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800/30 hover:bg-neutral-800/20 transition-colors group relative">
        <div className="flex flex-col justify-center cursor-pointer">
          <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wide">Current Project</span>
          <div className="flex items-center gap-2 text-neutral-200 font-medium text-sm">
            <span>Delivery App v2</span>
            <svg className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className={`p-1.5 rounded-md transition-all ${isMenuOpen ? 'bg-neutral-800 text-neutral-200' : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/50'}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="absolute top-14 right-2 w-48 bg-[#151515] border border-neutral-800 rounded-lg shadow-xl shadow-black/50 z-50 overflow-hidden ring-1 ring-white/5">
            <div className="p-1 flex flex-col gap-0.5">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M8 16H3v5"/>
                </svg>
                Reset
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                  <path d="m15 5 4 4"/>
                </svg>
                Rename
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" x2="19" y1="8" y2="14"/>
                  <line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
                Add member
              </button>
              <div className="h-px bg-neutral-800/50 my-0.5 mx-1"></div>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors text-left">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>
                </svg>
                Change of Owner
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        
        <div className="space-y-0.5 mb-8">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded bg-indigo-500/10 text-indigo-100 border border-indigo-500/20 group mb-1">
            <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"/>
              <rect width="16" height="12" x="4" y="8" rx="2"/>
              <path d="M2 14h2"/>
              <path d="M20 14h2"/>
              <path d="M15 13v2"/>
              <path d="M9 13v2"/>
            </svg>
            <span className="text-sm font-medium">Orchestrator</span>
          </a>

          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200 transition-colors group">
            <svg className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="9" x="3" y="3" rx="1"/>
              <rect width="7" height="5" x="14" y="3" rx="1"/>
              <rect width="7" height="9" x="14" y="12" rx="1"/>
              <rect width="7" height="5" x="3" y="16" rx="1"/>
            </svg>
            <span className="text-sm">Dashboard</span>
          </a>

          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200 transition-colors group">
            <svg className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/>
              <path d="M15 5.764v15"/>
              <path d="M9 3.236v15"/>
            </svg>
            <span className="text-sm">Roadmap</span>
          </a>

          <div className="relative group">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200 transition-colors">
              <svg className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
              </svg>
              <span className="text-sm">Knowledge Base</span>
              <svg className="w-3 h-3 ml-auto text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between px-3 mb-3">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Integrations</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-medium text-neutral-200">GitHub</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 rotate-90" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.73 18 8 2.74l-.73 4L3.06 9.06a1.5 1.5 0 0 0-.32 1.83L8.24 21.5"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-200">Linear</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded hover:bg-neutral-800/30 transition-colors group cursor-pointer opacity-60 hover:opacity-100">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-neutral-500 group-hover:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 16a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3Z"/>
                  <path d="M13 8a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3Z"/>
                  <path d="M13 16h6"/>
                  <path d="M13 8h6"/>
                  <path d="M3 16h3"/>
                  <path d="M3 8h3"/>
                </svg>
                <span className="text-sm text-neutral-500 group-hover:text-neutral-400">CodeRabbit</span>
              </div>
              <div className="w-2 h-2 rounded-full border border-neutral-700 bg-transparent"></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">History</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="relative group flex items-start justify-between px-3 py-2 rounded hover:bg-neutral-800/40 transition-colors cursor-pointer">
              <div className="flex-1 min-w-0 pr-2">
                <div className="text-xs font-medium text-neutral-300 group-hover:text-white truncate">Auth Logic Update</div>
                <div className="text-[10px] text-neutral-500 truncate mt-0.5">Today, 10:23 AM</div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700 rounded-sm text-neutral-400 hover:text-white transition-all focus:opacity-100" title="Options">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                </svg>
              </button>
            </div>

            <div className="relative group flex items-start justify-between px-3 py-2 rounded hover:bg-neutral-800/40 transition-colors cursor-pointer">
              <div className="flex-1 min-w-0 pr-2">
                <div className="text-xs font-medium text-neutral-300 group-hover:text-white truncate">Database Migration</div>
                <div className="text-[10px] text-neutral-500 truncate mt-0.5">Yesterday</div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700 rounded-sm text-neutral-400 hover:text-white transition-all focus:opacity-100" title="Options">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-[#0c0c0c]">
        <div className="rounded-xl bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 border border-neutral-800 p-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl -mr-8 -mt-8 transition-all group-hover:bg-indigo-500/20"></div>
            
            <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <svg className="w-3.5 h-3.5 fill-indigo-400" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                        </svg>
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
