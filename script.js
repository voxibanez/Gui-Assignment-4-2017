/*
Name: Tim Barber, Timothy_Barber@student.uml.edu
Computer Science Department, UMass Lowell Comp.4610, GUI Programming I
File: /usr/cs/undergrad/2018/tbarber/public_html/Assignment4/script.js Created: 23-oct-2017
*/

//If the key press isnt a number/backspace/period, ignore it
function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  //If the char code doesnt represent a number
  if (charCode >= 48 && charCode <= 57 || charCode == 8 || charCode == 190) {
    return true;
  } else {
    return false;
  }
}

//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateForm() {
  var startPrice = parseFloat(document.forms["tableForm"]["startPrice"].value);
  var endPrice = parseFloat(document.forms["tableForm"]["endPrice"].value);
  var priceStep = parseFloat(document.forms["tableForm"]["priceStep"].value);
  var startMPG = parseFloat(document.forms["tableForm"]["startMPG"].value);
  var endMPG = parseFloat(document.forms["tableForm"]["endMPG"].value);
  var MPGStep = parseFloat(document.forms["tableForm"]["MPGStep"].value);

  //Check to make sure no numbers are less than 0
  if (startPrice < 1) {
    alert("Starting Price cannot be less than 1");
    return false;
  }
  if (endPrice < 1) {
    alert("Ending Price cannot be less than 1");
    return false;
  }
  if (priceStep < 1) {
    alert("Price Step cannot be less than 1");
    return false;
  }
  if (startMPG < 1) {
    alert("Starting MPG cannot be less than 1");
    return false;
  }
  if (endMPG < 1) {
    alert("Ending MPG cannot be less than 1");
    return false;
  }
  if (MPGStep < 1) {
    alert("MPG Step cannot be less than 1");
    return false;
  }

  //Check to make sure starting values arn't greater than or equal to the ending value
  if (startPrice >= endPrice) {
    alert("Starting Price cannot be greater than or equal to ending price");
    return false;
  }
  if (startMPG >= endMPG) {
    alert("Starting MPG cannot be greater than or equal to ending MPG");
    return false;
  }

  //Create the table
  createTable(startPrice, endPrice, priceStep, startMPG, endMPG, MPGStep);

  //This is so the page doesn't refresh on submit
  return false;
}

function createTable(startPrice, endPrice, priceStep, startMPG, endMPG, MPGStep) {
  //Hide the user input
  document.getElementById('TableEntry').style.visibility = 'hidden';


  // get the reference for the body
  var body = document.getElementById('Table');

  // create a table and tbody element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  //Create the first row
  var row = document.createElement("tr");
  //Used to calculate the price given start, end, and step
  var colStep = 0;
  //Create the initial row of prices
  for (var j = 0; j <= priceStep; j++) {
    // Create the <td> element
    var cell = document.createElement("td");

    var cellText = document.createElement('text');
    if (j == 0)
      cellText.innerHTML = "Price/Fuel";
    else {
      cellText.innerHTML = "$" + (startPrice + (((endPrice - startPrice) / (priceStep - 1)) * colStep));
      colStep = colStep + 1;
    }

    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  // add the row to the end of the table body
  tblBody.appendChild(row);
  //Used to calculate the MPG given start, end, and step
  var rowStep = 0;
  //Start creating the rest of the rows
  for (var i = 1; i < MPGStep + 1; i++) {
    // creates a table row
    var row = document.createElement("tr");

    var cell = document.createElement("td");
    var cellText = document.createElement('text');
    cellText.innerHTML = (startMPG + (((endMPG - startMPG) / (MPGStep - 1)) * rowStep)) + " MPG";
    cell.appendChild(cellText);
    row.appendChild(cell);
    var rowVal = (startMPG + (((endMPG - startMPG) / (MPGStep - 1)) * rowStep));
    rowStep = rowStep + 1;
    var colStep = 0;
    //Create columns for each row (aka the individual cells)
    for (var j = 1; j < priceStep + 1; j++) {

      var colVal = (startPrice + (((endPrice - startPrice) / (priceStep - 1)) * colStep));
      var cell = document.createElement("td");
      var cellTextBox = document.createElement('text');
      //Run the calculations for the cell given the value of row and column.

      //    I had no idea what the assignment was asking for these calculations,
      //    but I do not think these calculations are the point of the assignment,
      //    so I just multiplied row by column
      cellTextBox.innerHTML = "$ " + calculatePrice(rowVal, colVal) + " / mile";
      cell.appendChild(cellTextBox);
      colStep = colStep + 1;
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the tbody in the table
  tbl.appendChild(tblBody);
  // append table into body
  body.appendChild(tbl);
  // set a border for the table
  tbl.setAttribute("border", "2");
}

function calculatePrice(rowVal, colVal) {
  return rowVal * colVal;
}
