import React, { useState } from 'react';
import GlobalNav from './components/GlobalNav';
import ProjectSidebar from './components/ProjectSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';

const App: React.FC = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden text-neutral-300">
      <GlobalNav />
      <ProjectSidebar />
      <MainContent 
        toggleRightSidebar={toggleRightSidebar} 
        isRightSidebarOpen={isRightSidebarOpen} 
      />
      <RightSidebar isOpen={isRightSidebarOpen} onClose={() => setIsRightSidebarOpen(false)} />
    </div>
  );
};

export default App;