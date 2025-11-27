import React, { useState } from 'react';
import { colors, spacing } from '@/lib/design-system';

const AppLayout: React.FC = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden text-neutral-300" style={{ backgroundColor: colors.background }}>
      <div className={`${spacing.railWidth} h-full flex-shrink-0 border-r border-neutral-800/50`} style={{ backgroundColor: colors.background }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-xs text-neutral-500">Global Nav</div>
        </div>
      </div>

      <div className={`${spacing.sidebarWidth} h-full flex-shrink-0 border-r border-neutral-800/50`} style={{ backgroundColor: colors.surface }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-xs text-neutral-500">Project Sidebar</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col" style={{ backgroundColor: colors.background }}>
        <div className={`${spacing.headerHeight} border-b border-neutral-800/50 flex items-center justify-between px-6`}>
          <div className="text-xs text-neutral-500">Main Header</div>
          <button
            onClick={toggleRightSidebar}
            className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Toggle Right
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-xs text-neutral-500">Main Content</div>
        </div>
      </div>

      <div
        className={`${spacing.rightPanelWidth} h-full flex-shrink-0 border-l border-neutral-800/50 transition-all duration-300 ease-in-out ${
          isRightSidebarOpen ? 'opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
        style={{ backgroundColor: colors.surface }}
      >
        <div className="flex items-center justify-center h-full min-w-[20rem]">
          <div className="text-xs text-neutral-500">Right Sidebar</div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
