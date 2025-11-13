import Card from '../components/Card';
import { useMusicData } from '../hooks/useMusicData';

const Home = () => {
  const { albums, artists, songs } = useMusicData();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome Back!</h1>
          <p className="hero-subtitle">What's new? Discover your next favorite track.</p>
          <div className="hero-actions">
            <a href="#" className="btn">
              <i className="fas fa-play"></i> Play a Mix
            </a>
            <a href="#" className="btn">Browse</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured <span>Albums</span></h2>
        </div>
        <div className="card-grid albums-grid">
          {albums.map(album => (
            <Card key={album.id} item={album} type="album" />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Popular <span>Artists</span></h2>
        </div>
        <div className="card-grid artists-grid">
          {artists.map(artist => (
            <Card key={artist.id} item={artist} type="artist" />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Top <span>Songs</span></h2>
        </div>
        <div className="card-grid songs-grid">
          {songs.map(song => (
            <Card key={song.id} item={song} type="song" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
