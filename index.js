let easyDifficulty = 3;
let mediumDifficulty = 6;
let hardDifficulty = 9;

let hard = false;
let medium = false;
let easy = false;

startGame = false;

function generateRandomColor() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    return [red, green, blue];
}

document.getElementById('colorToBeGuessed').innerHTML = `rgb(${generateRandomColor()})`;
var selectedDiff;
let difficulties = document.querySelectorAll('.difficulty');

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
                alert('Easy');
            } else if (selectedDiff == "Medium") {
                medium = true;
                alert('Medium');
            } else if (selectedDiff == "Hard") {
                hard = true;
                alert('Hard');
            }
        }
    })
})

if (easy) {
    generateColorBlocks(easyDifficulty);
} else if (medium) {
    generateColorBlocks(mediumDifficulty);
} else if (hard) {
    generateColorBlocks(hardDifficulty);
}