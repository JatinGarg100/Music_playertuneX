import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MusicProvider } from './contexts/MusicContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  return (
    <MusicProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            {/* Landing page as main entry */}
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard routes with sidebar/header layout */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/favorites/:type" element={<Favorites />} />
              <Route path="/about" element={<div style={{padding: '100px'}}>About Us Page - Coming Soon!</div>} />
              <Route path="/contact" element={<div style={{padding: '100px'}}>Contact Us Page - Coming Soon!</div>} />
            </Route>

            {/* Redirect any unknown routes to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </MusicProvider>
  );
}

export default App;
