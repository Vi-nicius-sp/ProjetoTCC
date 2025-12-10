class CustomAuthModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['visible', 'mode', 'error', 'profile'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const visible = this.getAttribute('visible') === 'true';
        const mode = this.getAttribute('mode') || 'login';
        const error = this.getAttribute('error') || '';
        const profile = this.getAttribute('profile') || 'gamer';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: ${visible ? 'block' : 'none'};
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 9999;
                    background: rgba(5, 10, 18, 0.9);
                    backdrop-filter: blur(5px);
                }
                
                .modal-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    max-width: 450px;
                    background: var(--dark);
                    border-radius: 1rem;
                    overflow: hidden;
                    border: 1px solid rgba(0, 240, 255, 0.2);
                    box-shadow: 0 25px 50px -12px rgba(0, 240, 255, 0.1);
                }
                
                .modal-header {
                    padding: 1.5rem;
                    background: linear-gradient(to right, var(--primary), var(--secondary));
                    color: var(--dark);
                    text-align: center;
                    position: relative;
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: transparent;
                    border: none;
                    color: var(--dark);
                    cursor: pointer;
                }
                
                .modal-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                }
                
                .modal-body {
                    padding: 2rem;
                }
                
                .form-group {
                    margin-bottom: 1.5rem;
                }
                
                .form-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.8);
                }
                
                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.2s;
                }
                
                .form-input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2);
                }
                
                .profile-selector {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                
                .profile-option {
                    flex: 1;
                    padding: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .profile-option:hover {
                    border-color: var(--primary);
                }
                
                .profile-option.selected {
                    border-color: var(--primary);
                    background: rgba(0, 240, 255, 0.1);
                }
                
                .profile-icon {
                    margin-bottom: 0.5rem;
                    color: var(--primary);
                }
                
                .profile-option.selected .profile-icon {
                    color: white;
                }
                
                .submit-btn {
                    width: 100%;
                    padding: 0.75rem;
                    background: linear-gradient(to right, var(--primary), var(--secondary));
                    border: none;
                    border-radius: 0.5rem;
                    color: var(--dark);
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .submit-btn:hover {
                    opacity: 0.9;
                }
                
                .toggle-mode {
                    text-align: center;
                    margin-top: 1.5rem;
                    color: rgba(255, 255, 255, 0.6);
                }
                
                .toggle-link {
                    color: var(--primary);
                    cursor: pointer;
                    text-decoration: none;
                }
                
                .toggle-link:hover {
                    text-decoration: underline;
                }
                
                .error-message {
                    color: #ff6b6b;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                
                @media (max-width: 480px) {
                    .modal-container {
                        width: 95%;
                    }
                }
            </style>
            
            <div class="modal-container">
                <div class="modal-header">
                    <button class="modal-close" onclick="this.parentElement.parentElement.host.setAttribute('visible', 'false')">
                        <i data-feather="x"></i>
                    </button>
                    <h2 class="modal-title">
                        ${mode === 'login' ? 'Welcome Back' : 'Join Neon Nexus'}
                    </h2>
                </div>
                
                <div class="modal-body">
                    ${error ? `<div class="error-message">${error}</div>` : ''}
                    
                    <form id="auth-form">
                        ${mode === 'signup' ? `
                            <div class="profile-selector">
                                <div class="profile-option ${profile === 'gamer' ? 'selected' : ''}" onclick="this.parentElement.querySelectorAll('.profile-option').forEach(el => el.classList.remove('selected')); this.classList.add('selected'); this.closest('custom-auth-modal').setAttribute('profile', 'gamer')">
                                    <i data-feather="gamepad" class="profile-icon"></i>
                                    <div>Gamer</div>
                                </div>
                                <div class="profile-option ${profile === 'creator' ? 'selected' : ''}" onclick="this.parentElement.querySelectorAll('.profile-option').forEach(el => el.classList.remove('selected')); this.classList.add('selected'); this.closest('custom-auth-modal').setAttribute('profile', 'creator')">
                                    <i data-feather="code" class="profile-icon"></i>
                                    <div>Creator</div>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="form-group">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" id="email" class="form-input" placeholder="your@email.com" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-input" placeholder="••••••••" required minlength="6">
                        </div>
                        
                        ${mode === 'signup' ? `
                            <div class="form-group">
                                <label for="confirm-password" class="form-label">Confirm Password</label>
                                <input type="password" id="confirm-password" class="form-input" placeholder="••••••••" required minlength="6">
                            </div>
                        ` : ''}
                        
                        <button type="submit" class="submit-btn">
                            ${mode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>
                    
                    <div class="toggle-mode">
                        ${mode === 'login' ? 
                            'New to Neon Nexus? ' : 
                            'Already have an account? '}
                        <a class="toggle-link" onclick="this.closest('custom-auth-modal').setAttribute('mode', '${mode === 'login' ? 'signup' : 'login'}'); this.closest('custom-auth-modal').removeAttribute('error')">
                            ${mode === 'login' ? 'Create an account' : 'Sign in'}
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Add form submission handler
        const form = this.shadowRoot.getElementById('auth-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = this.shadowRoot.getElementById('email').value;
                const password = this.shadowRoot.getElementById('password').value;
                
                if (mode === 'login') {
                    const event = new CustomEvent('login', {
                        detail: { email, password }
                    });
                    this.dispatchEvent(event);
                } else {
                    const confirmPassword = this.shadowRoot.getElementById('confirm-password').value;
                    if (password !== confirmPassword) {
                        this.setAttribute('error', 'Passwords do not match');
                        return;
                    }
                    
                    const event = new CustomEvent('signup', {
                        detail: { email, password, profile }
                    });
                    this.dispatchEvent(event);
                }
            });
        }
        
        // Replace feather icons after rendering
        if (this.shadowRoot.querySelector('[data-feather]')) {
            feather.replace();
        }
    }
}

customElements.define('custom-auth-modal', CustomAuthModal);