import { useMusicContext } from '../contexts/MusicContext';

const PlaybackMessage = () => {
  const { playbackMessage } = useMusicContext();

  if (!playbackMessage) return null;

  return (
    <div className="playback-message" id="playbackMessage">
      {playbackMessage}
    </div>
  );
};

export default PlaybackMessage;
