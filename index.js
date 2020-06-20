let hard = false;
let medium = false;
let easy = false;
startGame = false;

// Select a random block to have the solution color as its background color according to the difficulty

let randomBlockSolutionEasy = Math.floor(Math.random() * 3);
let randomBlockSolutionMedium = Math.floor(Math.random() * 6);
let randomBlockSolutionHard = Math.floor(Math.random() * 9);

// Function needed in order to generate the color blocks

function generateRandomColor() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

var solution = generateRandomColor();
document.getElementById('colorToBeGuessed').innerHTML = solution;
var selectedDiff;
let difficulties = document.querySelectorAll('.difficulty');

// Creating the ability to choose a game difficulty

difficulties.forEach(element => {
    element.addEventListener('click', () => {
        if (!startGame) {
            difficulties.forEach(item => {
                item.classList.remove('selectedDifficulty');
            })
            element.classList.add('selectedDifficulty');
            startGame = true;
            selectedDiff = document.getElementsByClassName('selectedDifficulty')[0].innerText;
            if (selectedDiff == "Easy") {
                easy = true;
            } else if (selectedDiff == "Medium") {
                medium = true;
            } else if (selectedDiff == "Hard") {
                hard = true;
            }
            generateColorBlocks();
            giveToRandomBlockSolution();
            addClickListeners();
        }
    })
});

// Create enough rows for the difficulty that shall be chosen

for (let j = 0; j < 3; j++) {
    let row = document.createElement('div');
    row.classList.add('row');
    document.getElementById('game-interface').appendChild(row);
}

var rows = document.getElementsByClassName('row');

// Generating corresponding blocks of colors

function generateBlocks (index) {
    for (j = 0; j < 3; j++) {
        let div = document.createElement('div');
        let insideDiv = document.createElement('div');
        div.classList.add('col-4');
        insideDiv.style.backgroundColor = generateRandomColor();
        insideDiv.classList.add('colorBlock')
        div.appendChild(insideDiv);
        rows[index].appendChild(div);
    }
}

// Generate the number of blocks corresponding to the chosen difficulty of the game using the above-declared function

function generateColorBlocks() {
    if (easy) {
        generateBlocks(0);
    } else if (medium) {
        generateBlocks(0);
        generateBlocks(1);
    } else if (hard) {
        generateBlocks(0);
        generateBlocks(1);
        generateBlocks(2);
    }
}

// Give a random block the solution color

function giveToRandomBlockSolution () {
    var gameColorBlocks = document.getElementsByClassName('colorBlock');
    if (easy) {
        gameColorBlocks[randomBlockSolutionEasy].style.backgroundColor = solution;
    } else if (medium) {
        gameColorBlocks[randomBlockSolutionMedium].style.backgroundColor = solution;
    } else if (hard) {
        gameColorBlocks[randomBlockSolutionHard].style.backgroundColor = solution;
    }
};

// Making the color blocks clickable in order to choose right or wrong the though-about solution

/* The system works this way: 
    - If the choice is right, every block will be the color of the solution
    - If the choice is wrong, the block dissappears via an fade-out effect
    - The blocks that have dissappeared, will reappear and be the color of the solution 
      if the right choice has been made, or if the game has ended 
*/

function addClickListeners() {
    var tries = 0;
    var gameColorBlocks = document.getElementsByClassName('colorBlock');
    for (let i = 0; i < gameColorBlocks.length; i++) {
        gameColorBlocks[i].addEventListener('click', () => {
            if (gameColorBlocks[i].style.backgroundColor == solution) {
                for (let j = 0; j < gameColorBlocks.length; j++) {
                    gameColorBlocks[j].style.backgroundColor = solution;
                    if(gameColorBlocks[j].style.opacity == 0) {
                        gameColorBlocks[j].classList.add('fade-in');
                    }
                }
                if (tries == 0) {
                    alert('Wow! You really are lucky today!')
                } else {
                    alert(`Congrats! You won in ${tries} tries!`);
                }
            } else {
                tries ++;
                gameColorBlocks[i].classList.add('fade-out');
            }
        });
    };
};