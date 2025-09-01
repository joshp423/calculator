let firstNumber = "";
let secondNumber = "";
let equationStage = 0;
let operator;
let enabled = true;

// events

const display = document.getElementById('displayBox');
const operatorDisplay = document.getElementById('operatorSignal')

const numbers = document.querySelectorAll(".numbers");
numbers.forEach((button) => {
    button.addEventListener('click', (event) => {
        let numberSelected = event.target.innerText
        if (!firstNumber) {
            equationStage = 1;
            firstNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
            display.innerText = firstNumber;
            return;
        }
        if (equationStage === 1) {
            firstNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
            display.innerText = firstNumber;
            return;
        }
        if (!secondNumber && equationStage ===2) {
            enabled = true;
            equationStage = 3;
        }
        secondNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
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
    });
});

const equals = document.getElementById('equals');
equals.addEventListener('click', (event) => {
    operate()
});

const cancel = document.getElementById('C');
cancel.addEventListener('click', (event) => {
    cancelLogic()
    
});

const backspace = document.getElementById('backspace');
backspace.addEventListener('click', (event) => {
    backspaceLogic()
});

const decimal = document.getElementById('decimal');
decimal.addEventListener('click', (event) => {
    decimalLogic();
});

// functions

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

function cancelLogic() {
    firstNumber = 0;
    secondNumber = 0;
    operator = 0;
    answer = 0;
    display.innerText = "";
    operatorDisplay.innerText = "";
    enabled = true;
}
function decimalLogic () {
    if (enabled === true) {
        switch (equationStage) {
            case 1:
                firstNumber = firstNumber + ".";
                enabled = false;
                display.innerText = firstNumber;
                break;
            case 2:
                firstNumber = firstNumber + ".";
                enabled = false;
                display.innerText = firstNumber;
                break;
            case 3:
                secondNumber = secondNumber + ".";
                enabled = false;
                display.innerText = secondNumber;
                break;
        }
    }
    else {
        return;
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
            if (secondNumber === "0" || secondNumber === "00" || secondNumber === "000") {
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

function backspaceLogic() {
    if (firstNumber.split("")[firstNumber.length - 1] === ".") {
        enabled = true;
    }
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
}

// keyboard support
document.addEventListener('keydown', (event) => {
    const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operatorKeys = ['/', '*', '+', '-'];
    if (numberKeys.includes(event.key) ) {
        let numberSelected = event.key
        if (!firstNumber) {
            equationStage = 1;
            firstNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
            display.innerText = firstNumber;
            return;
        }
        if (equationStage === 1) {
            firstNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
            display.innerText = firstNumber;
            return;
        }
        if (!secondNumber && equationStage ===2) {
            enabled = true;
            equationStage = 3;
        }
        secondNumber = numberSet(numberSelected, firstNumber, secondNumber, equationStage);
        if (equationStage === 3) {
            display.innerText = secondNumber;
            return;
        }
    }
    else if (operatorKeys.includes(event.key)) {
        operator = event.key;
        equationStage = 2;
        operatorDisplay.innerText = operator;
        return;
    }
    else if (event.key === "Backspace") {
        backspaceLogic();
        return;
    }
    else if (event.key === ".") {
        decimalLogic();
        return;
    }
    else if (event.key === "Enter") {
        operate();
    }
    else if (event.key === "Escape") {
        cancelLogic();
    }
});