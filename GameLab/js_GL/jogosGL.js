/* =========================================================
   jogosGL.js — Funções da página de criação da GameLab
   ========================================================= */

// ----------- PRÉ-VISUALIZAÇÃO DA IMAGEM -----------
const uploadInput = document.getElementById("imageUpload");
const previewGallery = document.getElementById("previewGallery");

if (uploadInput) {
    uploadInput.addEventListener("change", function () {
        previewGallery.innerHTML = "";
        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("preview-image");

            previewGallery.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
}


// ----------- ENVIO DO FORMULÁRIO -----------
const projectForm = document.getElementById("projectForm");

if (projectForm) {
    projectForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();

        if (title.length < 3) {
            alert("❗ O nome do projeto deve ter pelo menos 3 caracteres.");
            return;
        }

        if (description.length < 10) {
            alert("❗ A descrição deve ter pelo menos 10 caracteres.");
            return;
        }

        alert("🎉 Projeto enviado com sucesso! (Simulação)");
        projectForm.reset();
        previewGallery.innerHTML = "";
    });
}



// ----------- FEATHER ICONS -----------
if (typeof feather !== "undefined") {
    feather.replace();
}