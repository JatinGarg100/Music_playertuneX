import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>About Tune<span>X</span></h3>
            <p>
              Tunex is your ultimate music destination to discover new artists,
              stream music, and get tickets to the hottest events.
            </p>
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
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/artists">Artists</Link></li>
              <li><Link to="/albums">Albums</Link></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">News</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Top Genres</h3>
            <ul>
              <li><a href="#">Pop</a></li>
              <li><a href="#">Rock</a></li>
              <li><a href="#">Hip Hop</a></li>
              <li><a href="#">Electronic</a></li>
              <li><a href="#">Jazz</a></li>
              <li><a href="#">R&B</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>
              Subscribe to our newsletter for updates on new releases, events,
              and exclusive content.
            </p>
            <div className="newsletter">
              <form action="#">
                <input type="email" placeholder="Your Email Address" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2023 Tunex Music Portal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
