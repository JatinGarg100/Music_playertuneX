// Global state variables for music playback
let currentAudio = null;
let playbackTimeout = null;
let playbackMessage = null;

let searchResultHighlighted = false; // Flag to indicate a search result is focused/highlighted

// Local Storage Keys
const FAVORITES_KEY = 'tunexFavorites';

/**
 * Initializes global DOM element references.
 */
function initializeGlobals() {
    playbackMessage = document.getElementById('playbackMessage');
}

/**
 * Clears all highlighting from cards.
 */
function clearCardHighlights() {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('matched'));
    searchResultHighlighted = false;
}

/**
 * Pauses the currently playing audio and clears its 'playing' state.
 */
function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        const previousCard = currentAudio.closest('.card');
        if (previousCard) previousCard.classList.remove('playing');
        currentAudio = null;
        hidePlaybackMessage();
    }
}

/**
 * Handles playing/pausing music. Defined on window for inline onclick accessibility.
 * @param {HTMLElement} element The .card or .dropdown-item that was clicked.
 */
window.playAudio = function(element) {
    if (!playbackMessage) initializeGlobals();

    // Immediately stop any ongoing audio when a new play action starts
    stopCurrentAudio();

    let audio = null;
    let title = '';
    let mainCard = null;

    if (!element) return;

    if (element.classList.contains('dropdown-item')) {
        // Dropdown item clicked
        const cardIdentifier = element.getAttribute('data-card-id');
        if (!cardIdentifier) {
            console.error("Dropdown item missing data-card-id");
            showPlaybackMessage("Error: invalid search result.");
            return;
        }

        // Find the main card by data-search-term
        mainCard = document.querySelector(`.card[data-search-term="${cardIdentifier}"]`);
        if (!mainCard) {
            // fallback: try to find by id if identifier is id
            mainCard = document.getElementById(cardIdentifier);
        }

        if (!mainCard) {
            console.error("Could not find main card for playback:", cardIdentifier);
            showPlaybackMessage("Error: Could not locate the song source.");
            return;
        }

        audio = mainCard.querySelector('audio');
        const titleEl = mainCard.querySelector('.card-title');
        title = titleEl ? titleEl.textContent.trim() : 'Unknown track';
    } else if (element.classList.contains('card')) {
        // Main card clicked
        mainCard = element;
        audio = mainCard.querySelector('audio');
        const titleEl = mainCard.querySelector('.card-title');
        title = titleEl ? titleEl.textContent.trim() : 'Unknown track';
    } else {
        // maybe the click came from a nested element; try to get closest card
        const possibleCard = element.closest ? element.closest('.card') : null;
        if (possibleCard) {
            mainCard = possibleCard;
            audio = mainCard.querySelector('audio');
            const titleEl = mainCard.querySelector('.card-title');
            title = titleEl ? titleEl.textContent.trim() : 'Unknown track';
        } else {
            return;
        }
    }

    // Play logic (ensure audio exists)
    if (!audio) {
        showPlaybackMessage(`No audio source for "${title}".`);
        return;
    }

    if (audio.paused) {
        const playPromise = audio.play();
        // handle browsers that return a promise
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.then(() => {
                currentAudio = audio;
                if (mainCard) mainCard.classList.add('playing');
                showPlaybackMessage(`Now playing: "${title}"`);
            }).catch(err => {
                console.error('Playback failed:', err);
                showPlaybackMessage('Playback failed (check audio or autoplay settings).');
            });
        } else {
            // older browsers
            currentAudio = audio;
            if (mainCard) mainCard.classList.add('playing');
            showPlaybackMessage(`Now playing: "${title}"`);
        }
    } else {
        // if already playing (rare because we stop before), stop it
        stopCurrentAudio();
    }
}

/**
 * Displays a temporary message (toast notification) on the screen.
 * @param {string} message The text to display.
 */
function showPlaybackMessage(message) {
    if (!playbackMessage) return;

    clearTimeout(playbackTimeout);
    playbackMessage.textContent = message;
    playbackMessage.style.display = 'block';
    playbackMessage.style.opacity = '1';

    playbackTimeout = setTimeout(() => {
        hidePlaybackMessage();
    }, 3000);
}

/**
 * Hides the temporary message (toast notification).
 */
