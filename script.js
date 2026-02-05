


// Modo de jogo
const melhor3 = document.getElementById("melhor-3");
const melhor5 = document.getElementById("melhor-5");

// Botões do jogo
const botoes = document.querySelectorAll(".jogadas button");
const botaoResetar = document.getElementById("resetar");

// Textos
const textoResultado = document.getElementById("resultado");

// Placar
const placarJogador = document.getElementById("placar-jogador");
const placarComputador = document.getElementById("placar-computador");
const placarEmpates = document.getElementById("placar-empates");
const jogadaJogadorTexto = document.getElementById("jogada-jogador-texto");
const jogadaComputadorTexto = document.getElementById("jogada-computador-texto");

// Icones
const iconeJogador = document.getElementById("icone-jogador");
const iconeComputador = document.getElementById("icone-computador");

// Estado
let totalDeRodadas = 3;
let vitoriasNecessarias = Math.ceil(totalDeRodadas / 2);
let jogoFinalizado = false;
let pontosJogador = 0;
let pontosComputador = 0;
let pontosEmpates = 0;

const opcoes = ["pedra", "papel", "tesoura"];

// Configurando jogo

function configurarJogo(total) {
    totalDeRodadas = total;
    vitoriasNecessarias = Math.ceil(total / 2);

    pontosJogador = 0;
    pontosComputador = 0;
    pontosEmpates = 0;
    jogoFinalizado = false;

    placarJogador.textContent = "Jogador: 0";
    placarComputador.textContent = "Computador: 0";
    placarEmpates.textContent = "Empates: 0";

    textoResultado.textContent = "Resultado:";
    

    console.log("Modo configurado:", total);
    console.log("Vitórias necessárias:", vitoriasNecessarias);
}


melhor3.addEventListener("click", () => {
    configurarJogo(3);
});

melhor5.addEventListener("click", () => {
    configurarJogo(5);
});

botaoResetar.addEventListener("click", () => {
    configurarJogo(totalDeRodadas);
    limparInterface();
    console.log("resetado");
    
});

function limparInterface() {
    iconeJogador.innerHTML = "";
    iconeComputador.innerHTML = "";
    jogadaJogadorTexto.textContent = "";
    jogadaComputadorTexto.textContent = "";
    textoResultado.textContent = "Resultado:";
}


// Eventos jogo

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {

        if (jogoFinalizado) return;

        const jogadaJogador = botao.dataset.jogada;
        const jogadaComputador = opcoes[Math.floor(Math.random() * 3)];

        let resultado = "";

        if (jogadaJogador === jogadaComputador) {
            resultado = "Empate";
        } else if (
            (jogadaJogador === "pedra" && jogadaComputador === "tesoura") ||
            (jogadaJogador === "papel" && jogadaComputador === "pedra") ||
            (jogadaJogador === "tesoura" && jogadaComputador === "papel")
        ) {
            resultado = "Vitoria";
        } else {
            resultado = "Derrota";
        }

        iconeJogador.innerHTML = iconeDaJogada(jogadaJogador);
        iconeComputador.innerHTML = iconeDaJogada(jogadaComputador);

        textoResultado.textContent = "Resultado: " + resultado;

        if (resultado === "Vitoria") {
            pontosJogador++;
        } else if (resultado === "Derrota") {
            pontosComputador++;
        } else {
            pontosEmpates++;
        }

        placarJogador.textContent = "Jogador: " + pontosJogador;
        placarComputador.textContent = "Computador: " + pontosComputador;
        placarEmpates.textContent = "Empates: " + pontosEmpates;
        jogadaJogadorTexto.textContent = "Você escolheu: " + jogadaJogador;
        jogadaComputadorTexto.textContent = "O PC escolheu: " + jogadaComputador;

        if (pontosJogador === vitoriasNecessarias) {
            textoResultado.textContent = "🏆 Você venceu a partida!";
            jogoFinalizado = true;
        }

        if (pontosComputador === vitoriasNecessarias) {
            textoResultado.textContent = "🤖 O computador venceu a partida!";
            jogoFinalizado = true;
        }

        function iconeDaJogada(jogada) {
            if (jogada === "pedra") {
                return "<img src='imagens/pedra.png' alt='Pedra'>";
            }

            if (jogada === "papel") {
                return "<img src='imagens/papel.png' alt='Papel'>";
            }

            if (jogada === "tesoura") {
                return "<img src='imagens/tesoura.png' alt='Tesoura'>";
            }
            
           
        }
    });
});
