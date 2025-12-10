/* =========================================================
   ScriptGL.js — Script unificado para todo o ecossistema
   GameLab / Cursos / Criação de Jogos
   ========================================================= */


/* =========================================================
   1. FEATHER ICONS
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof feather !== "undefined") {
        feather.replace();
    }
});


/* =========================================================
   2. THEME TOGGLE (dark/light) — usado em todas as páginas
   ========================================================= */
(function () {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const html = document.documentElement;

    if (!themeToggle || !themeIcon) return;

    const setIcon = (mode) => {
        themeIcon.setAttribute("data-feather", mode === "light" ? "sun" : "moon");
        feather.replace();
    };

    // Carrega preferencia salva
    const saved = localStorage.getItem("gamelab-theme") || "dark";
    html.setAttribute("data-bs-theme", saved);
    setIcon(saved);

    themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-bs-theme") || "dark";
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-bs-theme", next);
        localStorage.setItem("gamelab-theme", next);
        setIcon(next);
    });
})();



/* =========================================================
   3. ÁREA DE CURSOS
   - Modal de cursos
   - Busca
   - Filtros
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    /* ----- 3.1 Modal de cursos ----- */
    const courseModalEl = document.getElementById("courseModal");
    if (courseModalEl) {
        courseModalEl.addEventListener("show.bs.modal", function (event) {
            const button = event.relatedTarget;
            const data = button.getAttribute("data-course");

            let obj;
            try {
                obj = JSON.parse(data);
            } catch {
                obj = { title: "Curso", desc: "", level: "", duration: "", items: [] };
            }

            document.getElementById("courseModalTitle").textContent = obj.title;
            document.getElementById("courseModalDesc").textContent = obj.desc;
            document.getElementById("courseModalLevel").textContent = obj.level;
            document.getElementById("courseModalDuration").textContent = obj.duration || "—";

            const itemsEl = document.getElementById("courseModalItems");
            itemsEl.innerHTML = "";

            if (obj.items?.length) {
                const ul = document.createElement("ul");
                obj.items.forEach(text => {
                    const li = document.createElement("li");
                    li.textContent = text;
                    ul.appendChild(li);
                });
                itemsEl.appendChild(ul);
            }
        });
    }


    /* ----- 3.2 Busca de cursos ----- */
    const searchDesktop = document.getElementById("searchDesktop");
    const btnSearch = document.getElementById("btnSearch");

    function runSearch(q) {
        q = (q || "").trim().toLowerCase();

        document.querySelectorAll(".course-card").forEach(card => {
            const title = (card.getAttribute("data-title") || "").toLowerCase();
            const desc = (card.querySelector(".course-desc")?.innerText.toLowerCase() || "");

            card.style.display = (!q || title.includes(q) || desc.includes(q)) ? "" : "none";
        });
    }

    if (searchDesktop && btnSearch) {
        btnSearch.addEventListener("click", () => runSearch(searchDesktop.value));
        searchDesktop.addEventListener("keyup", (e) => {
            if (e.key === "Enter") runSearch(searchDesktop.value);
        });
    }


    /* ----- 3.3 Filtro por categoria ----- */
    const catSelect = document.getElementById("categorySelect");
    if (catSelect) {
        catSelect.addEventListener("change", function () {
            const val = this.value;

            document.querySelectorAll(".course-card").forEach(card => {
                const cat = card.getAttribute("data-category") || "";
                card.style.display = (!val || cat === val) ? "" : "none";
            });
        });
    }


    /* ----- 3.4 Filtro por nível ----- */
    const levelChecks = document.querySelectorAll(".level-filter");
    if (levelChecks.length) {
        levelChecks.forEach(ch =>
            ch.addEventListener("change", () => {
                const selected = Array.from(levelChecks)
                    .filter(i => i.checked)
                    .map(i => i.value);

                document.querySelectorAll(".course-card").forEach(card => {
                    const level = card.getAttribute("data-level") || "";

                    if (!selected.length || selected.includes(level)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            })
        );
    }

});



/* =========================================================
   4. CRIAÇÃO DE JOGOS
   - Preview da capa
   - Preview da galeria
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

    /* ----- 4.1 Preview da capa ----- */
    const mainInput = document.getElementById("main-image");
    const previewMain = document.getElementById("preview-main");

    if (mainInput && previewMain) {
        mainInput.addEventListener("change", () => {
            const file = mainInput.files[0];
            if (file) {
                previewMain.src = URL.createObjectURL(file);
                previewMain.style.display = "block";
            }
        });
    }


    /* ----- 4.2 Preview da galeria ----- */
    const galleryInput = document.getElementById("gallery");
    const galleryContainer = document.getElementById("gallery-container");

    if (galleryInput && galleryContainer) {
        galleryInput.addEventListener("change", () => {
            galleryContainer.innerHTML = "";

            Array.from(galleryInput.files).forEach(file => {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);

                const div = document.createElement("div");
                div.classList.add("gallery-item");
                div.appendChild(img);

                galleryContainer.appendChild(div);
            });
        });
    }

});
