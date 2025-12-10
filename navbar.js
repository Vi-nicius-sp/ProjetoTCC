class CustomNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['logged-in', 'username', 'profile'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const loggedIn = this.hasAttribute('logged-in');
        const username = this.getAttribute('username') || '';
        const profile = this.getAttribute('profile') || 'gamer';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: rgba(10, 14, 23, 0.9);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 240, 255, 0.1);
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-decoration: none;
                    color: white;
                }
                
                .logo-icon {
                    margin-right: 0.5rem;
                    color: var(--primary);
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .nav-link {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                    position: relative;
                }
                
                .nav-link:hover {
                    color: var(--primary);
                }
                
                .nav-link.active {
                    color: var(--primary);
                }
                
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: var(--primary);
                    border-radius: 2px;
                }
                
                .auth-buttons {
                    display: flex;
                    gap: 1rem;
                }
                
                .login-btn {
                    padding: 0.5rem 1.5rem;
                    border-radius: 9999px;
                    border: 1px solid var(--primary);
                    color: var(--primary);
                    background: transparent;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .login-btn:hover {
                    background: var(--primary);
                    color: var(--dark);
                }
                
                .signup-btn {
                    padding: 0.5rem 1.5rem;
                    border-radius: 9999px;
                    background: linear-gradient(to right, var(--primary), var(--secondary));
                    color: var(--dark);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .signup-btn:hover {
                    opacity: 0.9;
                }
                
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    position: relative;
                }
                
                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(to right, var(--primary), var(--secondary));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--dark);
                    font-weight: bold;
                    cursor: pointer;
                }
                
                .dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: var(--darker);
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    min-width: 200px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    display: none;
                    z-index: 10;
                }
                
                .dropdown.show {
                    display: block;
                }
                
                .dropdown-item {
                    display: block;
                    padding: 0.5rem 0;
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .dropdown-item:hover {
                    color: var(--primary);
                }
                
                .profile-badge {
                    padding: 0.25rem 0.5rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    background: ${profile === 'creator' ? 'var(--primary)' : 'var(--secondary)'};
                    color: var(--dark);
                }
                
                @media (max-width: 768px) {
                    .container {
                        padding: 1rem;
                    }
                    
                    .nav-links {
                        display: none;
                    }
                }
            </style>
            
            <div class="container">
                <a href="/" class="logo">
                    <i data-feather="cpu" class="logo-icon"></i>
                    <span>Neon Nexus</span>
                </a>
                
                <div class="nav-links">
                    <a href="/gamelab.html" class="nav-link">GameLab</a>
                    <a href="/gameseek.html" class="nav-link">GameSeek</a>
                    <a href="/news.html" class="nav-link">News</a>
                    <a href="/events.html" class="nav-link">Events</a>
                    <a href="/about.html" class="nav-link">About</a>
                </div>
                
                ${loggedIn ? `
                    <div class="user-menu">
                        <span class="profile-badge">${profile === 'creator' ? 'Creator' : 'Gamer'}</span>
                        <div class="avatar" onclick="this.nextElementSibling.classList.toggle('show')">
                            ${username.charAt(0).toUpperCase()}
                        </div>
                        <div class="dropdown">
                            <a href="/dashboard.html" class="dropdown-item">
                                <i data-feather="home"></i> Dashboard
                            </a>
                            <a href="/profile.html" class="dropdown-item">
                                <i data-feather="user"></i> Profile
                            </a>
                            ${profile === 'creator' ? `
                                <a href="/creator-dashboard.html" class="dropdown-item">
                                    <i data-feather="code"></i> Creator Studio
                                </a>
                            ` : ''}
                            <a href="/settings.html" class="dropdown-item">
                                <i data-feather="settings"></i> Settings
                            </a>
                            <div class="border-t border-gray-700 my-2"></div>
                            <a href="#" class="dropdown-item" onclick="handleLogout()">
                                <i data-feather="log-out"></i> Sign Out
                            </a>
                        </div>
                    </div>
                ` : `
                    <div class="auth-buttons">
                        <button class="login-btn" onclick="openAuthModal('login')">Sign In</button>
                        <button class="signup-btn" onclick="openAuthModal('signup')">Join Now</button>
                    </div>
                `}
            </div>
        `;
        
        // Replace feather icons after rendering
        if (this.shadowRoot.querySelector('[data-feather]')) {
            feather.replace();
        }
    }
}

customElements.define('custom-navbar', CustomNavbar);