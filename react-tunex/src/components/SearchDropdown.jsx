import { useMusicContext } from '../contexts/MusicContext';
import { useMusicData } from '../hooks/useMusicData';

const SearchDropdown = ({ searchTerm, onClose, onSelectResult }) => {
  const { playAudio } = useMusicContext();
  const { allItems } = useMusicData();

  const filteredItems = allItems.filter(item => {
    const searchData = `${item.title} ${item.subtitle} ${item.type}`.toLowerCase();
    return searchData.includes(searchTerm.toLowerCase());
  }).slice(0, 10);

  const handleItemClick = (item) => {
    // Scroll to item logic can be added here
    onSelectResult();
  };

  const handlePlayClick = (e, item) => {
    e.stopPropagation();
    playAudio(item);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="search-results-dropdown">
        <div className="dropdown-item">
          <div className="dropdown-item-text">
            <div className="dropdown-item-title">No results found</div>
            <div className="dropdown-item-subtitle">Try a different search term</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-dropdown">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="dropdown-item"
          onClick={() => handleItemClick(item)}
        >
          <img
            src={item.image}
            alt={item.type}
            className="dropdown-item-image"
            style={{ borderRadius: item.type === 'artist' ? '50%' : '5px' }}
          />
          <div className="dropdown-item-text">
            <div className="dropdown-item-title">{item.title}</div>
            <div className="dropdown-item-subtitle">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} - {item.subtitle}
            </div>
          </div>
          {item.audioSrc && (
            <button
              className="dropdown-item-play-btn"
              onClick={(e) => handlePlayClick(e, item)}
            >
              <i className="fas fa-play"></i>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
