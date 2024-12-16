let wordList = ["javascript", "hangman", "coding", "programming", "developer"];
let chosenWord = '';
let guessedLetters = [];
let remainingGuesses = 6;
let gameOver = false;

const themeSwitchBtn = document.getElementById('themeSwitchBtn');
const wordElement = document.getElementById('word');
const guessInput = document.getElementById('guessInput');
const messageElement = document.getElementById('message');
const hangmanCanvas = document.getElementById('hangmanCanvas');
const resetButton = document.getElementById('resetButton');
const usedLettersElement = document.getElementById('usedLetters');

// Theme toggle functionality
themeSwitchBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.querySelector('.container').classList.toggle('dark');
    document.querySelector('h1').classList.toggle('dark');
});

// Start a new game
function startGame() {
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetters = [];
    remainingGuesses = 6;
    gameOver = false;
    messageElement.textContent = '';
    wordElement.innerHTML = chosenWord.split('').map(letter => `<span>_</span>`).join(' ');
    guessInput.value = '';
    guessInput.focus();
    usedLettersElement.textContent = 'Used Letters: ';
    drawHangman(true);  // clear the canvas when the game starts
}

// Handle user guess
function guessLetter() {
    const letter = guessInput.value.toLowerCase();
    if (!letter || gameOver || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    usedLettersElement.textContent = 'Used Letters: ' + guessedLetters.join(', ');

    if (chosenWord.includes(letter)) {
        updateWordDisplay();
        if (wordElement.textContent.replace(/\s/g, '') === chosenWord) {
            messageElement.textContent = 'You win!';
            gameOver = true;
        }
    } else {
        remainingGuesses--;
        drawHangman(); // update hangman after each incorrect guess
        if (remainingGuesses === 0) {
            messageElement.textContent = `You lose! The word was "${chosenWord}".`;
            gameOver = true;
        }
    }

    guessInput.value = '';
    guessInput.focus();
}

// Update the word display
function updateWordDisplay() {
    wordElement.innerHTML = chosenWord.split('').map(letter => {
        return guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span>_</span>`;
    }).join(' ');
}

// Draw hangman on canvas
function drawHangman(clearCanvas = false) {
    const ctx = hangmanCanvas.getContext('2d');
    if (clearCanvas) {
        ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height); // Clear the canvas only on game start
    }

    const hangmanParts = [
        // Base (the horizontal line)
        () => {
            ctx.beginPath();
            ctx.moveTo(20, 230);
            ctx.lineTo(180, 230); // Horizontal line
            ctx.stroke();
        },
        // Left vertical line (post)
        () => {
            ctx.beginPath();
            ctx.moveTo(40, 20); // Top-left corner
            ctx.lineTo(40, 230); // Vertical line
            ctx.stroke();
        },
        // Noose
        () => {
            ctx.beginPath();
            ctx.moveTo(40, 50); // Start of noose
            ctx.lineTo(100, 50); // Right side of the noose
            ctx.stroke();
        },
        // Head
        () => {
            ctx.beginPath();
            ctx.arc(100, 100, 30, 0, Math.PI * 2); // Circle for the head
            ctx.stroke();
        },
        // Body
        () => {
            ctx.beginPath();
            ctx.moveTo(100, 130); 
            ctx.lineTo(100, 180); // Line for the body
            ctx.stroke();
        },
        // Left arm
        () => {
            ctx.beginPath();
            ctx.moveTo(100, 150); 
            ctx.lineTo(60, 170); // Left arm line
            ctx.stroke();
        },
        // Right arm
        () => {
            ctx.beginPath();
            ctx.moveTo(100, 150); 
            ctx.lineTo(140, 170); // Right arm line
            ctx.stroke();
        },
        // Left leg
        () => {
            ctx.beginPath();
            ctx.moveTo(100, 180); 
            ctx.lineTo(60, 210); // Left leg line
            ctx.stroke();
        },
        // Right leg
        () => {
            ctx.beginPath();
            ctx.moveTo(100, 180); 
            ctx.lineTo(140, 210); // Right leg line
            ctx.stroke();
        }
    ];

    // Draw the corresponding hangman parts based on remaining guesses
    if (remainingGuesses <= 8) {
        hangmanParts[8 - remainingGuesses](); // Drawing hangman parts as guesses reduce
    }
}



// Event listeners
guessInput.addEventListener('input', guessLetter);
resetButton.addEventListener('click', startGame);

// Start the first game
startGame();
