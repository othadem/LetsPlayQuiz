const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const allChoices = Array.from(document.getElementsByClassName("choice-container"))
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let totalScore = 0;
let allScores = [];
let questionCounter = 0;
let availableQuesions = [];

let questions = [];


//CONSTANTS
const CORRECT_BONUS = 10;
const INCORRECT_BONUS = 0;
const MAX_QUESTIONS = 6;

//$.getJSON("questions.json", function(json) {
    //console.log(json); // this will show the info it in firebug console
//});

//fetch(
  //"https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
//).then(res => {
    //return res.json();
  //}).then(loadedQuestions => {


startGame = () => {
  console.log("in startGame")
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  //availableQuesions = getAvailableQns()
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getAvailableQns = () => {

  loadedQuestions1.forEach(loadedQuestion => {
      console.log("loadedQuestion ", loadedQuestion)
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      questions.push(formattedQuestion)

      //return formattedQuestion;
    })

  console.log("questions ", questions)
  return questions
}

getNewQuestion = () => {
  console.log("in getNewQuestion")
  clearChoices()
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", totalScore);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    console.log("choice inside ")
    //if (!acceptingAnswers) return;
    clearChoices()
    //acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }else{
      incrementScore(INCORRECT_BONUS);
    }
    
    //selectedChoice.parentElement.classList.remove("correct");
    

    //setTimeout(() => {
      //selectedChoice.parentElement.classList.remove(classToApply);
      //getNewQuestion();
    //}, 100);

    selectedChoice.parentElement.classList.add("correct");
  });
});

clearChoices = () => {
  allChoices.forEach(choice => {
    choice.classList.remove("correct")
  })
}

incrementScore = num => {
  //score += num;
  allScores[questionCounter] = num
  totalScore = allScores.reduce((a,b) => a+b, 0);
  scoreText.innerText = totalScore
  //totalScore[questionCounter] = score;
  console.log("totalScore is ", totalScore)
};

readQuestions = () => {    
  console.log(loadedQuestions1.length);
  for(var i=0; i<loadedQuestions1.length; i++) {

    //questions.push(loadedQuestions1.forEach(loadedQuestion => {
    loadedQn = loadedQuestions1[i]
    //console.log("loadedQn ", loadedQn)
    const formattedQuestion = {
      question: loadedQn.question
    };

    const answerChoices = [...loadedQn.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    answerChoices.splice(
      formattedQuestion.answer - 1,
      0,
      loadedQn.correct_answer
    );

    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });

    questions.push(loadedQn)
    //return formattedQuestion;
  }
  console.log("questions ", questions)

}

  //})
  //.catch(err => {
    //console.error(err);
  //});

processQuestions = () => {
  console.log("in processQuestions")
  for(var i=0; i<loadedQuestions1.length; i++) {
    loadedQn = loadedQuestions1[i]
    //console.log("loadedQn ", loadedQn)
    loadedQuestions1[i]["correct_answer"] = loadedQn["choice"+loadedQn.answer]
    var tempChoices = []
    for(var j=1; j<5; j++) {
      if(j != loadedQn.answer) {
        tempChoices.push(loadedQn["choice"+j])
      }
    }
    loadedQuestions1[i]["incorrect_answers"] = tempChoices
  }

  console.log("loadedQuestions1 ", loadedQuestions1)
}

processQuestions()

readQuestions()

startGame();

//answer: 1
//choice1: "APJ Abdul Kalam"
//choice2: "Nehru"
//choice3: "Tagore"
//choice4: "Sarojini Naidu"
//question: "Who is the author of book Wings of Fire?"

//category: "General Knowledge"
//correct_answer: "Yellow"
//difficulty: "easy"
//incorrect_answers: (3) ["Green", "Red", "Blue"]
//question: "When someone is cowardly, they are said to have what color belly?"
//type: "multiple"

