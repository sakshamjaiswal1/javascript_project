console.log("Mini Postman");
// utility functions
// utility function to get dom element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// initilize number of parameters
let addedParamCount = 0;

// hide the parameterBox initially
let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none";

//  if user click json Hide params
let paramsRadio = document.getElementById("paramsRadio");

paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parameterBox").style.display = "block";
});

//  if user click params Hide Json
let jsonRadio = document.getElementById("jsonRadio");

jsonRadio.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

// if the user click on plus button add more parameters

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `  <div class="form-row d-flex my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${
      addedParamCount + 2
    }</label>
    <div class="col-md-4 mx-2">
      <input
        type="text"
        class="form-control"
        id="parameterKey${addedParamCount + 2}"
        placeholder="Enter Parameter ${addedParamCount + 2} Key"
      />
    </div>
    <div class="col-md-4 mx-2">
      <input
        type="text"
        class="form-control"
        id="parameterValue${addedParamCount + 2}"
        placeholder="Enter Parameter ${addedParamCount + 2} Value"
      />
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
  </div>`;
  //   convert the element string to dom node
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);
  // add an event lister to remove
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      // addedParamCount=addedParamCount++
    });
  }
  addedParamCount++;
});

// handling th submit request

let submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  // show please wait in the response box for the user
  document.getElementById("responsePre").innerHTML =
    "Please wait...Fetching Response";

  // fetch all the values user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;
  console.log(contentType);
  // collecting params in object
  if (contentType == "params") {
    data = {};

    for (let index = 0; index < addedParamCount + 1; index++) {
      if (document.getElementById(`parameterKey${index + 1}`)) {
        let key = document.getElementById(`parameterKey${index + 1}`).value;
        let value = document.getElementById(`parameterValue${index + 1}`).value;
        data[key] = value;
        console.log(index);
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  //   for debugging
  console.log(
    "URL is ",
    url,
    "requestType is ",
    requestType,
    "contentType is",
    contentType,
    "data is",
    data
  );
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
     
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }  
    }).then(response=>response.text()).then(text=>{
        // document.getElementById("responseJsonText").value =text
        document.getElementById("responsePre").innerHTML =text
        Prism.highlightAll();
    })
  }
  else{
    fetch(url, {
        method: "POST",
        body:data,
      }).then(response=>response.text()).then(text=>{
          // document.getElementById("responseJsonText").value =text
        document.getElementById("responsePre").innerHTML =text
        Prism.highlightAll();
      }) 
  }
});
