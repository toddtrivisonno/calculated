
document.body.onload = loadCalculator;

let calcButtons = ['AC', '+/-', '%', '\xF7', 7, 8, 9, '\xD7', 4, 5, 6, '-', 1, 2, 3, '+', 'C', '.', 0, '='];
let count = 0;

var app = document.getElementById('app');
var input = "";
var firstEntry = "";
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
}

function storeButtonsPressed(b) {
   if (firstEntry == "") {
      firstEntry = input;
      // input = "";
   } else {
      if (!checkEqualPressed) {
         followingEntry = input;
      }
   }
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
   // console.log({ input, b, firstEntry, operator, followingEntry });
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
         calcDisplay.innerHTML = input;
         checkEqualPressed = false;
         break;

      case '+/-':
         updateVars();
         input *= -1;
         firstEntry = input;
         calcDisplay.innerHTML = input;
         checkEqualPressed = false;
         break;

      case '%':
         updateVars();
         input /= 100;
         firstEntry = input;
         calcDisplay.innerHTML = input;
         checkEqualPressed = false;
         break;

      case '.':
         updateVars();
         if (!input.includes('.')) {
            input += buttonPressed
            calcDisplay.innerHTML = input;
         }
         break;

      case '=':
         storeButtonsPressed(buttonPressed);
         firstEntry = operations[operator](Number(firstEntry), Number(followingEntry));
         console.log({ followingEntry });

         calcDisplay.innerHTML = firstEntry;
         checkEqualPressed = true;
         break;

      case '+':
      case '-':
      case '\xF7':
      case '\xD7':
         updateVars();
         storeButtonsPressed(buttonPressed);
         break;

      default:
         // console.log({ input })
         if (checkEqualPressed) {
            input = "0";
            firstEntry = "";
            operator = "";
            followingEntry = "";
            checkEqualPressed = false;
         }
         if (input == "0") {
            input = "";
         }
         if (input.length < 11) {
            input += buttonPressed
         }
         calcDisplay.innerHTML = input;
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