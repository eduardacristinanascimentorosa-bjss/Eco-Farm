// ======================================
// ECOFARM - BACKEND COMPLETO
// PARTE 1
// ======================================

const jogo = {
    moedas: 500,
    energia: 5,
    energiaMaxima: 5,
    agua: 100,
    poluicao: 40,
    restauracao: 0,
    dia: 1,
    nivel: 1,
    energiaSolar: 0,
    morangosPlantados: 0,

    inventario: {
        morango: 0,
        banana: 0,
        ovos: 0,
        leite: 0
    },

    animais: {
        galinhas: 0,
        vacas: 0
    }
};

const plantacoes = [];

const missoes = [
    {
        id: 1,
        nome: "Plantar 5 morangos",
        concluida: false
    },
    {
        id: 2,
        nome: "Reduzir poluição para 20",
        concluida: false
    },
    {
        id: 3,
        nome: "Comprar 2 galinhas",
        concluida: false
    }
];

class Plantacao {

    constructor(nome, preco, venda, dias) {

        this.nome = nome;
        this.preco = preco;
        this.venda = venda;
        this.dias = dias;

        this.crescimento = 0;
        this.pronta = false;
    }

    crescer() {

        this.crescimento++;

        if (this.crescimento >= this.dias) {
            this.pronta = true;
        }
    }
}

function atualizarTela() {

    const moedas =
        document.getElementById("moedas");

    const energia =
        document.getElementById("energia");

    const agua =
        document.getElementById("agua");

    const poluicao =
        document.getElementById("poluicao");

    const restauracao =
        document.getElementById("restauracao");

    const dia =
        document.getElementById("dia");

    const nivel =
        document.getElementById("nivel");

    if (moedas)
        moedas.textContent =
        jogo.moedas;

    if (energia)
        energia.textContent =
        jogo.energia;

    if (agua)
        agua.textContent =
        jogo.agua;

    if (poluicao)
        poluicao.textContent =
        jogo.poluicao;

    if (restauracao)
        restauracao.textContent =
        jogo.restauracao;

    if (dia)
        dia.textContent =
        jogo.dia;

    if (nivel)
        nivel.textContent =
        jogo.nivel;

    const invMorango =
        document.getElementById("invMorango");

    const invBanana =
        document.getElementById("invBanana");

    const invOvos =
        document.getElementById("invOvos");

    const invLeite =
        document.getElementById("invLeite");

    if (invMorango)
        invMorango.textContent =
        jogo.inventario.morango;

    if (invBanana)
        invBanana.textContent =
        jogo.inventario.banana;

    if (invOvos)
        invOvos.textContent =
        jogo.inventario.ovos;

    if (invLeite)
        invLeite.textContent =
        jogo.inventario.leite;

    atualizarPlantacoes();
    atualizarMissoes();
}

function atualizarPlantacoes() {

    const lista =
        document.getElementById(
            "lista-plantacoes"
        );

    if (!lista) return;

    lista.innerHTML = "";

    plantacoes.forEach(
        (planta, index) => {

            const div =
                document.createElement("div");

            div.className =
                "plantacao-card";

            div.innerHTML = `
                <h4>${planta.nome}</h4>

                <p>
                Crescimento:
                ${planta.crescimento}
                / ${planta.dias}
                </p>

                ${
                    planta.pronta
                    ?
                    `<button onclick="colher(${index})">
                    Colher
                    </button>`
                    :
                    "🌱 Crescendo"
                }
            `;

            lista.appendChild(div);
        }
    );
}

function atualizarMissoes() {

    const lista =
        document.getElementById(
            "listaMissoes"
        );

    if (!lista) return;

    lista.innerHTML = "";

    missoes.forEach(missao => {

        const item =
            document.createElement("li");

        item.textContent =
            (missao.concluida
                ? "✅ "
                : "❌ ")
            + missao.nome;

        lista.appendChild(item);
    });
}
// ======================================
// ECOFARM - BACKEND COMPLETO
// PARTE 2
// ======================================