function hidePlaybackMessage() {
    if (!playbackMessage) return;

    playbackMessage.style.opacity = '0';
    setTimeout(() => {
        playbackMessage.style.display = 'none';
    }, 500);
}

// ----------------------------------------------------
// --- FAVORITES LOGIC (Local Storage & Card State) ---
// ----------------------------------------------------

/**
 * Toggles the favorite status of a card and updates local storage.
 * @param {HTMLElement} cardElement The .card element that contains the favorite button.
 */
window.toggleFavorite = function(cardElement) {
    if (!playbackMessage) initializeGlobals();
    if (!cardElement) return;

    const isFavorited = cardElement.classList.contains('favorited');
    const heartIcon = cardElement.querySelector('.favorite-btn i');
    const cardId = cardElement.id || cardElement.getAttribute('data-id') || null;
    const cardType = cardElement.getAttribute('data-type') || 'song';
    const titleEl = cardElement.querySelector('.card-title');
    const subtitleEl = cardElement.querySelector('.card-subtitle');
    const title = titleEl ? titleEl.textContent.trim() : 'Unknown';
    const subtitle = subtitleEl ? subtitleEl.textContent.trim() : '';

    let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    let message = '';

    if (isFavorited) {
        // Remove from favorites
        cardElement.classList.remove('favorited');
        if (heartIcon) {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
        if (cardId) {
            favorites = favorites.filter(fav => fav.id !== cardId);
        }
        message = `Removed "${title}" from favorites.`;
    } else {
        // Add to favorites
        cardElement.classList.add('favorited');
        if (heartIcon) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        }
        const newFavorite = { id: cardId, type: cardType, title: title, subtitle: subtitle };
        favorites.push(newFavorite);
        message = `Added "${title}" to favorites!`;
    }

    // Save updated favorites back to local storage
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

    // Update UI
    showPlaybackMessage(message);
}

/**
 * Loads favorites from local storage and applies 'favorited' class to the corresponding cards.
 */
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');

    favorites.forEach(fav => {
        if (!fav || !fav.id) return;
        const card = document.getElementById(fav.id);
        if (card) {
            card.classList.add('favorited');
            const icon = card.querySelector('.favorite-btn i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        }
    });
}

// --- Search Dropdown Logic (Runs after DOM Content is loaded) ---

document.addEventListener('DOMContentLoaded', () => {
    // Initialize global element variable once DOM is ready
    initializeGlobals();

    // Load favorites on page load
    loadFavorites();

    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const appContainer = document.querySelector('.app-container');
    const mainContent = document.querySelector('.main-content');
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');
    const searchIcon = document.querySelector('.search-box i');
    const allCards = Array.from(document.querySelectorAll('.card-grid .card'));

    if (!searchInput || !searchDropdown || !searchIcon) {
        console.error("Search elements not found. Search functionality disabled.");
        return;
    }

    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', () => {
            if (appContainer) appContainer.classList.toggle('collapsed');
        });
    }

    function renderSearchResults() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        searchDropdown.innerHTML = ''; // Clear previous results

        // Stop audio and clear highlights when starting a new search
        stopCurrentAudio();
        clearCardHighlights();
        searchResultHighlighted = false;

        if (searchTerm.length < 2) {
            searchDropdown.style.display = 'none';
            if (searchTerm.length > 0) {
                showPlaybackMessage("Enter at least two characters to search.");
            }
            return;
        }

        const filteredCards = allCards.filter(card => {
            const cardData = card.getAttribute('data-search-term') || '';
            return cardData.toLowerCase().includes(searchTerm);
        });

        if (filteredCards.length > 0) {
            filteredCards.slice(0, 10).forEach(card => {
                const titleEl = card.querySelector('.card-title');
                const subtitleEl = card.querySelector('.card-subtitle');
                const title = titleEl ? titleEl.textContent.trim() : 'Unknown';
                const subtitle = subtitleEl ? subtitleEl.textContent.trim() : '';
                const cardType = card.getAttribute('data-type') || 'song';

                let imageElement = card.querySelector('.card-img') || card.querySelector('.artist-img');
                const imageSrc = imageElement ? imageElement.src : '';
                const cardIdentifier = card.getAttribute('data-search-term') || card.id || '';

                const cardTypeDisplay = cardType.charAt(0).toUpperCase() + cardType.slice(1);

                const resultItem = document.createElement('div');
                resultItem.classList.add('dropdown-item');
                resultItem.setAttribute('data-card-id', cardIdentifier);

                const hasAudio = !!card.querySelector('audio');
                const playButtonHtml = hasAudio ? `
                    <button class="dropdown-item-play-btn" onclick="playAudio(this.closest('.dropdown-item'))">
                        <i class="fas fa-play"></i>
                    </button>` : '';

                resultItem.innerHTML = `
                    <img src="${imageSrc}" alt="${cardTypeDisplay}" class="dropdown-item-image" style="border-radius: ${cardType === 'artist' ? '50%' : '5px'};">
                    <div class="dropdown-item-text">
                        <div class="dropdown-item-title">${title}</div>
                        <div class="dropdown-item-subtitle">${cardTypeDisplay} - ${subtitle}</div>
                    </div>
                    ${playButtonHtml}
                `;

                // Add click listener to scroll to the original card (but not when clicking the play button)
                resultItem.addEventListener('click', (event) => {
                    if (event.target.closest('.dropdown-item-play-btn')) return;

                    const originalCard = document.querySelector(`.card[data-search-term="${cardIdentifier}"]`) || document.getElementById(cardIdentifier);
                    if (originalCard) {
                        stopCurrentAudio();
                        clearCardHighlights();
                        originalCard.classList.add('matched');
                        searchResultHighlighted = true;
                        originalCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        showPlaybackMessage(`Scrolled to: "${title}"`);
                    }

                    searchInput.value = title;
                    searchDropdown.style.display = 'none';
                });

                searchDropdown.appendChild(resultItem);
            });

            searchDropdown.style.display = 'block';
        } else {
            searchDropdown.style.display = 'none';
            showPlaybackMessage(`No results found for "${searchTerm}"`);
        }
    }

    // Event listeners
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            renderSearchResults();
        }
    });

    searchIcon.addEventListener('click', () => {
        renderSearchResults();
    });

    searchInput.addEventListener('input', () => {
        renderSearchResults();
        if (searchResultHighlighted) {
            clearCardHighlights();
        }
    });

    if (mainContent) {
        mainContent.addEventListener('scroll', () => {
            if (searchResultHighlighted) {
                clearCardHighlights();
            }
        });
    }

    document.addEventListener('click', (event) => {
        const searchBox = document.querySelector('.search-box');
        if (searchBox && !searchBox.contains(event.target)) {
            searchDropdown.style.display = 'none';
        }
    });
});







