import React, { useState } from 'react';
import { colors, spacing } from '@/lib/design-system';
import GlobalNav from './GlobalNav';
import ProjectSidebar from './ProjectSidebar';
import MainContent from './MainContent';

const AppLayout: React.FC = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden text-neutral-300" style={{ backgroundColor: colors.background }}>
      <GlobalNav />
      <ProjectSidebar />

      <MainContent 
        toggleRightSidebar={toggleRightSidebar} 
        isRightSidebarOpen={isRightSidebarOpen} 
      />

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
