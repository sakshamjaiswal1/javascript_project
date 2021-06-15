// store all the data to the local storage
//  add the delete button
// add a scroolbar to the view

console.log("this is index.js");

// constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}
// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
  console.log("adding");
  tableBody = document.getElementById("tableBody");
  let uiString = ` <tr>
                  
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>
   
  `;
  tableBody.innerHTML += uiString;
};
// implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  //   libraryForm.reset();
  libraryForm.reset();
};
// Display validate function
Display.prototype.validate = function (book) {
  if (book.name.length > 2 || book.author.length > 2) {
    return true;
  } else {
    return false;
  }
};
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `
   <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>Message: </strong>${displayMessage}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
  setTimeout(() => {
    message.innerHTML = "";
  }, 2000);
};

// Add submit Eventlistner to form

let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let author = document.getElementById("author").value;
  let type;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("computer");

  let cooking = document.getElementById("cooking");
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);

  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book is successfully submitted!");
  } else {
    // Show Error
    display.show("danger", "Please  enter a valid name of the book!");
  }
}
