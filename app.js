let userScore = 0;
let computerScore = 0;

/*Στο κελί [i,j] αποθηκεύονται οι φορές που ο χρήστης διάλεξε i αφότου είχε επιλέξει j*/
let choices = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];
/* Η τελευταία επιλογή του χρήστη */
let last_choice = "p";

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_img = document.getElementById("r");
const paper_img = document.getElementById("p");
const scissors_img = document.getElementById("s");

function updateChoices(userChoice) {
    let i;
    let j;

    if      (last_choice === "r") j = 0;
    else if (last_choice === "p") j = 1;
    else                          j = 2;

    if      (userChoice === "r") i = 0;
    else if (userChoice === "p") i = 1;
    else                         i = 2;

    choices[i][j]++;
}

function getComputerChoice() {
    const letters = ['r', 'p', 's'];
    let j;

    if (last_choice === "r") j = 0;
    else if (last_choice === "p") j = 1;
    else j = 2;

    let timesUsedR = choices[0][j];
    let timesUsedP = choices[1][j];
    let timesUsedS = choices[2][j];
    let sum = timesUsedP + timesUsedR + timesUsedS;

    const randomNumber = Math.floor(Math.random() * sum);

    if (randomNumber < timesUsedR) return letters[1];
    else if (randomNumber < timesUsedP) return letters[2];
    else  return letters[0];
}

function convertToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "s") return "Scissors";
    return "Word out of dictionary."
}
function correctVerb(letter) {
    if (letter === "r") return "breaks";
    if (letter === "p") return "covers";
    if (letter === "s") return "cuts";
    return "Word out of dictionary."
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} ${correctVerb(userChoice)} ${convertToWord(computerChoice)}${smallCompWord}. You win!`;
    const userChoice_div = document.getElementById(userChoice);
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 400);
}
function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    result_p.innerHTML = `${convertToWord(computerChoice)}${smallCompWord} ${correctVerb(computerChoice)} ${convertToWord(userChoice)}${smallUserWord}. You lose!`;
    const userChoice_div = document.getElementById(userChoice);
    userChoice_div.classList.add('red-glow');
    setTimeout( () => userChoice_div.classList.remove('red-glow'), 400);
}
function draw(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}. It's a draw!`;
    const userChoice_div = document.getElementById(userChoice);
    userChoice_div.classList.add('grey-glow');
    setTimeout(() => userChoice_div.classList.remove('grey-glow'), 400);
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        default:
            draw(userChoice, computerChoice);
            break;
    }
    updateChoices(userChoice);
    last_choice = userChoice;
}

function main() {
    rock_img.addEventListener('click', () => game("r"));
    paper_img.addEventListener('click', () => game("p"));
    scissors_img.addEventListener('click', () => game("s"));
}

main();


function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}