import { useParams } from 'react-router-dom';
import { useFavoritesContext } from '../contexts/FavoritesContext';
import Card from '../components/Card';

const Favorites = () => {
  const { type } = useParams();
  const { getFavoritesByType } = useFavoritesContext();

  const favorites = getFavoritesByType(type);

  const getTitle = () => {
    switch(type) {
      case 'songs': return 'Favorite Songs';
      case 'albums': return 'Favorite Albums';
      case 'artists': return 'Favorite Artists';
      default: return 'Favorites';
    }
  };

  return (
    <div className="favorites-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{getTitle()}</h1>
          <p className="hero-subtitle">Your personalized collection</p>
        </div>
      </section>

      <section className="section">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <i className="far fa-heart" style={{ fontSize: '4rem', color: '#bf0603' }}></i>
            <p>No favorites yet. Start adding your favorite {type}!</p>
          </div>
        ) : (
          <div className="card-grid">
            {favorites.map(item => (
              <Card key={item.id} item={item} type={item.type} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;
