import Card from '../components/Card';
import { useMusicData } from '../hooks/useMusicData';

const Albums = () => {
  const { albums } = useMusicData();

  return (
    <div className="albums-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Featured Albums</h1>
          <p className="hero-subtitle">Browse through our album collection</p>
        </div>
      </section>

      <section className="section">
        <div className="card-grid albums-grid">
          {albums.map(album => (
            <Card key={album.id} item={album} type="album" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Albums;
