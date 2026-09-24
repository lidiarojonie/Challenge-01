// js/app.js

const recentSongs = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 2, title: 'Hotel California', artist: 'Eagles' },
    { id: 3, title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
    { id: 4, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses' },
];

const mockSongs = [
    { id: 5, title: 'Midnight City', artist: 'M83' },
    { id: 6, title: 'Starboy', artist: 'The Weeknd' },
    { id: 7, title: 'Blinding Lights', artist: 'The Weeknd' },
    { id: 8, title: 'As It Was', artist: 'Harry Styles' },
    { id: 9, title: 'Levitating', artist: 'Dua Lipa' },
    { id: 10, title: 'Bad Guy', artist: 'Billie Eilish' },
    { id: 11, title: 'Shape of You', artist: 'Ed Sheeran' },
    { id: 12, title: 'Uptown Funk', artist: 'Mark Ronson' },
];

const mixes = [
    { id: 13, title: 'Daily Mix 1', artist: 'Hecho para ti' },
    { id: 14, title: 'LoFi Beats', artist: 'Relájate y estudia' },
    { id: 15, title: 'Descubrimiento', artist: 'Nuevas canciones' },
    { id: 16, title: 'Radar de Novedades', artist: 'Lanzamientos' },
];

document.addEventListener('DOMContentLoaded', () => {
    const recentGrid = document.getElementById('recent-grid');
    const musicGrid = document.getElementById('music-grid');
    const mixesGrid = document.getElementById('mixes-grid');
    
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progress = document.getElementById('progress');
    const currentTitle = document.getElementById('current-title');
    const currentArtist = document.getElementById('current-artist');
    
    let isPlaying = false;
    let progressInterval;
    let currentProgress = 0;

    // Helper to create and append cards
    function populateGrid(data, container) {
        data.forEach(song => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img-placeholder">
                    <i class="fas fa-music"></i>
                </div>
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            `;
            
            card.addEventListener('click', () => {
                currentTitle.textContent = song.title;
                currentArtist.textContent = song.artist;
                if (!isPlaying) {
                    togglePlay();
                }
                // Reset progress
                currentProgress = 0;
                progress.style.width = '0%';
            });
            
            container.appendChild(card);
        });
        
        setupCarousel(container);
    }

    // Carousel logic
    function setupCarousel(container) {
        const section = container.closest('.content-section');
        const prevBtn = section.querySelector('.prev');
        const nextBtn = section.querySelector('.next');
        
        // Scroll amount is roughly two cards + gaps
        const scrollAmount = 410; 

        function updateButtons() {
            // Check if container has overflow
            if (container.scrollWidth > container.clientWidth) {
                prevBtn.classList.add('visible');
                nextBtn.classList.add('visible');
                
                // Disable prev if at start
                prevBtn.disabled = container.scrollLeft <= 0;
                // Disable next if at end
                // Use a small threshold (1px) for floating point precision
                nextBtn.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
            } else {
                prevBtn.classList.remove('visible');
                nextBtn.classList.remove('visible');
            }
        }

        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        container.addEventListener('scroll', updateButtons);
        // Also update on window resize
        window.addEventListener('resize', updateButtons);
        
        // Initial check (needs a small delay so DOM can finish rendering layout)
        setTimeout(updateButtons, 100);
    }

    // Load all mock data
    populateGrid(recentSongs, recentGrid);
    populateGrid(mockSongs, musicGrid);
    populateGrid(mixes, mixesGrid);

    // Play/Pause functionality
    function togglePlay() {
        isPlaying = !isPlaying;
        const icon = playPauseBtn.querySelector('i');
        
        if (isPlaying) {
            icon.className = 'fas fa-pause';
            // Simulate progress
            progressInterval = setInterval(() => {
                if (currentProgress < 100) {
                    currentProgress += 1;
                    progress.style.width = `${currentProgress}%`;
                } else {
                    currentProgress = 0;
                    progress.style.width = '0%';
                }
            }, 1000); // Update every second
        } else {
            icon.className = 'fas fa-play';
            clearInterval(progressInterval);
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);
});

