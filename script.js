const gameBoard = document.getElementById("gameBoard");
const flipSound = document.getElementById("flipSound");

const timeEl = document.getElementById("time");
const movesEl = document.getElementById("moves");
const starsEl = document.getElementById("stars");

const winScreen = document.getElementById("winScreen");
const winMessage = document.getElementById("winMessage");
const finalStats = document.getElementById("finalStats");

let emojis = [
    "🍎","🍌","🍇","🍓",
    "🍒","🥝","🍍","🍉",
    "🍎","🍌","🍇","🍓",
    "🍒","🥝","🍍","🍉"
];

// STATE
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matched = 0;

let time = 0;
let timerStarted = false;
let timer;

let gameWon = false;

// SHUFFLE
emojis.sort(() => Math.random() - 0.5);

// TIMER
function startTimer() {
    timer = setInterval(() => {
        time++;
        timeEl.textContent = time;
        updateStars();
    }, 1000);
}

// STARS
function updateStars() {
    if (moves < 10) starsEl.textContent = "⭐⭐⭐";
    else if (moves < 18) starsEl.textContent = "⭐⭐";
    else starsEl.textContent = "⭐";
}

// CREATE BOARD
function createBoard() {
    gameBoard.innerHTML = "";

    emojis.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;

        card.addEventListener("click", () => handleClick(card));

        gameBoard.appendChild(card);
    });
}

// SOUND
function playSound() {
    flipSound.currentTime = 0;
    flipSound.play();
}

// CLICK
function handleClick(card) {
    if (lockBoard) return;
    if (card.classList.contains("flip")) return;

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    playSound();

    card.classList.add("flip");
    card.textContent = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    moves++;
    movesEl.textContent = moves;

    checkMatch();
}

// MATCH CHECK (FIXED: NO REMOVAL, ONLY HIDE CONTENT)
function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            firstCard.style.pointerEvents = "none";
            secondCard.style.pointerEvents = "none";

            matched += 2;

            reset();
            checkWin();
        }, 400);

    } else {
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            firstCard.textContent = "";
            secondCard.textContent = "";

            reset();
        }, 700);
    }
}

// RESET
function reset() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
function restartGame() {
    location.reload();
}
// WIN
function checkWin() {
    if (matched === emojis.length && !gameWon) {
        gameWon = true;

        clearInterval(timer);

        const playerName = localStorage.getItem("playerName") || "Player";

        winMessage.textContent =
            `🎉 Congratulations ${playerName}, You Won!`;

        finalStats.textContent =
            `Time: ${time}s | Moves: ${moves}`;

        winScreen.classList.remove("hidden");
    }
}

// RESTART
document.getElementById("restartBtn").addEventListener("click", () => {
    location.reload();
});

createBoard();