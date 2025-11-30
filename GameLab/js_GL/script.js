
/* ============================================================
   script.js — Funções interativas para o site GameLab
   ============================================================

   ✅ Este arquivo contém:
   - Alternar modo claro/escuro (com salvamento no navegador)
   - Menu responsivo (abre/fecha no mobile)
   - Botão "Voltar ao topo"
   - Animações suaves ao rolar a página
   - Busca simples de cursos
   ============================================================ */

// =============================
// 🌙 Alternar modo escuro/claro
// =============================
/* const themeToggle = document.getElementById("theme-toggle");

function setTheme(mode) {
  document.body.classList.toggle("dark-mode", mode === "dark");
  themeToggle.innerHTML = mode === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", mode);
}

// Define o tema salvo ao carregar
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// Alterna tema ao clicar
themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark-mode")
    ? "light"
    : "dark";
  setTheme(newTheme);
});

// =============================
// 📱 Menu responsivo (mobile)
// =============================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
  navLinks.classList.toggle("flex");
  navLinks.classList.toggle("flex-col");
  navLinks.classList.toggle("absolute");
  navLinks.classList.toggle("top-16");
  navLinks.classList.toggle("right-4");
  navLinks.classList.toggle("bg-slate-800");
  navLinks.classList.toggle("p-4");
  navLinks.classList.toggle("rounded-lg");
  navLinks.classList.toggle("shadow-xl");
  navLinks.classList.toggle("space-y-4");
  navLinks.classList.toggle("space-x-0");
});

// =============================
// 🔝 Botão "voltar ao topo"
// =============================
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =============================
// ✨ Animações de entrada suave
// =============================
const revealElements = document.querySelectorAll("h2, p, a, .card, pre");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// =============================
// 🔍 Busca simples de cursos
// =============================
const searchInput = document.querySelector("#searchInput");

if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      window.location.href = `area_cursos.html?q=${searchInput.value.trim()}`;
    }
  });
}

// =============================
// 🖼️ Feather icons
// =============================
feather.replace();

*/


