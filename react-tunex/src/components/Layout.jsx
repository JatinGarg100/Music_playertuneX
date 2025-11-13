import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import PlaybackMessage from './PlaybackMessage';

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`app-container ${isCollapsed ? 'collapsed' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} onToggle={handleToggle} />

      <main className="main-content">
        <Header />
        <Outlet />
        <Footer />
      </main>

      <PlaybackMessage />
    </div>
  );
};

export default Layout;
