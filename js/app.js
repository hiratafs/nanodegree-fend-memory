/*  Array com todas as figuras do jogo */
const cardsMemory = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt","fa fa-cube", "fa fa-cube", "fa fa-leaf",
                     "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];


shuffle(cardsMemory);
const mesaCards = document.querySelector(".deck");
let congelatabuleiro = false;
let primeiroCard, segundoCard;
let cardsAbertos = [];
let paresErrados = [];
let restartButton = document.querySelector(".restart");
let placar = document.querySelector(".moves");
let novaCarta;
let cliquesDados = document.querySelector(".cliquesdados");
let clickmoves = 0;
let placarEstrelas = document.querySelector(".stars")
let pontos = 0;
let estrela;
let jogadasErradas = document.querySelector(".jogadas-erradas")
let pontuacao = document.querySelector(".pontos");
const play = document.querySelector(".play");

restartButton.addEventListener("click", function(){
    location.reload();
})

play.addEventListener("click", function(){
})

/*  Cria todos os cards no tabuleiro  */
    for(let c = 0; c < cardsMemory.length; c++){
      novaCarta = document.createElement("li");
      novaCarta.classList.add("card");
      novaCarta.innerHTML = "<i class='" + cardsMemory[c] + "'></i>";
      mesaCards.appendChild(novaCarta);


    /* Ouvinte de evento para virar o card */
    novaCarta.addEventListener("click", virarCard);
    }


/* Função para virar o card */
    function virarCard() {
        if(congelatabuleiro) {
        return
      };
        if(this === primeiroCard) {
            return;
        }
        if(cardsAbertos.length === 0){
            this.classList.add("animated", "tada", "open", "show");
            primeiroCard = this;
            cardsAbertos.push(this);
        } else {
            this.classList.add("animated", "tada", "open", "show");
            segundoCard = this;
            cardsAbertos.push(this);
            comparaCards();
            contaMovimentos();
        }

         mensagemFinal();
    }
    

/* função para comparar os cards */
    function comparaCards() {
      if(segundoCard.innerHTML === primeiroCard.innerHTML){
        congelaCards();
        pontos += 5;

      } else {
        paresErrados.push("par-errado");
        desviraCards();
        pontos -= 2;
      };
        
}
    
/* Reseta o array dos cards abertos e os cards clicados */
    function reset(){
        cardsAbertos = [];
        primeiroCard = null;
        segundoCard  = null
}
/* função para travar os cards que formam par */
    function congelaCards() {
      cardsAbertos.forEach(formaPar);
      reset();
    }

    function formaPar(element) {
      element.classList.add("match");
      element.removeEventListener("click", virarCard);
    }


/* desvira os cards diferentes */
    function desviraCards() {
      congelatabuleiro = true;
      setTimeout(function() {
        primeiroCard.classList.remove("animated", "tada", "open", "show");
        segundoCard.classList.remove("animated", "tada", "open", "show"); 
        congelatabuleiro = false;
        reset()},
        900)

    }


/* Contador de movimentos */
function contaMovimentos() {
    clickmoves +=1;
    placar.innerHTML = `${clickmoves} `
    jogadasErradas.innerHTML = `${paresErrados.length} `
    pontuacao.innerHTML = `${pontos} `
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
