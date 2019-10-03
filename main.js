
document.body.onload = loadCalculator;

let calcButtons = ['AC', '+/-', '%', '\xF7', 7, 8, 9, '\xD7', 4, 5, 6, '-', 1, 2, 3, '+', 'C', '.', 0, '='];
let count = 0;

var app = document.getElementById('app');
var input = "";
var firstEntry = "";
var operator = "";
var followingEntry = "";

var previousOperator = "";
var checkEqualPressed = false;
var operations = {
   '+': function (a, b) { return a + b },
   '-': function (a, b) { return a - b },
   '\xD7': function (a, b) { return a * b },
   '\xF7': function (a, b) { return a / b },
};
var inputArray = [];

function updateVars() {
   if (checkEqualPressed) {
      operator = "";
      followingEntry = "";
      checkEqualPressed = false;
      previousOperator = "";
   }
}

// Add each entry to the array
function storeButtonsPressed(b) {

   inputArray.push(input);          // Puts numbers input into main array
   input = "";                      // Clears input for next number input

   if (b == '+' || b == '-' || b == '\xF7' || b == '\xD7') {
      inputArray[0] = inputArray.join("");      // 
      console.log(inputArray[0]);
   } 
   
   inputArray.push(b);
   console.log({b});
   console.log({inputArray});
   // console.log({ input, b, firstEntry, operator, followingEntry });
}

// When a button is pressed
function btnPress() {
   var buttonPressed = this.id;

   switch (buttonPressed) {

      case 'AC':
         input = "";
         inputArray = [];
         calcDisplay.innerHTML = "0";
         break;

      case 'C':
         // if inputArray.length = 3, pop last and operator
         // if = 2, clear all
         var output = "0";
         if(inputArray.length > 2){
            inputArray.pop();
            output = inputArray[0];
         } else {
            inputArray = [];
         }
         calcDisplay.innerHTML = output;
         break;

      case '+/-':
         updateVars();
         input *= -1;
         firstEntry = input;
         calcDisplay.innerHTML = input;

         break;

      case '%':
         updateVars();
         input /= 100;
         firstEntry = input;
         calcDisplay.innerHTML = input;

         break;

      case '.':
         updateVars();
         if (!input.includes('.')) {
            input += buttonPressed
            calcDisplay.innerHTML = input;
         }
         break;

      case '=':
         storeButtonsPressed(buttonPressed);    // Puts second round of numbers into array

         console.log(inputArray);
         var calculate = operations[inputArray[1]](Number(inputArray[0]), Number(inputArray[2]));
         console.log(calculate);
         calcDisplay.innerHTML = calculate;
         // storeButtonsPressed(buttonPressed);
         // var lastEntry = inputArray.join(""); // string 22,+,4,4
         // lastEntry = lastEntry.split(inputArray[1]); // array 22, 44
         // var lastEntry = inputArray[0];
         // console.log({lastEntry});
         // firstEntry = operations[inputArray[1]](Number(lastEntry[0]), Number(lastEntry[1]));
         // calcDisplay.innerHTML = firstEntry;
         break;

      case '+':
      case '-':
      case '\xF7':
      case '\xD7':

         storeButtonsPressed(buttonPressed);
         
         // var lastEntry = inputArray.join(""); // string 22,+
         // console.log({lastEntry});
         // lastEntry = lastEntry.split(inputArray[1]); 
         // console.log({lastEntry});

         // if (inputArray.length > 2){       //  22, +, 4, +
            
         //    var tmp = operations[inputArray[1]](Number(inputArray[0]), Number(inputArray[2]));
         //    inputArray = [];
         //    inputArray.push(tmp);
         //    console.log(tmp);
         // }

         
         // calcDisplay.innerHTML = firstEntry;
         // secondOpPress = true;
         // console.log({ firstEntry, operator, followingEntry, previousOperator });

         updateVars();
         //storeButtonsPressed(buttonPressed);
         break;

      default:
         // console.log({ input })
         if (checkEqualPressed) {
            input = "0";
            // firstEntry = "";
            // operator = "";
            // followingEntry = "";
            checkEqualPressed = false;
         }
         if (input == "0") {              // Prevents stand alone repeating zeros
            input = "";
         }
         if (input.length < 11) {         // Caps input display to 10 characters
            input += buttonPressed        // Concats consecutive number presses
         }
         
         calcDisplay.innerHTML = input;   // Displays input
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