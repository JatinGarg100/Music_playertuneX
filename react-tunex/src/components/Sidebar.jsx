import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  return (
    <>
      <aside className="sidebar">
        <button
          id="sidebar-toggle-btn"
          className="sidebar-toggle-btn"
          onClick={onToggle}
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="sidebar-logo">
          <Link to="/" className="logo">
            <i className="fas fa-compact-disc"></i>
            <span>TuneX</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-title">Menu</div>
          <Link to="/home" className={`nav-item ${isActive('/home')}`}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>

          <Link to="/artists" className={`nav-item ${isActive('/artists')}`}>
            <i className="fas fa-microphone"></i>
            <span>Artists</span>
          </Link>

          <Link to="/albums" className={`nav-item ${isActive('/albums')}`}>
            <i className="fas fa-record-vinyl"></i>
            <span>Albums</span>
          </Link>
        </nav>

        <nav className="sidebar-nav">
          <a
            href="#"
            className="nav-item"
            id="logout-btn"
            onClick={handleLogoutClick}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>

          <Link to="/favorites/songs" className={`nav-item ${isActive('/favorites/songs')}`}>
            <i className="fas fa-music"></i>
            <span>Favorite Songs</span>
          </Link>

          <Link to="/favorites/albums" className={`nav-item ${isActive('/favorites/albums')}`}>
            <i className="fas fa-compact-disc"></i>
            <span>Favorite Albums</span>
          </Link>

          <Link to="/favorites/artists" className={`nav-item ${isActive('/favorites/artists')}`}>
            <i className="fas fa-microphone-alt"></i>
            <span>Favorite Artists</span>
          </Link>

          <a href="#" className="nav-item">
            <i className="fas fa-download"></i>
            <span>Downloads</span>
          </a>
        </nav>
      </aside>

      {showLogoutModal && (
        <div className="logout-modal" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Logout</h3>
            <p>Are you sure you want to logout from TuneX?</p>
            <div className="logout-modal-buttons">
              <button
                className="logout-cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button className="logout-confirm-btn" onClick={handleLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