// Add these variables at the top with other global variables
let logoutModal = null;

// Update the initializeGlobals function
function initializeGlobals() {
    playbackMessage = document.getElementById('playbackMessage');
    logoutModal = document.getElementById('logoutModal');
}

// Add logout functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    const logoutConfirmBtn = document.getElementById('logoutConfirmBtn');
    const logoutCancelBtn = document.getElementById('logoutCancelBtn');
    
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLogoutModal();
    });
    
    if (logoutConfirmBtn) {
        logoutConfirmBtn.addEventListener('click', performLogout);
    }
    
    if (logoutCancelBtn) {
        logoutCancelBtn.addEventListener('click', hideLogoutModal);
    }
    
    // Close modal when clicking outside
    if (logoutModal) {
        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) {
                hideLogoutModal();
            }
        });
    }
}

function showLogoutModal() {
    if (logoutModal) {
        logoutModal.style.display = 'block';
        // Add a small delay for animation
        setTimeout(() => {
            logoutModal.style.opacity = '1';
        }, 10);
    }
}

function hideLogoutModal() {
    if (logoutModal) {
        logoutModal.style.opacity = '0';
        setTimeout(() => {
            logoutModal.style.display = 'none';
        }, 300);
    }
}

function performLogout() {
    // Stop any playing audio
    stopCurrentAudio();
    
    // Show logout message
    showPlaybackMessage('Logging out...');
    
    // Clear any user data from localStorage (optional)
    // localStorage.removeItem('userSession');
    // localStorage.removeItem('userPreferences');
    
    // Simulate logout process with a delay
    setTimeout(() => {
        // Redirect to login page or homepage
        window.location.href = 'landing.html'; // Change this to your actual login page
        
        // If you don't have a separate login page, you can reload the current page
        // window.location.reload();
    }, 1500);
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initializeGlobals();
    loadFavorites();
    setupLogout(); // Add this line
    
    // ... rest of your existing DOMContentLoaded code
});