function plantarMorango() {

    if (
        jogo.moedas < 50 ||
        jogo.energia <= 0 ||
        jogo.agua < 5
    ) {
        alert(
            "Recursos insuficientes."
        );
        return;
    }

    jogo.moedas -= 50;
    jogo.energia--;
    jogo.agua -= 5;

    jogo.morangosPlantados++;

    plantacoes.push(
        new Plantacao(
            "Morango",
            50,
            100,
            2
        )
    );

    verificarMissoes();

    salvarJogo();
    atualizarTela();
}

function plantarBanana() {

    if (
        jogo.moedas < 80 ||
        jogo.energia <= 0 ||
        jogo.agua < 8
    ) {
        alert(
            "Recursos insuficientes."
        );
        return;
    }

    jogo.moedas -= 80;
    jogo.energia--;
    jogo.agua -= 8;

    plantacoes.push(
        new Plantacao(
            "Banana",
            80,
            150,
            3
        )
    );

    salvarJogo();
    atualizarTela();
}

function colher(index) {

    const planta =
        plantacoes[index];

    if (!planta.pronta) {

        alert(
            "A plantação ainda não está pronta."
        );

        return;
    }

    if (
        planta.nome === "Morango"
    ) {

        jogo.inventario.morango++;
    }

    if (
        planta.nome === "Banana"
    ) {

        jogo.inventario.banana++;
    }

    plantacoes.splice(
        index,
        1
    );

    salvarJogo();
    atualizarTela();
}

function venderMorango() {

    if (
        jogo.inventario.morango <= 0
    ) {

        alert(
            "Você não possui morangos."
        );

        return;
    }

    jogo.inventario.morango--;

    jogo.moedas += 100;

    salvarJogo();
    atualizarTela();
}

function venderBanana() {

    if (
        jogo.inventario.banana <= 0
    ) {

        alert(
            "Você não possui bananas."
        );

        return;
    }

    jogo.inventario.banana--;

    jogo.moedas += 150;

    salvarJogo();
    atualizarTela();
}

function venderOvos() {

    if (
        jogo.inventario.ovos <= 0
    ) {

        alert(
            "Você não possui ovos."
        );

        return;
    }

    jogo.inventario.ovos--;

    jogo.moedas += 30;

    salvarJogo();
    atualizarTela();
}

function venderLeite() {

    if (
        jogo.inventario.leite <= 0
    ) {

        alert(
            "Você não possui leite."
        );

        return;
    }

    jogo.inventario.leite--;

    jogo.moedas += 60;

    salvarJogo();
    atualizarTela();
}

function comprarGalinha() {

    if (
        jogo.moedas < 150
    ) {

        alert(
            "Moedas insuficientes."
        );

        return;
    }

    jogo.moedas -= 150;

    jogo.animais.galinhas++;

    verificarMissoes();

    salvarJogo();
    atualizarTela();
}

function comprarVaca() {

    if (
        jogo.moedas < 300
    ) {

        alert(
            "Moedas insuficientes."
        );

        return;
    }

    jogo.moedas -= 300;

    jogo.animais.vacas++;

    salvarJogo();
    atualizarTela();
}

function produzirAnimais() {

    jogo.inventario.ovos +=
        jogo.animais.galinhas;

    jogo.inventario.leite +=
        jogo.animais.vacas;
}

function construirPainelSolar() {

    if (
        jogo.moedas < 300
    ) {

        alert(
            "Moedas insuficientes."
        );

        return;
    }

    jogo.moedas -= 300;

    jogo.energiaSolar++;

    salvarJogo();
    atualizarTela();
}

function limparArea() {

    if (
        jogo.energia <= 0
    ) {

        alert(
            "Sem energia."
        );

        return;
    }

    jogo.energia--;

    jogo.poluicao =
        Math.max(
            0,
            jogo.poluicao - 10
        );

    jogo.restauracao += 5;

    verificarNivel();
    verificarMissoes();
    verificarVitoria();

    salvarJogo();
    atualizarTela();
}
// ======================================
// ECOFARM - BACKEND COMPLETO
// PARTE 3
// ======================================

