let firstNumber = "";
let secondNumber = "";
let equationStage = 0;
let operator;
let enabled = true;

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
            enabled = true;
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
    operate()
});

const cancel = document.getElementById('C');
cancel.addEventListener('click', (event) => {
    firstNumber = 0;
    secondNumber = 0;
    operator = 0;
    answer = 0;
    display.innerText = "";
    operatorDisplay.innerText = "";
    enabled = true;
});

const backspace = document.getElementById('backspace');
backspace.addEventListener('click', (event) => {
    if (equationStage === 1 || equationStage === 2) {
        if (firstNumber.length > 1) {
            firstNumber = firstNumber.slice(-0,-1);
            display.innerText = firstNumber;
        }
        else {
            firstNumber = "";
            display.innerText = firstNumber;
        }
    }
    else {
        if (secondNumber.length > 1) {
            secondNumber = secondNumber.slice(-0,-1);
            display.innerText = secondNumber;
        }
        else {
            secondNumber = "";
            display.innerText = secondNumber;
        }
    }
});

const decimal = document.getElementById('decimal');
decimal.addEventListener('click', (event) => {
    console.log(enabled)
    if (enabled === true) {
        switch (equationStage) {
            case 1:
                firstNumber = firstNumber + ".";
                enabled = false;
                display.innerText = firstNumber;
                console.log(firstNumber)
                break;
            case 2:
                firstNumber = firstNumber + ".";
                enabled = false;
                display.innerText = firstNumber;
                console.log(firstNumber)
                break;
            case 3:
                secondNumber = secondNumber + ".";
                enabled = false;
                display.innerText = secondNumber;
                console.log(secondNumber)
                break;
        }
    }
    else {
        return;
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

function operate() {
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
            if (secondNumber === "0") {
                display.innerText = "Nice Try"
                break;
            }
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
};
