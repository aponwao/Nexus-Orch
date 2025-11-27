import React from 'react';
import { 
  Sparkles, 
  ChevronDown, 
  Share2, 
  Save, 
  PanelRight, 
  Workflow, 
  Paperclip, 
  Mic, 
  BrainCircuit, 
  ArrowUp 
} from 'lucide-react';
import RotatingText from '../ui/RotatingText';

interface MainContentProps {
  toggleRightSidebar: () => void;
  isRightSidebarOpen: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ toggleRightSidebar, isRightSidebarOpen }) => {
  return (
    <main className="flex-1 flex flex-col relative bg-[#0a0a0a] min-h-0 overflow-hidden isolate">
      <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-neutral-800/30 relative z-10 bg-[#0a0a0a]/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-sm font-medium text-neutral-200 transition-colors shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Claude 3.5 Sonnet</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500 ml-1" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border border-neutral-800/50 bg-neutral-900/20 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">Context</span>
          </div>
          <div className="h-3 w-px bg-neutral-800"></div>
          <div className="flex items-center gap-2">
             <div className="flex flex-col gap-0.5">
                <div className="w-24 h-1 bg-neutral-800 rounded-full overflow-hidden">
                   <div className="w-[40%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>
             </div>
             <span className="text-[10px] font-mono text-neutral-400">20k / 50k tokens</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-neutral-800 hover:bg-neutral-800/50 text-xs font-medium text-neutral-400 hover:text-white transition-all">
            <Share2 className="w-3.5 h-3.5" />
            Share Context
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-neutral-800 hover:bg-neutral-800/50 text-xs font-medium text-neutral-400 hover:text-white transition-all">
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
          <div className="h-4 w-px bg-neutral-800 mx-1"></div>
          <button 
            onClick={toggleRightSidebar}
            className={`text-neutral-400 hover:text-white transition-colors ${!isRightSidebarOpen ? 'text-indigo-400' : ''}`}
          >
            <PanelRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col pt-10 pr-8 pb-10 pl-8 items-center justify-center relative z-10">
        <div className="max-w-3xl w-full flex flex-col items-center text-center -mt-16">
          <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center backdrop-blur-sm bg-neutral-900/30">
            <Workflow className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-neutral-100 mb-4">
            Orchestrate your Vibe Coding
          </h1>
          
          <RotatingText />

          <div className="w-full max-w-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between px-2 w-full">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]">1</span>
                <span className="text-xs font-medium text-indigo-300">Idea</span>
              </div>
              <div className="h-px w-12 bg-indigo-500/30"></div>
              
              <div className="flex items-center gap-2 opacity-50">
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-neutral-700 bg-neutral-900 text-[10px] text-neutral-500">2</span>
                <span className="text-xs font-medium text-neutral-500">Context</span>
              </div>
              <div className="h-px w-12 bg-neutral-800"></div>

              <div className="flex items-center gap-2 opacity-50">
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-neutral-700 bg-neutral-900 text-[10px] text-neutral-500">3</span>
                <span className="text-xs font-medium text-neutral-500">Artifacts</span>
              </div>
              <div className="h-px w-12 bg-neutral-800"></div>

              <div className="flex items-center gap-2 opacity-50">
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-neutral-700 bg-neutral-900 text-[10px] text-neutral-500">4</span>
                <span className="text-xs font-medium text-neutral-500">Route</span>
              </div>
            </div>

            <div className="w-full relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="group-focus-within:border-neutral-700 group-focus-within:ring-1 group-focus-within:ring-neutral-700 transition-all shadow-2xl overflow-hidden bg-[#121212]/90 backdrop-blur-md border-neutral-800 border rounded-lg relative w-full">
                
                <textarea 
                  placeholder="Describe your app idea, paste an error, or upload a PDF..." 
                  className="placeholder-neutral-600 resize-none focus:outline-none text-sm text-neutral-200 bg-transparent w-full h-[80px] pt-4 pr-5 pb-4 pl-5 font-light"
                ></textarea>
                
                <div className="flex pr-3 pb-3 pl-3 items-center justify-between bg-transparent">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                    <div className="h-4 w-px bg-neutral-800 mx-1"></div>
                    <button className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-neutral-800/50 text-indigo-400 text-xs font-medium transition-colors">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      Deep Think On
                    </button>
                  </div>
                  
                  <button className="flex hover:bg-neutral-200 transition-colors text-black bg-white w-8 h-8 rounded shadow-[0_0_15px_rgba(255,255,255,0.1)] items-center justify-center">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] text-neutral-600">Nexus orchestrates prompts. Verify generated code before deployment.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
