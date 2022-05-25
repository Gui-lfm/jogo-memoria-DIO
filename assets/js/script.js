const cards = document.querySelectorAll('.card')
const tentativas = document.querySelector('.placar__tentativas');
const pontos = document.querySelector('.placar__pontos');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function viraCarta() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
    tentativas.innerHTML++;
}

function checkForMath() {

    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        pontos.innerHTML++;
        return
    }

    unflipCards();
}

function disableCards() {

    firstCard.removeEventListener('click', viraCarta);
    secondCard.removeEventListener('click', viraCarta);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function embaralhaCartas(){
    cards.forEach((card)=>{
        let aleatorio = Math.floor(Math.random()* 12);
        card.style.order = aleatorio;
    })
})();

cards.forEach(card => {
    card.addEventListener('click', viraCarta)
});

