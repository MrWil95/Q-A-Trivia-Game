let url = "https://opentdb.com/api.php?amount=10"
const startBtn = document.querySelector("#start")
const answerBtn = document.querySelector(".answers")
const difficulty = document.querySelector("#difficulty")
const category = document.querySelector("#category")
const messageWin = document.querySelector("#win")
const messageLose = document.querySelector("#lose")
const questionsDisplay = document.querySelector("#questions")
const score = document.querySelector(".score")
const timer = document.querySelector(".timer")
let shuffleQuestions, currentQuestion

const start = () => {
   document.querySelector("#section1").className = "slide-out"
   document.querySelector("#section2").className = "slide-in"
}
startBtn.addEventListener("click", start)

// grab data from api:done
// select random question from data & display result
// select answers(correct/incorrect) from question
// loop answers and append randomly to each button
async function fetchData(results) {
   try {
      let res = await axios.get(url)
      let choices = res.data
      console.log(choices)
      choices.results.forEach((result) => {
         console.log(result)
         questionSelect(result.question)
         getAnswer(result.correct_answer, result.incorrect_answers)
      })   
   } catch(error) {
      console.log(error)
   }
}
fetchData()

function questionSelect(question) {
   shuffleQuestions = [].slice(question).sort(() => Math.random() - .5)
   currentQuestion = 0
   nextQuestion()
}

function nextQuestion() {
   questions(shuffleQuestions[currentQuestion])
}

function questions(question) {
   questionsDisplay.innerText = question
}

function getAnswer(correct_answer, incorrect_answers) {
   // Shuffle through answers and place them randomly
  incorrect_answers.forEach((incorrect_answer) => {
     Math.floor(Math.random() * 3) + 1
     answerBtn.append(incorrect_answer)
  })
}

// fetch("https://opentdb.com/api.php?amount=10")
//    .then(res => {
//       return res.json();
//    })
//    .then(loadQuestions => {
//       console.log(loadQuestions.results);
//       // loadQuestions.results
//    