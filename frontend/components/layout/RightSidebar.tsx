import React from 'react';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  CircleDashed, 
  AlertTriangle,
  AppWindow,
  Server,
  Database,
  Zap,
  ShieldCheck
} from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside 
      className={`
        border-l border-neutral-800/50 bg-[#0c0c0c] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out relative
        ${isOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'}
      `}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-800/50 min-w-[20rem]">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Live Architecture</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-green-500 font-medium">Syncing</span>
          </div>
          <button onClick={onClose} className="text-neutral-600 hover:text-neutral-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto min-w-[20rem]">
        
        <div className="mb-8">
          <h4 className="text-xs font-medium text-neutral-500 mb-3 flex items-center gap-2">
            <Layers className="w-3 h-3" />
            Stack Layers
          </h4>
          
          <div className="space-y-2">
            <div className="group flex items-start gap-3 p-3 rounded-lg border border-neutral-800/60 bg-[#111] hover:bg-neutral-800/40 hover:border-neutral-700 transition-all cursor-default">
              <div className="mt-0.5 p-1.5 rounded-md bg-neutral-800/40 text-neutral-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                <AppWindow className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-neutral-200">Frontend</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono leading-tight">Next.js 14, Tailwind</div>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3 rounded-lg border border-neutral-800/60 bg-[#111] hover:bg-neutral-800/40 hover:border-neutral-700 transition-all cursor-default">
              <div className="mt-0.5 p-1.5 rounded-md bg-neutral-800/40 text-neutral-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                <Server className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-neutral-200">Backend</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono leading-tight">TypeScript (Encore.ts)</div>
                <div className="text-[10px] text-neutral-600 font-mono mt-0.5">Encore Cloud</div>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3 rounded-lg border border-neutral-800/60 bg-[#111] hover:bg-neutral-800/40 hover:border-neutral-700 transition-all cursor-default">
              <div className="mt-0.5 p-1.5 rounded-md bg-neutral-800/40 text-neutral-400 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors">
                <Database className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-neutral-200">Database</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] px-1 py-px bg-orange-500/10 text-orange-400 rounded border border-orange-500/20">Changed</span>
                  </div>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono leading-tight">Supabase (Postgres)</div>
                <div className="text-[10px] text-orange-500/60 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" />
                  Replaced Firebase
                </div>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3 rounded-lg border border-neutral-800/60 bg-[#111] hover:bg-neutral-800/40 hover:border-neutral-700 transition-all cursor-default">
              <div className="mt-0.5 p-1.5 rounded-md bg-neutral-800/40 text-neutral-400 group-hover:text-red-400 group-hover:bg-red-500/10 transition-colors">
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-neutral-200">Caching</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-600 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono leading-tight">Redis (Upstash)</div>
              </div>
            </div>

            <div className="group flex items-start gap-3 p-3 rounded-lg border border-neutral-800/60 bg-[#111] hover:bg-neutral-800/40 hover:border-neutral-700 transition-all cursor-default">
              <div className="mt-0.5 p-1.5 rounded-md bg-neutral-800/40 text-neutral-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-neutral-200">Auth</span>
                  <CircleDashed className="w-3.5 h-3.5 text-neutral-500 animate-spin-slow" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono leading-tight">Clerk (Pending)</div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-800/30">
          <div className="bg-red-500/5 border border-red-500/20 rounded-md p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <h5 className="text-xs font-medium text-red-400 mb-1">Emergency Rollback</h5>
                <p className="text-[10px] text-red-500/70 leading-snug mb-3">Revert to last stable commit (v0.4.2) if code is broken.</p>
                <button className="w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-sm text-xs text-red-400 font-medium transition-colors">
                  Restore Stable
                </button>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-neutral-700 hover:bg-neutral-800 text-xs font-medium text-neutral-300 transition-colors">
            <div className="w-3.5 h-3.5 relative">
              <div className="absolute inset-0 border border-neutral-400 rounded-sm transform rotate-45"></div>
            </div>
            Export Tasks to Linear
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
