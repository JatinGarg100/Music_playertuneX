import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import SearchDropdown from './SearchDropdown';

const Header = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchBoxRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleSearch = () => {
    if (searchTerm.trim().length >= 2) {
      setShowDropdown(true);
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="header-content">
        <nav className="header-nav">
          <Link to="/home" className={isActive('/home')}>Home</Link>
          <Link to="/artists" className={isActive('/artists')}>Artists</Link>
          <Link to="/albums" className={isActive('/albums')}>Albums</Link>
          <Link to="/about" className={isActive('/about')}>About Us</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact Us</Link>
        </nav>

        <div className="header-actions">
          <div className="search-box" ref={searchBoxRef}>
            <i className="fas fa-search" onClick={handleSearch}></i>
            <input
              type="text"
              id="searchInput"
              placeholder="Search Artists, Albums, Songs..."
              value={searchTerm}
              onChange={handleSearchInput}
              onKeyDown={handleKeyDown}
            />
            {showDropdown && (
              <SearchDropdown
                searchTerm={searchTerm}
                onClose={() => setShowDropdown(false)}
                onSelectResult={() => setShowDropdown(false)}
              />
            )}
          </div>

          <Link to="/" className="tunex-logo-container">
            <img src="/logo.jpg" alt="Tunex Logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
