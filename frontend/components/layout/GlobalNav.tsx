import React from 'react';

const GlobalNav: React.FC = () => {
  return (
    <nav className="w-12 h-full flex flex-col items-center py-4 border-r border-neutral-800/50 bg-[#0a0a0a] z-20 flex-shrink-0">
      <div className="mb-8 group cursor-pointer">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
          <svg className="text-white w-5 h-5 fill-white/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" fill="currentColor"/>
            <path d="M20 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M22 5h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 17v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M5 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        <button className="p-2.5 rounded-md bg-neutral-800 text-white shadow-inner ring-1 ring-white/10 group relative">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
          </svg>
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Projects</span>
        </button>
        
        <button className="p-2.5 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all group relative">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"/>
            <path d="M3 7v1a3 3 0 0 0 3 3h0a2 2 0 0 1 2 2v0a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v0a2 2 0 0 1 2-2h0a3 3 0 0 0 3-3V7"/>
            <path d="M4 21V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15"/>
          </svg>
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Organization</span>
        </button>
        
        <button className="p-2.5 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all group relative">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <path d="M2 10h20"/>
          </svg>
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Billing</span>
        </button>
      </div>

      <div className="flex-grow"></div>

      <div className="flex flex-col gap-4 w-full items-center pb-2">
        <button className="p-2.5 rounded-md text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50 transition-all group relative">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span className="absolute left-14 bg-neutral-800 text-xs px-2 py-1 rounded-sm border border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Settings</span>
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-600 border border-neutral-500/30 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-600 transition-all">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full opacity-80" />
        </div>
      </div>
    </nav>
  );
};

export default GlobalNav;
