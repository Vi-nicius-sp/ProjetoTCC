class CustomFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--darker);
                    border-top: 1px solid rgba(0, 240, 255, 0.1);
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 3rem;
                }
                
                .footer-logo {
                    display: flex;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: white;
                    text-decoration: none;
                }
                
                .footer-logo-icon {
                    margin-right: 0.5rem;
                    color: var(--primary);
                }
                
                .footer-description {
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                }
                
                .social-link {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.6);
                    transition: all 0.2s;
                }
                
                .social-link:hover {
                    background: var(--primary);
                    color: var(--dark);
                }
                
                .footer-heading {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: white;
                }
                
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .footer-link {
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-link:hover {
                    color: var(--primary);
                }
                
                .footer-bottom {
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 2rem;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                        padding: 3rem 1.5rem;
                    }
                }
            </style>
            
            <div class="footer-container">
                <div>
                    <a href="/" class="footer-logo">
                        <i data-feather="cpu" class="footer-logo-icon"></i>
                        <span>Neon Nexus</span>
                    </a>
                    <p class="footer-description">
                        The ultimate gaming ecosystem where creation meets discovery. Join our community of developers and gamers today!
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-link">
                            <i data-feather="twitter"></i>
                        </a>
                        <a href="#" class="social-link">
                            <i data-feather="instagram"></i>
                        </a>
                        <a href="#" class="social-link">
                            <i data-feather="discord"></i>
                        </a>
                        <a href="#" class="social-link">
                            <i data-feather="youtube"></i>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h3 class="footer-heading">GameLab</h3>
                    <div class="footer-links">
                        <a href="#" class="footer-link">Courses</a>
                        <a href="#" class="footer-link">Tutorials</a>
                        <a href="#" class="footer-link">Resources</a>
                        <a href="#" class="footer-link">Mentorship</a>
                        <a href="#" class="footer-link">Showcase</a>
                    </div>
                </div>
                
                <div>
                    <h3 class="footer-heading">GameSeek</h3>
                    <div class="footer-links">
                        <a href="#" class="footer-link">Discover</a>
                        <a href="#" class="footer-link">Rankings</a>
                        <a href="#" class="footer-link">Reviews</a>
                        <a href="#" class="footer-link">Collections</a>
                        <a href="#" class="footer-link">Wishlist</a>
                    </div>
                </div>
                
                <div>
                    <h3 class="footer-heading">Company</h3>
                    <div class="footer-links">
                        <a href="#" class="footer-link">About Us</a>
                        <a href="#" class="footer-link">Careers</a>
                        <a href="#" class="footer-link">Blog</a>
                        <a href="#" class="footer-link">Press</a>
                        <a href="#" class="footer-link">Contact</a>
                    </div>
                </div>
                
                <div>
                    <h3 class="footer-heading">Legal</h3>
                    <div class="footer-links">
                        <a href="#" class="footer-link">Terms</a>
                        <a href="#" class="footer-link">Privacy</a>
                        <a href="#" class="footer-link">Cookies</a>
                        <a href="#" class="footer-link">Guidelines</a>
                        <a href="#" class="footer-link">Licenses</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                &copy; ${new Date().getFullYear()} Neon Nexus GameHub. All rights reserved.
            </div>
        `;
        
        // Replace feather icons after rendering
        if (this.shadowRoot.querySelector('[data-feather]')) {
            feather.replace();
        }
    }
}

customElements.define('custom-footer', CustomFooter);