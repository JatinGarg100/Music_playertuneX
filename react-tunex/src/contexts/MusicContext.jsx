import { createContext, useContext, useState, useRef } from 'react';

const MusicContext = createContext();

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playbackMessage, setPlaybackMessage] = useState('');
  const audioRef = useRef(null);

  const showPlaybackMessage = (message) => {
    setPlaybackMessage(message);
    setTimeout(() => {
      setPlaybackMessage('');
    }, 3000);
  };

  const playAudio = (track) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // If same track, just toggle play/pause
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    // Play new track
    setCurrentTrack(track);
    setIsPlaying(true);

    if (track.audioSrc) {
      const audio = new Audio(track.audioSrc);
      audioRef.current = audio;

      audio.play()
        .then(() => {
          showPlaybackMessage(`Now playing: "${track.title}"`);
        })
        .catch(err => {
          console.error('Playback failed:', err);
          showPlaybackMessage('Playback failed (check audio or autoplay settings).');
          setIsPlaying(false);
        });
    } else {
      showPlaybackMessage(`No audio source for "${track.title}".`);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const value = {
    currentAudio,
    isPlaying,
    currentTrack,
    playbackMessage,
    playAudio,
    stopAudio,
    showPlaybackMessage
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};
