document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        });
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'false') {
        document.documentElement.classList.remove('dark');
    }
});

// Game rating system
function rateGame(gameId, rating) {
    console.log(`Rating game ${gameId} with ${rating} stars`);
    // In a real app, this would send data to your backend
}

// Search functionality
function searchGames(query) {
    console.log(`Searching for: ${query}`);
    // In a real app, this would fetch search results from your API
}