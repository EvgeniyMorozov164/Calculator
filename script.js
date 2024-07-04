const display = document.querySelector("#display");
const clearBtn = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const digits = document.querySelector(".digits-container");
const operators = document.querySelector(".operators-container");

const DIGITS = "0123456789";
const OPERATORS = "+-*/=.";

let displayStorage = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";

clearBtn.addEventListener("click", () => {
  clearDisplay();
});

backspace.addEventListener("click", () => {
  console.log("click");
});

digits.addEventListener("click", (e) => {  
  if (e.target.id === "." && display.value === "") {
    return;
  }
  displayStorage += e.target.id;
  display.value += e.target.id;  
});

operators.addEventListener("click", (e) => {
  if (e.target.id !== "-" && display.value === "") {
    return;
  }  

  displayStorage += e.target.id;
  display.value += e.target.id;  

  if (e.target.id === "=" && display.value !== "") {
    compute(displayStorage);
  }
});

const compute = (str) => {  
  let result = 0;
  getOperators(str);
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = firstOperand / secondOperand;
      break;
  }  
  clearDisplay();
  displayStorage = result.toString();
  display.value = result.toString();
}

const clearDisplay = () => {
  displayStorage = "";
  display.value = "";
}

const getOperators = (str) => { 
  let arr = str.split("");
  let index = 0;
  arr.pop();
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    if (OPERATORS.includes(cur)) {      
      index = i;      
    }
  }
  firstOperand = Number(arr.slice(0, index).join(""));
  operator = arr.at(index);
  secondOperand = Number(arr.slice(index + 1, str[str.length]).join(""));
  
}

