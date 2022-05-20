let screen = document.getElementById('screen');
let numbers = document.querySelectorAll('.row .numbers');
let operators = document.querySelectorAll('.row .operator');
let equal = document.getElementById('equals');


// =====> CLICK EVENTS PARA OS NÚMEROS:
numbers.forEach(number => number.addEventListener('click', event => {
    const numberBtn = event.target.innerHTML; // Igual ao evento de click realizado em algum dos números, incluindo '.' e 'C';
    
    if (numberBtn === 'C') {
        screen.innerHTML = 0; // screen.innerHTML é igual à info que está na tela (desde de número, operador, ou ambos); 
    } else if (screen.innerHTML.length > 15) {
        screen.innerHTML = screen.innerHTML.substr(0, 16) + "...";
    } else if (screen.innerHTML === '0'){
        screen.innerHTML = numberBtn;
    } else {
        screen.innerHTML += numberBtn;
    }
}));

// =====> CLICK EVENT PARA OS OPERADORES (+/-/x/÷):
operators.forEach(operator => operator.addEventListener('click', event => {
    const operatorBtn = event.target.innerHTML; // Igual ao evento de click realizado em algum dos operadores;
    let lastChar = screen.innerHTML[screen.innerHTML.length - 1]; /// Igual ao último character (número ou operador) na tela;

    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") { 
        let newOperator = screen.innerHTML.substring(0, screen.innerHTML.length -1) + operatorBtn; //se o ultimo character for um operador, o substitui pelo que foi clicado;
        screen.innerHTML = newOperator;
    } else if (screen.innerHTML == 0) {
        alert("Insira um número primeiro");
    } else {
      screen.innerHTML += operatorBtn;
    }
}));


// =====> CLICK EVENT PARA OS BOTÃO (=) :
equal.addEventListener("click", () => {
    let onScreen = screen.innerHTML; // info que está na tela;
    let numbers = onScreen.split(/\+|\-|\×|\÷/g); // array somente dos números que estiverem na tela;
    console.log(numbers);
    let operator = onScreen.replace(/[0-9]|\./g, "").split(""); // array somente dos operadores que estiverem na tela;
    console.log(operator);
  
    // realizando as contas conforme o operador informado pelo usuário
    let divide = operator.indexOf("÷"); // index === 0;
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operator.splice(divide, 1);
      divide = operator.indexOf("÷");
    }

    let multiply = operator.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operator.splice(multiply, 1);
      multiply = operator.indexOf("×");
    }
  
    let subtract = operator.indexOf("-"); 
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operator.splice(subtract, 1);
      subtract = operator.indexOf("-");
    }
  
    let add = operator.indexOf("+");
    while (add != -1) {
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operator.splice(add, 1);
      add = operator.indexOf("+");
    }
  
    screen.innerHTML = numbers[0]; // retorna o resultado da equação na tela;
  });