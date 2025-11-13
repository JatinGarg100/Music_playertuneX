# 🎵 TuneX - React Music Player

A modern, fully-featured music player application built with React, Vite, and React Router.

## ✨ Features

- 🎵 **Music Playback** - Play songs, albums, and artist tracks
- ❤️ **Favorites System** - Save your favorite songs, albums, and artists
- 🔍 **Smart Search** - Real-time search with dropdown results
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 💾 **Persistent Storage** - Favorites saved to localStorage
- 🎯 **Intuitive Navigation** - Collapsible sidebar with active route highlighting

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Installation

1. **Navigate to the project**

```bash
cd react-tunex
```

2. **Install dependencies**

```bash
npm install
```

3. **Copy your music assets** (IMPORTANT!)

You need to copy the `images` and `songs` folders from your original Music_playertuneX project:

```bash
# Copy from parent directory
cp -r ../images public/
cp -r ../songs public/
```

Or manually:
- Copy `Music_playertuneX/images/` → `react-tunex/public/images/`
- Copy `Music_playertuneX/songs/` → `react-tunex/public/songs/`

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to `http://localhost:5173`

## 📁 Project Structure

```
react-tunex/
├── public/              # Static assets
│   ├── images/         # Album/Artist/Song cover images
│   └── songs/          # MP3 audio files
├── src/
│   ├── components/     # Reusable React components
│   ├── contexts/       # State management (Music & Favorites)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Route components
│   ├── styles/         # Global CSS
│   └── App.jsx         # Main application
└── index.html          # HTML entry point
```

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Styling with CSS variables
- **Font Awesome** - Icons

## 🎮 Usage

### Navigation

- **Home** - Main dashboard with featured content
- **Artists** - Browse all artists
- **Albums** - View album collection
- **Favorites** - Access your saved songs, albums, and artists
- **Search** - Type in the search bar to find content

### Playing Music

1. Hover over any card to see controls
2. Click the **play button** to start playback
3. Click the **heart icon** to add to favorites
4. Currently playing track is highlighted

### Managing Favorites

- Click the heart icon on any song/album/artist
- Access favorites from the sidebar menu
- Favorites are automatically saved to browser storage

## 📦 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📚 Documentation

For detailed migration information and architecture decisions, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

---

Made with ❤️ using React and Vite

**🎵 Happy Listening! 🎵**
