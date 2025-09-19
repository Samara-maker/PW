function mudarTexto() {
  document.getElementById("meuTexto").innerText = "OPA";
}

let caixa = document.getElementById("minhaCaixa");
caixa.onmouseenter = function () {
  caixa.classList.add("hover");
};
caixa.onmouseleave = function () {
  caixa.classList.remove("hover");
};

const input = document.getElementById("campo-teclado");
const display = document.getElementById("tecla-pressionada");

input.addEventListener("keydown", function(event) {
  display.innerText = `Você pressionou: ${event.key}`;
});
