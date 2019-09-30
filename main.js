
document.body.onload = loadCalculator;

let calcButtons = ['AC', '+/-', '%', '\xF7', 7, 8, 9, '\xD7', 4, 5, 6, '-', 1, 2, 3, '+', 'C', '.', 0, '='];
let count = 0;

var app = document.getElementById('app');
var input = "";
var firstEntry = "";
var operator = "";
var followingEntry = "";

// When a button is pressed
function btnPress() {
   var buttonPressed = this.id;

   switch (buttonPressed) {
      case '+':
      case '-':
      case '\xF7':
      case '\xD7':
         if (buttonPressed == '+', '-', '\xF7', '\xD7') {
            operator = buttonPressed;
            console.log(operator);
            console.log(input);
         }
         if (operator == '+', '-', '\xF7', '\xD7') {
            firstEntry = input;
            input = buttonPressed;


            console.log(firstEntry);
            console.log(input);
            
            
         }
         break;


      default:
         if (input.length < 11) {
            input += buttonPressed
         }
         calcDisplay.innerHTML = input;

   }
   // if (numberize != String && isNaN(numberize) != true) {
   //    // calcDisplay.innerHTML = numberize;
   //    if (firstEntry.length < 11) {
   //       firstEntry += numberize.toString();
   //       calcDisplay.innerHTML = firstEntry;
   //    } 
   // }
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