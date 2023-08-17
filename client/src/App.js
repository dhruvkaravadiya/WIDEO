import './css/App.css';
import React from 'react';
import { useState } from 'react';
import Body from './components/Body/Body';
import MenuNavbar from './components/MenuNavbar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-container flex h-screen">
      <MenuNavbar onToggleSidebar={toggleSidebar} />
      <Body sidebarOpen={sidebarOpen} />
    </div>
  );
}

export default App;
