import Card from '../components/Card';
import { useMusicData } from '../hooks/useMusicData';

const Artists = () => {
  const { artists } = useMusicData();

  return (
    <div className="artists-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Popular Artists</h1>
          <p className="hero-subtitle">Discover your favorite artists</p>
        </div>
      </section>

      <section className="section">
        <div className="card-grid artists-grid">
          {artists.map(artist => (
            <Card key={artist.id} item={artist} type="artist" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Artists;
