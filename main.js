
document.body.onload = loadCalculator;

let calcButtons = ['AC', '+/-', '%', '\xF7', '7', '8', '9', '\xD7', '4', '5', '6', '-', '1', '2', '3', '+', 'C', '.', '0', '='];
let count = 0;

var app = document.getElementById('app');

function loadCalculator() {
   // Create Calculator UI
   var title = document.createElement('p');
   title.innerHTML = "Calculated.";
   title.className = "h2 text-center";
   app.appendChild(title);

   // var displayDiv = document.createElement('div');
   // displayDiv.className = "container";

   var calcDisplay = document.createElement('p');
   calcDisplay.innerHTML = "0";
   calcDisplay.id = "calcDisplay";
   calcDisplay.className = "h3 text-right pr-4 pt-3";
   app.append(calcDisplay);

   var newDiv = document.createElement('div');
   newDiv.className = "container";
   for (let i = 0; i < 5; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.className = "row justify-content-center";

      for (let j = 0; j < 4; j++) {
         var colDiv = document.createElement('div');
         colDiv.className = "col-3 border btn-warning";
         colDiv.setAttribute("style", "height: 4em");
         colDiv.id = count;
         let labels = document.createTextNode(calcButtons[count]);
         count++;
         colDiv.appendChild(labels);
         rowDiv.appendChild(colDiv);
      }
      newDiv.appendChild(rowDiv);
   }
   app.appendChild(newDiv);
}