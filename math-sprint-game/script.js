// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = "0.0";

// Scroll
let valueY = 0;

// Refresh Splash Page Best Scores
function bestScoresToDOM() {
    bestScores.forEach((bestScore, index) => {
        const bestScoreEl = bestScore;
        bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
    });
}

// Check Local Storage for Best Scores, set bestScoreArray
function getSavedBestScores() {
    if (localStorage.getItem("bestScores")) {
        bestScoreArray = JSON.parse(localStorage.bestScores);
    } else {
        bestScoreArray = [
            { questions: 10, bestScore: finalTimeDisplay },
            { questions: 25, bestScore: finalTimeDisplay },
            { questions: 50, bestScore: finalTimeDisplay },
            { questions: 99, bestScore: finalTimeDisplay },
        ];
        localStorage.setItem("bestScores", JSON.stringify(bestScoreArray));
    }
    bestScoresToDOM();
}

// Update Best Score Array
function updateBestScore() {
    bestScoreArray.forEach((score, index) => {
        // Select correct Best Score to update
        if (questionAmount === score.questions) {
            // Return Best Score as number with one decimal
            const savedBestScore = Number(bestScoreArray[index].bestScore);
            // Update if the new final score is less or replacing zero
            if (savedBestScore === 0 || savedBestScore > finalTime) {
                bestScoreArray[index].bestScore = finalTimeDisplay;
            }
        }
    });
    // Save to Local Storage
    localStorage.setItem("bestScores", JSON.stringify(bestScoreArray));
    bestScoresToDOM();
}

// Reset Game
function playAgain() {
    gamePage.addEventListener("click", startTimer);
    scorePage.hidden = true;
    radioContainers.forEach((radioEl) => {
        radioEl.classList.remove("selected-label");
        radioEl.children[1].checked = false;
    });
    splashPage.hidden = false;
    equationsArray = [];
    playerGuessArray = [];
    valueY = 0;
    playAgainBtn.hidden = true;

}


//Show Score Page
function showScorePage() {
    // Show Play Again button after 1 second
    setTimeout(() => {
        playAgainBtn.hidden = false
    }, 1000);
    gamePage.hidden = true;
    scorePage.hidden = false;

}
// Format and Display Time in DOM
function scoresToDOM() {
    finalTimeDisplay = finalTime.toFixed(1);
    baseTime = timePlayed.toFixed(1);
    penaltyTime = penaltyTime.toFixed(1);
    baseTimeEl.textContent = `Base Time: ${baseTime}s`;
    penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
    finalTimeEl.textContent = `${finalTimeDisplay}s`;
    updateBestScore();
    showScorePage();

}

// Stop Timer, Process Results, go to ScorePage
function checkTime() {
    console.log(timePlayed);
    if (playerGuessArray.length === questionAmount) {
        console.log(playerGuessArray);
        clearInterval(timer);
        // Check for wrong quesses, add penalty time
        equationsArray.forEach((equation, index) => {
            if (equation.evaluated === playerGuessArray[index]) {
                // Correct Guess, No Penalty
            } else {
                // Incorrect Guess, Add Penalty
                penaltyTime += 0.5;
            }
        });
        finalTime = timePlayed + penaltyTime;
        scoresToDOM();
    }
}

// Add a tenth of a second to timePlayed
function addTime() {
    timePlayed += 0.1;
    checkTime();

}

//Start timer when game page is clicked 
function startTimer() {
    // Reset times
    timePlayed = 0;
    penaltyTime = 0;
    finalTime = 0;
    timer = setInterval(addTime, 100);
    gamePage.removeEventListener("click", startTimer);
}

// Scroll, Store user selection in playerGuessArray
function select(guessedTrue) {
    // Scroll 80 pixels
    valueY += 80;
    itemContainer.scroll(0, valueY);
    // Add player guess to array
    return guessedTrue ? playerGuessArray.push("true") : playerGuessArray.push("false");
}

