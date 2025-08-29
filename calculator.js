let firstNumber = "";
let secondNumber = "";
let equationStage = 0;
let operator;

const display = document.getElementById('displayBox');
const operatorDisplay = document.getElementById('operatorSignal')

const numbers = document.querySelectorAll(".numbers");
numbers.forEach((button) => {
    button.addEventListener('click', (event) => {
        let numberSelected = event.target.innerText
        if (!firstNumber) {
            equationStage = 1;
            firstNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
            console.log(firstNumber, equationStage)
            display.innerText = firstNumber;
            return;
        }
        if (equationStage === 1) {
            firstNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
            console.log(firstNumber, equationStage)
            display.innerText = firstNumber;
            return;
        }
        if (!secondNumber && equationStage ===2) {
            equationStage = 3;
        }
        secondNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
        console.log(secondNumber, equationStage)
        if (equationStage === 3) {
            display.innerText = secondNumber;
            return;
        }
        
    });
});

const operators = document.querySelectorAll('.operatorButtons');
operators.forEach((button) => {
    button.addEventListener('click', (event) => {
        operator = event.target.innerText;
        equationStage = 2;
        operatorDisplay.innerText = operator
        console.log(operator, equationStage)
    });
});

const equals = document.getElementById('equals');
equals.addEventListener('click', (event) => {
    let answer;
    equationStage = 0;
    operatorDisplay.innerText = ""
    switch(operator) {
        case "x":
            answer = Number(firstNumber) * Number(secondNumber);
            if (answer.toString().length >= 7) {
                display.innerText = answer.toFixed(8);
                firstNumber = answer;
                secondNumber = 0
                break;
            }
            display.innerText = answer
            firstNumber = answer;
            secondNumber = 0
            break;
        case "÷":
            answer = Number(firstNumber) / Number(secondNumber);
            if (answer.toString().length >= 7) {
                display.innerText = answer.toFixed(8);
                firstNumber = answer;
                secondNumber = 0
                break;
            }
            display.innerText = answer
            firstNumber = answer;
            secondNumber = 0
            break;     
        case "-":
            answer = Number(firstNumber) - Number(secondNumber);
            if (answer.toString().length >= 7) {
                display.innerText = answer.toFixed(8);
                firstNumber = answer;
                secondNumber = 0
                break;
            }
            display.innerText = answer
            firstNumber = answer;
            secondNumber = 0
            break;
        case "+":
            answer = Number(firstNumber) + Number(secondNumber);
            if (answer.toString().length >= 7) {
                display.innerText = answer.toFixed(8);
                firstNumber = answer;
                secondNumber = 0
                break;
            }
            display.innerText = answer
            firstNumber = answer;
            secondNumber = 0
            break;
    }
});
function numberSet(numberSelected, firstNumber, secondNumber, equationStage) {
    if (!firstNumber) {
        firstNumber = numberSelected;
        return firstNumber;
    }
    else if (firstNumber && equationStage === 1) {
        newNumber = firstNumber + numberSelected;
        return newNumber;
    }
    if (!secondNumber && equationStage === 3 ) {
        secondNumber = numberSelected;
        return secondNumber;
    }
    else if (secondNumber && equationStage === 3) {
        newNumber = secondNumber + numberSelected;
        return newNumber;
    }
}

