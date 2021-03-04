const buttonsContainer = document.querySelector('#buttons-container');
const dotButton = document.querySelector('#dot');
const screen = document.querySelector('#screen');
let operator = null;
let answer = 0;
let screenValue = '' + answer;

updateScreen();

buttonsContainer.addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON'){
        const buttonValue = e.target.textContent;
        switch (e.target.id) {
            case 'clear':
                screenValue = '0';
                updateScreen();
                break;

            case 'clear-everything':
                screenValue = '0';
                answer = 0;
                operator = null;
                updateScreen();
                break;

            case 'change-sign':
                screenValue = '' + operate('changeSign', screenValue);
                updateScreen();
                break;

            case 'divide':
                if(operator){
                    answer = operate(operator, +answer, +screenValue);
                    screenValue = '' + answer;
                    updateScreen();                    
                }
                answer = screenValue;
                operator = 'divide';
                screenValue = '';
                break;

            case 'add':
                if(operator){
                    answer = operate(operator, +answer, +screenValue);
                    screenValue = '' + answer;
                    updateScreen();
                }
                answer = screenValue;
                operator = 'add';
                screenValue = '';
                break;

            case 'multiply':
                if(operator){
                    answer = operate(operator, +answer, +screenValue);
                    screenValue = '' + answer;
                    updateScreen();
                }
                answer = screenValue;
                operator = 'multiply';
                screenValue = '';
                break;

            case 'subtract':
                if(operator){
                    answer = operate(operator, +answer, +screenValue);
                    screenValue = '' + answer;
                    updateScreen();
                }
                answer = screenValue;
                operator = 'subtract';
                screenValue = '';
                break;

            case 'equals':
                if(operator){
                    answer = operate(operator, +answer, +screenValue);
                    screenValue = '' + answer;
                }
                if ( screenValue.length >= 20) {
                    screenValue = screenValue.substring(0, 20);
                }
                operator = null;
                updateScreen();
                break;

            default:
                if ( screenValue.length >= 20) {
                    screenValue = screenValue.substring(0, 20);
                } else {
                    screenValue += buttonValue;
                }

                if (screenValue.length > 1 && screenValue[0] == 0 && screenValue[1] != '.') {
                    screenValue = screenValue.slice(1);
                }
                updateScreen();
        }
    }
});

function updateScreen() {
    checkDot();
    screen.textContent = screenValue;
}

function checkDot() {
    if (screenValue.includes('.') && !dotButton.disabled) {
        dotButton.disabled = true;
    } else if (!screenValue.includes('.')) {
        dotButton.disabled = false;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return 'WHAT THE HELL?!';
    }
    return  a / b;
}

function changeSign(a) {
    return -a;
}

function operate(operator, ...array) {
    let result, a, b;
    if (array.length === 2) {
        a = array[0];
        b = array[1];
    } else if (array.length === 1) {
        a = array[0];
    } else {
        return 'Oops, something went wrong!';
    }

    switch (operator) {
        case 'add':
            result = add(a, b);
            break;

        case 'subtract':
            result = subtract(a, b);
            break;

        case 'multiply':
            result = multiply(a, b);
            break;

        case 'divide':
            result = divide(a, b);
            break;

        case 'changeSign':
            result = changeSign(a);
            break;
    }
    return result;
}
