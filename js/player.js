 let currentAudio = null;
        let currentSongItem = null; // Keep track of the <li> element
        let playbackTimeout = null;
        
        // --- Get Elements ---
        const playbackMessage = document.getElementById('playbackMessage');
        
        // Now Playing Bar Elements
        const nowPlayingBar = document.getElementById('nowPlayingBar');
        const nowPlayingCover = document.getElementById('nowPlayingCover');
        const nowPlayingTitle = document.getElementById('nowPlayingTitle');
        const nowPlayingArtist = document.getElementById('nowPlayingArtist');
        const mainPlayPauseBtn = document.getElementById('mainPlayPauseBtn');
        const mainPlayIcon = document.getElementById('mainPlayIcon');
        const mainPauseIcon = document.getElementById('mainPauseIcon');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentTime = document.getElementById('currentTime');
        const totalTime = document.getElementById('totalTime');
        const progressBar = document.getElementById('progressBar');
        const progressBarInner = document.getElementById('progressBarInner');
        const repeatBtn = document.getElementById('repeatBtn');

        // --- Main Function to Play Audio ---
        function playAudio(item) {
            if (!item) return; // Stop if no item is provided
            
            const audio = item.querySelector('audio');
            const title = item.querySelector('.song-title').textContent;

            if (currentAudio && currentAudio === audio) {
                // --- Clicked the SAME song that is playing: PAUSE it ---
                audio.pause();
                item.classList.remove('playing');
                updateMainPlayPauseButton(false); // Show play icon
                hidePlaybackMessage();
                currentAudio = null; 
            } else {
                // --- Clicked a NEW song (or a paused song) ---
                if (currentAudio) {
                    // Stop the old song and remove its listeners
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    currentAudio.removeEventListener('timeupdate', updateProgress);
                    currentAudio.removeEventListener('loadedmetadata', setSongDurationFromMetadata);
                    if (currentSongItem) {
                        currentSongItem.classList.remove('playing');
                    }
                }
                
                // Play the new song
                audio.play().catch(e => console.error("Error playing audio:", e));
                currentAudio = audio;
                currentSongItem = item;
                item.classList.add('playing');
                
                // Update the main bar
                updateNowPlayingInfo(item);
                updateMainPlayPauseButton(true); // Show pause icon
                
                // Show the toast message
                showPlaybackMessage(`Now playing: "${title}"`);

                // --- NEW: Add event listeners for progress bar ---
                audio.addEventListener('timeupdate', updateProgress);
                // Use 'loadedmetadata' to set the ACCURATE duration for calculations
                audio.addEventListener('loadedmetadata', setSongDurationFromMetadata); 
                audio.onended = playNextTrack; // Play next song when this one finishes
            }
        }

        // --- Function for the BIG Play button in the header ---
        function playFirstTrack() {
            const firstTrack = document.querySelector('.song-item');
            if (firstTrack) {
                playAudio(firstTrack);
            }
        }
        
        // --- Function for the MAIN Play/Pause button in the bar ---
        function toggleMainPlay() {
            if (!currentAudio && currentSongItem) {
                // --- A song was paused: RESUME it ---
                playAudio(currentSongItem);
            } else if (!currentAudio && !currentSongItem) {
                // --- Nothing is loaded: Play the FIRST track ---
                playFirstTrack();
            } else if (currentAudio) {
                 // --- A song is actively playing: PAUSE it ---
                currentAudio.pause();
                currentSongItem.classList.remove('playing');
                updateMainPlayPauseButton(false);
                currentAudio = null;
            }
        }
        
        // --- NEW: Next/Previous Track Functions ---
        function playNextTrack() {
            if (!currentSongItem) return;
            const nextItem = currentSongItem.nextElementSibling;
            if (nextItem && nextItem.classList.contains('song-item')) {
                playAudio(nextItem);
            } else {
                // Optional: Go back to first song
                const firstTrack = document.querySelector('.song-item');
                playAudio(firstTrack);
            }
        }

        function playPrevTrack() {
            if (!currentSongItem) return;
            
            if (currentAudio && currentAudio.currentTime > 3) {
                currentAudio.currentTime = 0;
                currentAudio.play(); // BUG FIX
                return;
            }
            
            // Otherwise, go to the previous song
            const prevItem = currentSongItem.previousElementSibling;
            if (prevItem && prevItem.classList.contains('song-item')) {
                playAudio(prevItem);
            }
        }
        
        function repeatSong() {
            if (currentSongItem) {
                const audio = currentSongItem.querySelector('audio');
                audio.currentTime = 0;
                
                // We must ensure it plays, regardless of current state
                if (currentAudio) {
                    // If it was already playing, just let it continue from 0
                    audio.play();
                } else {
                    // If it was paused, call playAudio to handle UI updates
                    playAudio(currentSongItem);
                }
            }
        }

        // --- NEW: Progress Bar and Time Functions ---
        function updateProgress() {
            if (!currentAudio) return;
            const { duration, currentTime: time } = currentAudio;
            if (duration) { // Check if duration is available
                const progressPercent = (time / duration) * 100;
                progressBarInner.style.width = `${progressPercent}%`;
                currentTime.textContent = formatTime(time);
            }
        }

        // This function sets the accurate duration once the audio file metadata loads
        function setSongDurationFromMetadata() {
            if (!currentAudio) return;
            totalTime.textContent = formatTime(currentAudio.duration);
        }

        function seek(e) {
            if (!currentAudio || !currentAudio.duration) return;
            const width = progressBar.clientWidth;
            const clickX = e.offsetX;
            const duration = currentAudio.duration;
            currentAudio.currentTime = (clickX / width) * duration;
        }
        
        // --- NEW: Helper function to format time (e.g., 129 -> "2:09") ---
        function formatTime(seconds) {
            if (isNaN(seconds)) {
                return "0:00"; // Handle cases where duration isn't ready
            }
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // --- Helper function to update the bar's info ---
        function updateNowPlayingInfo(item) {
            const title = item.querySelector('.song-title').textContent;
            const coverSrc = item.querySelector('.song-album-cover img').src;
            const artist = document.querySelector('.album-artist-details a').textContent; 
            const durationText = item.querySelector('.song-duration').textContent;

            nowPlayingCover.src = coverSrc;
            nowPlayingTitle.textContent = title;
            nowPlayingArtist.textContent = artist;
            
            // Set the totalTime text immediately from the HTML list
            totalTime.textContent = durationText; 
            currentTime.textContent = "0:00"; // Reset current time
            progressBarInner.style.width = "0%"; // Reset progress bar
            
            nowPlayingBar.classList.add('active'); // Show the bar
        }

        // --- Helper function to toggle the main bar's button icon ---
        function updateMainPlayPauseButton(isPlaying) {
            if (isPlaying) {
                mainPlayIcon.style.display = 'none';
                mainPauseIcon.style.display = 'block';
            } else {
                mainPlayIcon.style.display = 'block';
                mainPauseIcon.style.display = 'none';
            }
        }

        // --- Attach Listeners ---
        mainPlayPauseBtn.addEventListener('click', toggleMainPlay);
        nextBtn.addEventListener('click', playNextTrack);
        prevBtn.addEventListener('click', playPrevTrack);
        progressBar.addEventListener('click', seek);
        repeatBtn.addEventListener('click', repeatSong);

        // --- Toast Message Functions (Unchanged) ---
        function showPlaybackMessage(message) {
            clearTimeout(playbackTimeout);
            playbackMessage.textContent = message;
            playbackMessage.style.display = 'block';
            playbackMessage.style.opacity = '1';
            playbackTimeout = setTimeout(() => {
                hidePlaybackMessage();
            }, 3000);
        }

        function hidePlaybackMessage() {
            playbackMessage.style.opacity = '0';
            setTimeout(() => {
                playbackMessage.style.display = 'none';
            }, 500);
        }