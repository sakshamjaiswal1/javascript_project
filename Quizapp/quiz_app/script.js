let questionbox = document.getElementById("questionBox");
let source = "/realqstns21.json";
let apiKey = "";
// grab the news container
const xhr = new XMLHttpRequest();
xhr.open("GET", `${source}`, true);
// what to do when response is ready
xhr.onload = function () {
  if (this.status === 200) {
    const question = document.querySelector(".question");
    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const option5 = document.querySelector("#option5");
    const answers = document.querySelectorAll(".answer");
    const submit = document.querySelector("#submit");
    const showScore = document.querySelector("#showScore");

    let json = JSON.parse(this.responseText);
    // let articles = json.group;
    // console.log(json[0].name);
    // let questionHtml = "";

    // json.forEach(function (element) {
    //   console.log(element);
    //   let option = element.options;
    //   let question = ``;

    //   questionHtml = question;
    // });
    // insertQuestions.innerHTML = questionHtml;
    let questionCount = 0;
    let score = 0;
    const loadQuestions = () => {
      const questionList = json[questionCount];
      question.innerHTML = `Q${questionList.srno}: ${questionList.name}`;
      option1.innerText = questionList.options[1];
      option2.innerText = questionList.options[2];
      option3.innerText = questionList.options[3];
      option4.innerText = questionList.options[4];
      // option5.innerHTML = questionList.options[5];
    };
    loadQuestions();
    const getCheckAnswer = () => {
      let answer;
      answers.forEach((currAnsElem) => {
        if (currAnsElem.checked) {
          answer = currAnsElem.id;
        }
      });
      return answer;
    };
    submit.addEventListener("click", () => {
      const checkedAnswer = getCheckAnswer();
      console.log(checkedAnswer);
      if (checkedAnswer == json[questionCount].answer) {
        score++;
      }
      questionCount++;
      if (questionCount < json.length) {
        loadQuestions();
      } else {
        showScore.innerHTML = `
          <h2>our Score is ${score} out of ${json.length} </h2>
          <button class='btn' onclick="location.reload()">Restart Again</button>
          `;
        showScore.classList.remove("scoreArea");
      }
    });
  } else {
    console.log("Some error occured");
  }
};
xhr.send();

// Question Format
//  {
//   "_id": {
//     "$oid": "60d58fefd4e58715a8c71468"
//   },
//   "group": "",
//   "srno": 1,
//   "name": "",
//   "options": {
//     "1": " ",
//     "2": " ",
//     "3": " ",
//     "4": " ",
//     "5": " "
//   },
//   "answer": 1,
//   "input": 1,
//   "marks": 1,
//   "__v": 0
// }
