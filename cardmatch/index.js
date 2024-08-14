let cardBoard = document.querySelector(".card-container");
let flippedCards = [];
let matchedCards = [];
let canFlip = true;

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    return card;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 4) + 1; // Generate a random number between 1 and 15 (for example)
}

function flipCard() {
    if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped') || matchedCards.includes(this)) {
        return;
    }

    if (!this.dataset.number) {
        this.dataset.number = generateRandomNumber();
    }

    this.classList.add('flipped');
    this.textContent = this.dataset.number;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    setTimeout(() => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.number === card2.dataset.number) {
            matchedCards.push(card1, card2);
            if (matchedCards.length === 2) {
                alert('Congratulations! You won!');
                matchedCards=[]
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?';
            card2.textContent = '?';
            delete card1.dataset.number;
            delete card2.dataset.number;
        }
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

function initGame() {
    cardBoard.innerHTML = '';
    const numberOfCards = 30; // Define how many cards you want
    for (let i = 0; i < numberOfCards; i++) {
        const card = createCard();
        cardBoard.appendChild(card);
    }
}

initGame();
