console.log('this is note taking app');
shownotes();

// if user add a note add it to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let titleEntered= document.getElementById('titleEntered')
  let notes = localStorage.getItem("notes");
  let titlestored=localStorage.getItem("title");
  let notesObj = [];
  let titleObj=[];

  // initilizing the values
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if (titlestored == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titlestored);
  }
// storing the values
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notesObj);
  titleObj.push(titleEntered.value);
  localStorage.setItem("title", JSON.stringify(titleObj));
  titleEntered.value = "";
  console.log(titleObj);


  shownotes();
});

// function to show elements from localstorage
function shownotes() {
  let notes = localStorage.getItem("notes");
  let titlestored=localStorage.getItem("title");

  let notesObj = [];
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (titlestored == null) {
    titleObj = [];
  } else {
    titleObj = JSON.parse(titlestored);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class=" my-2  mx-2 notecard" style="width: 18rem;">
      <div class=" card-body">
        
        <p class="card-text">${element}</p>
        <button id="${index + 1}"onclick='deletenote(this.id)' class="btn btn-primary">Delete Note</button>
      </div>
    </div>
      `;
  });
  let html1 = " ";
  titleObj.forEach(function (element, index) {
    html1 += `
    <div class=" my-2  mx-2 notecard" style="width: 18rem;">
            <h4>${element}</h4>
            </div>
      `;
  });
  let titleElem=document.getElementById('titlebox')
  let noteselm = document.getElementById('notes')
  if (notesObj.length != 0 ) {
    noteselm.innerHTML = html;
    // titleElem.innerHTML=html1;
  }
  else {
    noteselm.innerHTML = `<h3>Nothing to show! Use "Add a Note" section above to add notes</h3>`
  }
  if (titleObj.length != 0 ) {
  
    titleElem.innerHTML=html1;
  }
}

//  function to dlete note

function deletenote(index) {
  console.log('i am deleting', index);
  let notes = localStorage.getItem("notes");
  let titlestored=localStorage.getItem("title");

  let notesObj = []
  let titleObj=[];

  let index1 = index - 1
  if (notes == null) {
    notesObj = [];
  } else {
    titleObj = JSON.parse(titlestored);

    notesObj = JSON.parse(notes);
    notesObj.splice(index1, 1);
    titleObj.splice(index1,1);
  }

  console.log(notesObj)
  console.log(titleObj)
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("title", JSON.stringify(titleObj));


  shownotes();
}

let search = document.getElementById('searchtxt');

search.addEventListener('input', function () {
  let inputVal = search.value.toLowerCase()
 
  let noteCards = document.getElementsByClassName('notecard')
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = 'block'
    }
    else {
      element.style.display = 'none';
    }
  })
})

// ADD TITLE
// MARK a note as important
// seprate notes by user
// sync with server and host