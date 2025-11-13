import { Link } from 'react-router-dom';
import { useMusicData } from '../hooks/useMusicData';
import { useEffect } from 'react';
import '../styles/landing.css';

const LandingPage = () => {
  const { albums, artists } = useMusicData();

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const fadeIns = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    fadeIns.forEach(element => {
      observer.observe(element);
    });

    // Smooth scroll for navigation links
    const handleSmoothScroll = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      fadeIns.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">Tune<span>X</span></Link>
            <nav>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#albums">Albums</a></li>
                <li><a href="#artists">Artists</a></li>
                <li><a href="#tracks">Tracks</a></li>
                <li><a href="#features">Features</a></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <Link to="/home">Login</Link>
              <Link to="/home" className="signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Experience Music Like Never Before</h1>
            <p>Discover new artists, stream your favorite tracks, and get tickets to the hottest events in the music industry.</p>
            <Link to="/home" className="cta-button">Start Listening Now</Link>
          </div>
        </div>
      </section>

      {/* Featured Albums */}
      <section className="featured fade-in" id="albums">
        <div className="container">
          <h2 className="section-title">Featured <span>Albums</span></h2>
          <div className="albums-list">
            {albums.slice(0, 10).map(album => (
              <div key={album.id} className="album-card">
                <div className="album-img">
                  <Link to="/home"><img src={album.image} alt={album.title} /></Link>
                </div>
                <div className="album-info">
                  <h3>{album.title}</h3>
                  <p>{album.subtitle}</p>
                  <div className="album-play">
                    <span>10 Tracks</span>
                    <Link to="/home" className="play-button"><i className="fas fa-play"></i></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Artists */}
      <section className="artists fade-in" id="artists">
        <div className="container">
          <h2 className="section-title"><span>Artists</span></h2>
          <div className="artists-list">
            {artists.slice(0, 10).map(artist => (
              <div key={artist.id} className="artist-card">
                <div className="artist-img">
                  <Link to="/home"><img src={artist.image} alt={artist.title} /></Link>
                </div>
                <h3>{artist.title}</h3>
                <p>{artist.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="tracks fade-in" id="tracks">
        <div className="container">
          <h2 className="section-title"><span>Tracks</span></h2>
          <div className="tracks-grid">
            <div className="track-column">
              <h3>Top Tracks</h3>
              <div className="track-list">
                <div className="track-item">
                  <img src="/images/astarr.jpg" alt="Top Track 1" />
                  <div className="track-info">
                    <h4>Astarr</h4>
                    <p>Prem Dhillon</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/A_for_Arjan2.jpg" alt="Top Track 2" />
                  <div className="track-info">
                    <h4>Aprodhite</h4>
                    <p>Arjan Dhillon</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/alpha.jpg" alt="Top Track 3" />
                  <div className="track-info">
                    <h4>Jimmewari</h4>
                    <p>Jordan Sandhu</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/paper_before_money.jpg" alt="Top Track 4" />
                  <div className="track-info">
                    <h4>Paper Before Money</h4>
                    <p>Navaan Sandhu</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/raonak.jpg" alt="Top Track 5" />
                  <div className="track-info">
                    <h4>Raonak</h4>
                    <p>Hustinder</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="track-column">
              <h3>Latest Tracks</h3>
              <div className="track-list">
                <div className="track-item">
                  <img src="/images/join_us.jpg" alt="Latest Track 1" />
                  <div className="track-info">
                    <h4>Join Us</h4>
                    <p>Jass Bajwa</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/stag_entry.jpg" alt="Latest Track 2" />
                  <div className="track-info">
                    <h4>Stag Entry</h4>
                    <p>Cheema Y</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/daytona.jpg" alt="Latest Track 3" />
                  <div className="track-info">
                    <h4>Daytona</h4>
                    <p>Kran Aujla</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/wonders.jpg" alt="Latest Track 4" />
                  <div className="track-info">
                    <h4>Wonders</h4>
                    <p>Nimrat Khaira</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
                <div className="track-item">
                  <img src="/images/be_mine.jpg" alt="Latest Track 5" />
                  <div className="track-info">
                    <h4>Be Mine</h4>
                    <p>Shubh</p>
                  </div>
                  <Link to="/home" className="play-button-tracks">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Flipping Cards */}
      <section className="features fade-in" id="features">
        <div className="container">
          <h2 className="section-title"><span>Features</span></h2>
          <div className="features-list">
            <div className="feature-card flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <i className="fas fa-music feature-icon"></i>
                  <h3>Vast Library</h3>
                  <p>Access millions of tracks across all genres.</p>
                </div>
                <div className="flip-card-back">
                  <h3>Endless Music</h3>
                  <p>Our library is constantly updated with the latest hits and classic albums for every taste.</p>
                </div>
              </div>
            </div>

            <div className="feature-card flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <i className="fas fa-headphones feature-icon"></i>
                  <h3>High Fidelity</h3>
                  <p>Stream music in lossless quality.</p>
                </div>
                <div className="flip-card-back">
                  <h3>Crisp Audio</h3>
                  <p>Enjoy every detail of the music with our premium audio quality. Hear it the way the artist intended.</p>
                </div>
              </div>
            </div>

            <div className="feature-card flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <i className="fas fa-compact-disc feature-icon"></i>
                  <h3>Personalized Playlists</h3>
                  <p>Discover new music tailored just for you.</p>
                </div>
                <div className="flip-card-back">
                  <h3>Smart Recommendations</h3>
                  <p>Our AI learns your taste to create custom playlists you'll love, based on your listening habits.</p>
                </div>
              </div>
            </div>

            <div className="feature-card flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <i className="fas fa-ticket-alt feature-icon"></i>
                  <h3>Live Event Tickets</h3>
                  <p>Buy tickets for concerts and events.</p>
                </div>
                <div className="flip-card-back">
                  <h3>Don't Miss Out</h3>
                  <p>Get instant access to tickets for concerts and festivals from your favorite artists, all in one place.</p>
                </div>
              </div>
            </div>

            <div className="feature-card flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <i className="fas fa-podcast feature-icon"></i>
                  <h3>Exclusive Content</h3>
                  <p>Access exclusive interviews and podcasts.</p>
                </div>
                <div className="flip-card-back">
                  <h3>Beyond the Music</h3>
                  <p>Tune in to exclusive artist interviews, behind-the-scenes content, and original podcasts only on tuneX.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>About tuneX</h3>
              <p>tuneX is your ultimate music destination to discover new artists, stream music, and get tickets to the hottest events.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-spotify"></i></a>
              </div>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#albums">Albums</a></li>
                <li><a href="#artists">Artists</a></li>
                <li><a href="#tracks">Tracks</a></li>
                <li><a href="#features">Features</a></li>
                <li><Link to="/home">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Top Genres</h3>
              <ul>
                <li><Link to="/home">Pop</Link></li>
                <li><Link to="/home">Rock</Link></li>
                <li><Link to="/home">Hip Hop</Link></li>
                <li><Link to="/home">Electronic</Link></li>
                <li><Link to="/home">Jazz</Link></li>
                <li><Link to="/home">R&B</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Newsletter</h3>
              <p>Subscribe to our newsletter for updates on new releases, events, and exclusive content.</p>
              <div className="newsletter">
                <form id="newsletter-form">
                  <input type="email" id="subscriber-email" placeholder="Your Email Address" required />
                  <button type="submit" id="subscribe-button">Subscribe</button>
                </form>
                <p id="subscription-message" style={{ marginTop: '10px', fontWeight: 'bold' }}></p>
              </div>
            </div>
          </div>

          <div className="copyright">
            <p>&copy; 2023 tuneX Music Portal. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
