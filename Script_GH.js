/* =========================================================
    Script_GH.js
    Gerenciamento global de autenticação do GameHub / GameLab
    Controle de login, cadastro, sessão e UI
   ========================================================= */

/* ---------------------------------------------------------
    ESTADO GLOBAL DA APLICAÇÃO
    Guarda informações do usuário e do modal de autenticação
--------------------------------------------------------- */
const state = {
    user: null, // Usuário logado (null se não houver sessão)
    authModal: {
        visible: false, // Modal de login/cadastro está visível?
        mode: 'login'   // Modo atual: 'login' ou 'signup'
    }
};

/* ---------------------------------------------------------
    DOM CONTENT LOADED
    Executa quando todo o HTML estiver carregado
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

    // Verifica se existe uma sessão salva no navegador
    const savedUser = localStorage.getItem('gamehub_user');

    if (savedUser) {
        // Recupera usuário salvo
        state.user = JSON.parse(savedUser);

        // Atualiza interface para usuário logado
        updateUIForLoggedInUser();
    }

    // Inicializa funcionamento do modal de autenticação
    initAuthModal();
});

/* ---------------------------------------------------------
    ATUALIZA A INTERFACE QUANDO O USUÁRIO ESTÁ LOGADO
    Envia dados para o componente custom-navbar
--------------------------------------------------------- */
function updateUIForLoggedInUser() {
    const navbar = document.querySelector('custom-navbar');

    if (navbar && state.user) {
        navbar.setAttribute('logged-in', 'true');         // Flag de login
        navbar.setAttribute('username', state.user.username); // Nome exibido
        navbar.setAttribute('profile', state.user.profile);   // Perfil do usuário
    }
}

/* ---------------------------------------------------------
    FUNÇÃO DE LOGIN
    Simula uma chamada de API (Promise + setTimeout)
--------------------------------------------------------- */
function handleLogin(email, password) {
    return new Promise((resolve, reject) => {

        // Simula tempo de resposta do servidor
        setTimeout(() => {

            if (email && password) {
                // Cria objeto do usuário
                const user = {
                    email,
                    username: email.split('@')[0], // Usa parte do email como username
                    profile:
                        document
                            .querySelector('custom-auth-modal')
                            ?.getAttribute('profile') || 'gamer'
                };

                // Salva usuário no estado global
                state.user = user;

                // Persiste sessão no navegador
                localStorage.setItem('gamehub_user', JSON.stringify(user));

                resolve(user);
            } else {
                reject(new Error('Email and password are required'));
            }
        }, 1000);
    });
}

/* ---------------------------------------------------------
    FUNÇÃO DE CADASTRO (SIGNUP)
    Também simula chamada de API
--------------------------------------------------------- */
function handleSignup(email, password, profile) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (email && password && profile) {
                const user = {
                    email,
                    username: email.split('@')[0],
                    profile
                };

                // Atualiza estado global
                state.user = user;

                // Salva sessão
                localStorage.setItem('gamehub_user', JSON.stringify(user));

                resolve(user);
            } else {
                reject(new Error('All fields are required'));
            }
        }, 1500);
    });
}

/* ---------------------------------------------------------
    LOGOUT
    Remove sessão, limpa navbar e redireciona
--------------------------------------------------------- */
function handleLogout() {
    state.user = null;

    // Remove dados do navegador
    localStorage.removeItem('gamehub_user');

    // Limpa atributos da navbar
    const navbar = document.querySelector('custom-navbar');
    if (navbar) {
        navbar.removeAttribute('logged-in');
        navbar.removeAttribute('username');
        navbar.removeAttribute('profile');
    }

    // Redireciona para página inicial
    window.location.href = '/';
}

/* ---------------------------------------------------------
    INICIALIZA O MODAL DE AUTENTICAÇÃO
    Escuta eventos personalizados: login, signup e close
--------------------------------------------------------- */
function initAuthModal() {
    const modal = document.querySelector('custom-auth-modal');

    /* -------- LOGIN -------- */
    modal.addEventListener('login', async (e) => {
        const { email, password } = e.detail;

        try {
            await handleLogin(email, password);

            // Fecha o modal
            modal.setAttribute('visible', 'false');

            // Atualiza a interface
            updateUIForLoggedInUser();

            // Redireciona para dashboard
            window.location.href = '/dashboard.html';

        } catch (error) {
            // Exibe erro no modal
            modal.setAttribute('error', error.message);
        }
    });

    /* -------- SIGNUP -------- */
    modal.addEventListener('signup', async (e) => {
        const { email, password, profile } = e.detail;

        try {
            await handleSignup(email, password, profile);

            modal.setAttribute('visible', 'false');
            updateUIForLoggedInUser();

            window.location.href = '/dashboard.html';

        } catch (error) {
            modal.setAttribute('error', error.message);
        }
    });

    /* -------- FECHAR MODAL -------- */
    modal.addEventListener('close', () => {
        modal.setAttribute('visible', 'false');
    });
}

/* ---------------------------------------------------------
    FUNÇÃO UTILITÁRIA
    Redireciona para dashboard se estiver logado
--------------------------------------------------------- */
function redirectToDashboard() {
    if (state.user) {
        window.location.href = '/dashboard.html';
    }
}
