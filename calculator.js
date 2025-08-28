let firstNumber;
let secondNumber;
let equationStage = 0;

const display = document.getElementById('displayBox');
const numbers = document.querySelectorAll(".numbers")
numbers.forEach((button) => {
    button.addEventListener('click', (event) => {
        let numberSelected = event.target.innerText
        console.log(numberSelected)
        numberSet(numberSelected, firstNumber, secondNumber, equationStage, display);
    });
});

function numberSet(numberSelected, firstNumber, secondNumber, equationStage, display) {
    if (!firstNumber) {
        firstNumber = String(numberSelected);
        equationStage = 1;
        display.innerText = firstNumber
        console.log(firstNumber, equationStage)
        return;
    }
    else if (firstNumber && equationStage === 1) {
        firstNumber = firstNumber.concat(numberSelected);
        console.log(firstNumber)
        return;
    }
    if (secondNumber === null && equationStage > 1) {
        secondNumber = numberSelected;
        console.log(secondNumber)
        return;
    }
}

