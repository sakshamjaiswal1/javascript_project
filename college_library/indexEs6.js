console.log("this is ES6 version otf the library app");
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}
class Display {
  add(book) {
    console.log("adding");
    let tableBody = document.getElementById("tableBody");
    let uiString = ` <tr>
                  
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>
   
  `;
    tableBody.innerHTML += uiString;
  }
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    //   libraryForm.reset();
    libraryForm.reset();
  }
  validate(book) {
    if (book.name.length > 2 || book.author.length > 2) {
      return true;
    } else {
      return false;
    }
  }
  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldtext;
    if (type === "success") {
      boldtext = "Success!";
    } else {
      boldtext = "Error!";
    }
    message.innerHTML = `
   <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${boldtext} </strong>${displayMessage}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 5000);
  }
}
class library {
  constructor(bookList) {
    this.bookList = bookList;
    this.issuedBooks = {};
  }
  getBookList() {
    this.bookList.forEach((element) => {
      console.log(element);
    });
  }
  issueBookList(bookName, user) {
    if (this.issuedBooks[bookName] == undefined) {
      this.issuedBooks[bookName] = user;
    } else {
      console.log("This book is already issued");
    }
  }
  returnBookList(bookName) {
    delete this.issuedBooks[bookName];
  }
}

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
    display.show("success", "Your book is successfully submitted.");
  } else {
    // Show Error
    display.show("danger", "Please  enter a valid name of the book.");
  }
}
