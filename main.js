
document.body.onload = loadCalculator;

let calcButtons = ['AC', '+/-', '%', '\xF7', 7, 8, 9, '\xD7', 4, 5, 6, '-', 1, 2, 3, '+', 'C', '.', 0, '='];
let count = 0;

var app = document.getElementById('app');
var input = "";
var firstEntry = "";
var previousOperator = "";
var operator = "";
var followingEntry = "";
var checkEqualPressed = false;
var operations = {
   '+': function (a, b) { return a + b },
   '-': function (a, b) { return a - b },
   '\xD7': function (a, b) { return a * b },
   '\xF7': function (a, b) { return a / b },
};

function updateVars() {
   if (checkEqualPressed) {
      operator = "";
      followingEntry = "";
      checkEqualPressed = false;
   }
   followingEntry = "";
}

function storeButtonsPressed(b) {

   if (b == '+' || b == '-' || b == '\xF7' || b == '\xD7') {
      operator = b;
      checkEqualPressed = false;
      input = "";
   } else {
      if (!checkEqualPressed) {
         input = "";
      }
      checkEqualPressed = true;
   }
   console.log({ input, b, firstEntry, previousOperator, operator, followingEntry });
}

// When a button is pressed
function btnPress() {
   var buttonPressed = this.id;

   switch (buttonPressed) {

      case 'AC':
         input = "0";
         firstEntry = "";
         operator = "";
         followingEntry = "";
         calcDisplay.innerHTML = input;
         checkEqualPressed = false;
         break;

      case 'C':

         input = "0";
         if (followingEntry === "") {
            firstEntry = "";
         }
         followingEntry = "";
         calcDisplay.innerHTML = input;
         checkEqualPressed = false;
         break;

      case '+/-':
         // updateVars();
         if (checkEqualPressed) {
            input = calcDisplay.innerHTML;
            firstEntry = input;
            followingEntry = "";
         }
         input *= -1;
         if (followingEntry != "") {
            followingEntry = input;
         } else {
            firstEntry = input;
         }
         calcDisplay.innerHTML = input;
         checkEqualPressed = false;
         console.log({ input, firstEntry, previousOperator, operator, followingEntry });

         break;

      case '%':
         // updateVars();
         if (checkEqualPressed) {
            input = calcDisplay.innerHTML;
            firstEntry = input;
            followingEntry = "";
         }
         input /= 100;
         if (followingEntry != "") {
            followingEntry = input;
         } else {
            firstEntry = input;
         }
         calcDisplay.innerHTML = input;
         checkEqualPressed = false;
         console.log({ input, firstEntry, previousOperator, operator, followingEntry });
         // firstEntry = input;
         // calcDisplay.innerHTML = input;
         // checkEqualPressed = false;
         break;

      case '.':
         // updateVars();
         if (checkEqualPressed) {
            followingEntry = "";
            if (input == "") {
               firstEntry = "0.";
            }
            // input = calcDisplay;
            operator = "";
            console.log({ input, firstEntry, previousOperator, operator, followingEntry });

            checkEqualPressed = false;
         }
         if (operator !== "") {
            if (!input.includes('.')) {
               if (input == "") {
                  followingEntry = "0";
               }
               followingEntry += buttonPressed;
               calcDisplay.innerHTML = followingEntry;
            }
         }
         else {
            if (operator == "") {
               if (!input.includes('.')) {
                  input += buttonPressed;
                  firstEntry = input;
                  calcButtons.innerHTML = firstEntry;
               }
            }
         }
         break;

      case '=':
         if (operator === "") {
            input = "0";
            firstEntry = "";
            operator = "";
            followingEntry = "";
            calcDisplay.innerHTML = input;
            checkEqualPressed = false;
         } else {
            storeButtonsPressed(buttonPressed);
            firstEntry = operations[operator](Number(firstEntry), Number(followingEntry));
            console.log({ input, firstEntry, previousOperator, operator, followingEntry });

            calcDisplay.innerHTML = firstEntry;
            checkEqualPressed = true;
         }
         break;

      case '+':
      case '-':
      case '\xF7':
      case '\xD7':
         if (checkEqualPressed) {
            followingEntry = "";
         }
         console.log({ input, firstEntry, previousOperator, operator, followingEntry });
         if (followingEntry != "") {
            firstEntry = operations[previousOperator](Number(firstEntry), Number(followingEntry));
            calcDisplay.innerHTML = firstEntry;
            console.log({ input, firstEntry, previousOperator, operator, followingEntry });
         }
         updateVars();
         storeButtonsPressed(buttonPressed);
         break;

      default:
         if (checkEqualPressed) {
            input = "0";
            firstEntry = "";
            operator = "";
            followingEntry = "";
            checkEqualPressed = false;
         }
         if (input == "0") {
            input = "";
            firstEntry = "";
         }
         if (input.length < 11) {      // Cap input to 10 numbers
            if (operator != "") {
               followingEntry += buttonPressed;
               previousOperator = operator;
               calcDisplay.innerHTML = followingEntry;
            } else {
               firstEntry += buttonPressed;
               calcDisplay.innerHTML = firstEntry;
            }
         }
         input = calcDisplay.innerHTML;
         console.log({ input, firstEntry, previousOperator, operator, followingEntry });

   }
}

// Create Calculator UI
function loadCalculator() {
   var newDiv = document.createElement('div');
   newDiv.className = "container mx-auto";
   newDiv.setAttribute("style", "height: 320px");

   var calculator = document.createElement('div');
   calculator.className = "mx-auto h-100";
   calculator.setAttribute("style", "width: 220px");


   var title = document.createElement('p');
   title.innerHTML = "Calculated.";
   title.className = "h2 text-center";
   calculator.appendChild(title);

   var calcDisplay = document.createElement('p');
   calcDisplay.innerHTML = "0";
   calcDisplay.id = "calcDisplay";
   calcDisplay.className = "h2 text-right pr-4 pt-3";
   calculator.append(calcDisplay);

   for (let i = 0; i < 5; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.className = "row justify-content-center";

      for (let j = 0; j < 4; j++) {
         var colDiv = document.createElement('div');
         colDiv.className = "col-3 border btn-warning text-center p-2";
         colDiv.setAttribute("style", "height: 10vh");
         colDiv.id = calcButtons[count];
         let labels = document.createTextNode(calcButtons[count]);
         count++;
         colDiv.addEventListener('click', btnPress);
         colDiv.appendChild(labels);
         rowDiv.appendChild(colDiv);
      }
      calculator.appendChild(rowDiv);
   }
   newDiv.appendChild(calculator);
   app.appendChild(newDiv);
}