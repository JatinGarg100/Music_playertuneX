import { useMusicContext } from '../contexts/MusicContext';
import { useFavoritesContext } from '../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const Card = ({ item, type }) => {
  const { playAudio, currentTrack, isPlaying } = useMusicContext();
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const navigate = useNavigate();

  const isCurrentlyPlaying = currentTrack?.id === item.id && isPlaying;
  const isFavorited = isFavorite(item.id);

  const handleCardClick = () => {
    if (item.detailPage) {
      navigate(item.detailPage);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (item.audioSrc) {
      playAudio(item);
    } else if (item.detailPage) {
      navigate(item.detailPage);
    }
  };

  const imgClass = type === 'artist' ? 'artist-img' : 'card-img';

  return (
    <div
      className={`card ${isCurrentlyPlaying ? 'playing' : ''} ${isFavorited ? 'favorited' : ''}`}
      data-type={type}
      id={item.id}
    >
      <img
        src={item.image}
        alt={`${type} Cover`}
        className={imgClass}
      />

      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-subtitle">{item.subtitle}</p>
      </div>

      <div className="card-controls">
        <button
          className="favorite-btn"
          onClick={handleFavoriteClick}
        >
          <i className={isFavorited ? 'fas fa-heart' : 'far fa-heart'}></i>
        </button>

        <button
          className="play-pause-btn"
          onClick={handlePlayClick}
        >
          <i className={`fas ${isCurrentlyPlaying ? 'fa-pause' : 'fa-play'} play-icon`}></i>
        </button>
      </div>

      {item.audioSrc && <audio src={item.audioSrc}></audio>}
    </div>
  );
};

export default Card;
