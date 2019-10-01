
document.body.onload = loadCalculator;

let calcButtons = ['AC', '+/-', '%', '\xF7', 7, 8, 9, '\xD7', 4, 5, 6, '-', 1, 2, 3, '+', 'C', '.', 0, '='];
let count = 0;

var app = document.getElementById('app');
var input = "";
var firstEntry = "";
var operator = "";
var followingEntry = "";
var doMath = 0;
var operations = {
   '+': function(a, b) { return a + b },
   '-': function(a, b) { return a - b },
   '\xD7': function(a, b) { return a * b },
   '\xF7': function(a, b) { return a / b },
};

function storeButtonsPressed(b) {

   if (b == '+' || b == '-' || b == '\xF7' || b == '\xD7') {
      operator = b;
   }
   if (firstEntry == "") {
      firstEntry = input;
   } else {
      followingEntry = input;
   }
   input = "";

}

// When a button is pressed
function btnPress() {
   var buttonPressed = this.id;

   switch (buttonPressed) {

      case 'AC':
            storeButtonsPressed(buttonPressed);
            calcDisplay.innerHTML = calcDisplay.innerHTML *= 0;

      case '+/-':
         storeButtonsPressed(buttonPressed);
         calcDisplay.innerHTML = calcDisplay.innerHTML *= -1;

      case '=':
         storeButtonsPressed(buttonPressed);
         calcDisplay.innerHTML = operations[operator](Number(firstEntry), Number(followingEntry));
         break;

      case '+':
         storeButtonsPressed(buttonPressed);
         break;

      case '-':
         storeButtonsPressed(buttonPressed);
         break;

      case '\xF7':
         storeButtonsPressed(buttonPressed);
         break;

      case '\xD7':
         storeButtonsPressed(buttonPressed);
         break;

      default:
         console.log({ input })
         if (input.length < 11) {
            input += buttonPressed
         }
         calcDisplay.innerHTML = input;

   }
}

// Create Calculator UI
function loadCalculator() {
   var title = document.createElement('p');
   title.innerHTML = "Calculated.";
   title.className = "h2 text-center";
   app.appendChild(title);

   var calcDisplay = document.createElement('p');
   calcDisplay.innerHTML = "0";
   calcDisplay.id = "calcDisplay";
   calcDisplay.className = "h2 text-right pr-4 pt-3";
   app.append(calcDisplay);

   var newDiv = document.createElement('div');
   newDiv.className = "container";
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
      newDiv.appendChild(rowDiv);
   }
   app.appendChild(newDiv);
}