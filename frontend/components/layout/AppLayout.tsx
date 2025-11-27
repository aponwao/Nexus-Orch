import React, { useState } from 'react';
import { colors } from '@/lib/design-system';
import GlobalNav from './GlobalNav';
import ProjectSidebar from './ProjectSidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';

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

      <RightSidebar 
        isOpen={isRightSidebarOpen}
        onClose={toggleRightSidebar}
      />
    </div>
  );
};

export default AppLayout;