function eventoClimatico() {

    const sorteio =
        Math.floor(
            Math.random() * 100
        );

    if (sorteio < 15) {

        alert(
            "☀️ Seca! Água reduzida."
        );

        jogo.agua =
            Math.max(
                0,
                jogo.agua - 20
            );
    }

    else if (sorteio < 25) {

        alert(
            "⛈️ Tempestade! Poluição aumentou."
        );

        jogo.poluicao += 5;
    }

    else if (sorteio < 35) {

        alert(
            "🌧️ Chuva! Reservatórios cheios."
        );

        jogo.agua += 20;
    }
}

function verificarNivel() {

    if (
        jogo.restauracao >= 25
    ) {
        jogo.nivel = 2;
    }

    if (
        jogo.restauracao >= 50
    ) {
        jogo.nivel = 3;
    }

    if (
        jogo.restauracao >= 75
    ) {
        jogo.nivel = 4;
    }

    if (
        jogo.restauracao >= 100
    ) {
        jogo.nivel = 5;
    }
}

function verificarMissoes() {

    if (
        jogo.morangosPlantados >= 5
    ) {

        missoes[0].concluida =
            true;
    }

    if (
        jogo.poluicao <= 20
    ) {

        missoes[1].concluida =
            true;
    }

    if (
        jogo.animais.galinhas >= 2
    ) {

        missoes[2].concluida =
            true;
    }
}

function proximoDia() {

    jogo.dia++;

    jogo.energia =
        jogo.energiaMaxima;

    plantacoes.forEach(
        planta => {

            planta.crescer();

        }
    );

    produzirAnimais();

    eventoClimatico();

    jogo.poluicao +=
        Math.max(
            0,
            2 - jogo.energiaSolar
        );

    verificarNivel();

    verificarMissoes();

    verificarPoluicao();

    salvarJogo();

    atualizarTela();
}

function verificarVitoria() {

    if (
        jogo.restauracao >= 100
    ) {

        alert(
            "🏆 PARABÉNS!\nVocê restaurou completamente a EcoFarm!"
        );

        localStorage.removeItem(
            "ecofarm"
        );
    }
}

function verificarPoluicao() {

    if (
        jogo.poluicao >= 100
    ) {

        alert(
            "💀 GAME OVER!\nA fazenda foi destruída pela poluição."
        );

        localStorage.removeItem(
            "ecofarm"
        );

        location.reload();
    }
}

function salvarJogo() {

    localStorage.setItem(
        "ecofarm",

        JSON.stringify({

            jogo,

            plantacoes,

            missoes

        })
    );
}

function carregarJogo() {

    const save =
        localStorage.getItem(
            "ecofarm"
        );

    if (!save)
        return;

    const dados =
        JSON.parse(save);

    Object.assign(
        jogo,
        dados.jogo
    );

    plantacoes.length = 0;

    if (
        dados.plantacoes
    ) {

        dados.plantacoes.forEach(
            p => {

                const planta =
                    new Plantacao(
                        p.nome,
                        p.preco,
                        p.venda,
                        p.dias
                    );

                planta.crescimento =
                    p.crescimento;

                planta.pronta =
                    p.pronta;

                plantacoes.push(
                    planta
                );
            }
        );
    }

    if (
        dados.missoes
    ) {

        dados.missoes.forEach(
            (m, i) => {

                if (
                    missoes[i]
                ) {

                    missoes[i].concluida =
                        m.concluida;
                }
            }
        );
    }
}


function iniciarJogo(){


    document.getElementById(
    "menuInicial"
    ).style.display = "none";

    document.getElementById(
    "jogo"
    ).style.display = "block";

    document.getElementById(
    "avatarJogo"
    ).src = avatarEscolhido;
}
    atualizarTela();


window.onload = function () {

   
};

let avatarEscolhido =
"avatar.1.png";

function trocarAvatar(avatar){

    avatarEscolhido = avatar;

    document.getElementById(
    "avatarSelecionado"
    ).src = avatar;
}
 carregarJogo();

    atualizarTela();
