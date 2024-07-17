const cardsData = [
    { id: 1, icon: '🐶' },
    { id: 2, icon: '🐱' },
    { id: 3, icon: '🐭' },
    { id: 4, icon: '🐰' },
    { id: 5, icon: '🦊' },
    { id: 6, icon: '🐻' },
    { id: 7, icon: '🐼' },
    { id: 8, icon: '🐨' },
];

const cards = [...cardsData, ...cardsData]; // Duplicate cards for matching pairs
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let gameLocked = false;

const cardsContainer = document.getElementById('cards-container');
const btnRestart = document.getElementById('btn-restart');
const flipSound = document.getElementById('flip-sound');
const matchSound = document.getElementById('match-sound');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards() {
    const shuffledCards = shuffle(cards);
    cardsContainer.innerHTML = ''; // Clear previous cards

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const frontFace = document.createElement('div');
        frontFace.classList.add('face', 'front');
        frontFace.textContent = card.icon;

        const backFace = document.createElement('div');
        backFace.classList.add('face', 'back');

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', () => flipCard(cardElement));
        cardsContainer.appendChild(cardElement);
    });
}

function flipCard(cardElement) {
    if (gameLocked) return;
    if (flippedCards.length < 2 && !flippedCards.includes(cardElement) && !cardElement.classList.contains('flipped')) {
        flipSound.play();
        cardElement.classList.add('flipped');
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves-counter').textContent = moves;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;

    if (id1 === id2) {
        matchSound.play();
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        checkForWin();
    } else {
        gameLocked = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            gameLocked = false;
        }, 1000);
    }

    flippedCards = [];
}

function checkForWin() {
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert(`Congratulations! You won in ${moves} moves!`);
        }, 500);
    }
}

btnRestart.addEventListener('click', () => {
    moves = 0;
    flippedCards = [];
    matchedCards = [];
    document.getElementById('moves-counter').textContent = moves;
    createCards(); // Assuming this function initializes or resets the game cards
});
document.addEventListener('DOMContentLoaded', () => {
    createCards();
});
