console.log("this is user authentication application");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const number = document.getElementById("number");
let validname = false;
let validemail = false;
let validnumber = false;

userName.addEventListener("blur", () => {
  console.log("blurr");
  let regex = /^[a-zA-Z]([0-9a-zA-Z]){2,10}$/;
  let str = userName.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("it matched");
    userName.classList.remove("is-invalid");
    validname = true;
  } else {
    console.log("no match");
    userName.classList.add("is-invalid");
    validname = false;
  }
});

email.addEventListener("blur", () => {
  console.log("blurr email");
  let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([_\-\.0-9a-zA-Z]+)$/;
  let str = email.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("it matched");
    email.classList.remove("is-invalid");
    validemail = true;
  } else {
    console.log("no match");
    email.classList.add("is-invalid");
    validemail = false;
  }
});

number.addEventListener("blur", () => {
  console.log("blurr number");
  let regex = /^([0-9]){10}$/;
  let str = number.value;
  console.log(regex, str);
  if (regex.test(str)) {
    console.log("it matched");
    number.classList.remove("is-invalid");
    validnumber = true;
  } else {
    console.log("no match");
    number.classList.add("is-invalid");
    validnumber = false;
  }
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  console.log("you clicked on submit");
  if (validnumber && validname && validemail) {
    let success = document.getElementById("success");
    success.classList.add("show");
    setTimeout(() => {
      success.classList.remove("show");
    }, 3000);
  } else {
    let failed = document.getElementById("failed");
    failed.classList.add("show");

    setTimeout(() => {
      failed.classList.remove("show");
    }, 3000);

    console.log(failed);
  }
});