// Show Game Page
function showGamePage() {
    gamePage.hidden = false;
    countdownPage.hidden = true;
    //Disable scroll and reposition to the top
    // itemContainer.scroll(0, 0);
    itemContainer.scrollTo({ top: 0, behavior: "instant" });
    itemContainer.addEventListener("wheel", (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, { passive: false });
}

// Shuffle array
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}
// Get Random Number up to a max number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Create Correct/Incorrect Random Equations
function createEquations() {
    // Randomly choose how many correct equations there should be
    const correctEquations = getRandomInt(questionAmount);
    // Set amount of wrong equations
    const wrongEquations = questionAmount - correctEquations;
    // Loop through, multiply random numbers up to 9, push to array
    for (let i = 0; i < correctEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        const equationValue = firstNumber * secondNumber;
        const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
        equationObject = { value: equation, evaluated: 'true' };
        equationsArray.push(equationObject);
    }
    // Loop through, mess with the equation results, push to array
    for (let i = 0; i < wrongEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        const equationValue = firstNumber * secondNumber;
        wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
        wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
        wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
        const formatChoice = getRandomInt(3);
        const equation = wrongFormat[formatChoice];
        equationObject = { value: equation, evaluated: 'false' };
        equationsArray.push(equationObject);
    }
    shuffle(equationsArray);
}

// Add Equations to DOM

function equationsToDOM() {
    equationsArray.forEach((equation) => {
        // Item
        const item = document.createElement("div");
        item.classList.add("item");
        // Equation text
        const equationText = document.createElement("h1");
        equationText.textContent = equation.value;
        // Append
        item.appendChild(equationText);
        itemContainer.appendChild(item);
    });
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
    // Reset DOM, Set Blank Space Above
    itemContainer.textContent = '';
    // Spacer
    const topSpacer = document.createElement('div');
    topSpacer.classList.add('height-240');
    // Selected Item
    const selectedItem = document.createElement('div');
    selectedItem.classList.add('selected-item');
    // Append
    itemContainer.append(topSpacer, selectedItem);

    // Create Equations, Build Elements in DOM
    createEquations();
    equationsToDOM();


    // Set Blank Space Below
    const bottomSpacer = document.createElement('div');
    bottomSpacer.classList.add('height-500');
    itemContainer.appendChild(bottomSpacer);
}

// Display 3, 2, 1, Go!
function countdownStart() {
    // const msgs = ["3", "2", "1", "Go!"];
    // countdown.textContent = msgs[0];

    // function doSetTimeout(i) {
    //     setTimeout(() => {
    //         countdown.textContent = msgs[i];
    //     }, i * 500);
    // }

    // for (let i = 1; i < msgs.length; i++) {
    //     doSetTimeout(i);
    // }
    let count = 5;
    countdown.textContent = count;
    const timeCountDown = setInterval(() => {
        count--;
        if (count === 0) {
            countdown.textContent = "Go!";
        } else if (count === -1) {
            showGamePage();
            clearInterval(timeCountDown);
        } else {
            countdown.textContent = count;
        }
    }, 1000);
}

// Navigate from Splash page to Countdown Page
function showCountDown() {
    countdownPage.hidden = false;
    splashPage.hidden = true;
    populateGamePage();
    countdownStart();
    // setTimeout(showGamePage, 1800);
}

// Get the value from selected radio button
function getRadioValue() {
    let radioValue;
    radioInputs.forEach((radioInput) => {
        if (radioInput.checked) {
            radioValue = radioInput.value;
        }
    });
    return radioValue;
}

//Form that decides amount of questions
function selectQuestionAmount(e) {
    e.preventDefault();
    questionAmount = Number(getRadioValue());
    if (questionAmount) {
        showCountDown();
    }

}

startForm.addEventListener("click", (e) => {
    if (e.target.type === "radio") {

        radioContainers.forEach((radioEl) => {
            // Remove Selected Label Styling
            radioEl.classList.remove("selected-label");
            // Add it back if radio input is checked
            if (radioEl.children[1].checked) {
                radioEl.classList.add("selected-label");
            }
        });
    }
});

// Event Listeners
startForm.addEventListener("submit", selectQuestionAmount);
gamePage.addEventListener("click", startTimer);

radioContainers.forEach((radioEl) => {
    radioEl.children[1].checked = false;
});

// On Load
getSavedBestScores();

window.select = select;
window.playAgain = playAgain;

// itemContainer.addEventListener("wheel", (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     return false;
// }, { passive: false });