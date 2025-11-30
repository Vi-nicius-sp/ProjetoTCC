// ===== JOGO DA FORCA =====
const palavras = ["JAVASCRIPT", "PYTHON", "UNITY", "FORCA", "PIXEL"];
let palavra = "";
let letrasCertas = [];
let tentativas = 6;

function initForca() {
  palavra = palavras[Math.floor(Math.random() * palavras.length)];
  letrasCertas = [];
  tentativas = 6;
  const exibicao = palavra.split("").map(() => "_").join(" ");
  document.getElementById("forcaStatus").textContent = exibicao + " | Tentativas: " + tentativas;
  const input = document.getElementById("forcaInput");
  if (input) {
    input.disabled = false;
    input.focus();

    // Adiciona suporte ao Enter
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        jogarForca();
      }
    });
  }
}


function jogarForca() {
  const input = document.getElementById("forcaInput");
  if (!input) return;
  let letra = input.value.toUpperCase();
  input.value = "";
  if (!/^[A-Z]$/.test(letra)) return;

  if (letrasCertas.includes(letra) || tentativas <= 0) return;

  if (palavra.includes(letra)) {
    letrasCertas.push(letra);
  } else {
    tentativas--;
  }

  const exibicao = palavra.split("").map(l => (letrasCertas.includes(l) ? l : "_")).join(" ");
  document.getElementById("forcaStatus").textContent = exibicao + " | Tentativas: " + tentativas;

  if (!exibicao.includes("_")) {
    alert("Parabéns! Você venceu!");
    input.disabled = true;
  } else if (tentativas === 0) {
    alert("Game Over! A palavra era " + palavra);
    input.disabled = true;
  }
}

function resetForca() {
  initForca();
}

// Inicia forca ao carregar a página
document.addEventListener("DOMContentLoaded", initForca);

// ===== JOGO DA VELHA =====
let velhaBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

function jogada(btn, index) {
  if (velhaBoard[index] === "" && !checkWinner()) {
    velhaBoard[index] = currentPlayer;
    btn.textContent = currentPlayer;
    if (checkWinner()) {
      document.getElementById("velhaStatus").textContent = "Jogador " + currentPlayer + " venceu!";
    } else if (!velhaBoard.includes("")) {
      document.getElementById("velhaStatus").textContent = "Empate!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById("velhaStatus").textContent = "Vez: " + currentPlayer;
    }
  }
}

function checkWinner() {
  const comb = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return comb.some(c => velhaBoard[c[0]] && velhaBoard[c[0]] === velhaBoard[c[1]] && velhaBoard[c[1]] === velhaBoard[c[2]]);
}

function resetVelha() {
  velhaBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  document.querySelectorAll(".velha-btn").forEach(b => b.textContent = "");
  document.getElementById("velhaStatus").textContent = "Vez: " + currentPlayer;
}

// inicializa status da velha ao carregar
document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("velhaStatus");
  if (status) status.textContent = "Vez: " + currentPlayer;
});
