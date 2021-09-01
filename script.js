let url = "https://opentdb.com/api.php?amount=10"
const startBtn = document.querySelector("#start")
let answerBtn = document.querySelector(".buttons")
const difficulty = document.querySelector("#difficulty")
const category = document.querySelector("#category")
const messageWin = document.querySelector("#win")
const messageLose = document.querySelector("#lose")
const questionsDisplay = document.querySelector("#questions")
const scoreCount = document.querySelector("#score")
const timer = document.querySelector("#timer")
let score = 0
let shuffleQuestions
let currentQuestion = 0
let questions

const start = () => {
   document.querySelector("#section1").className = "slide-out"
   document.querySelector("#section2").className = "slide-in"
}
startBtn.addEventListener("click", start)

// grab data from api:done
// select random question from data & display result:done
// select answers(correct/incorrect) from question:done
async function fetchData(results) {
   try {
      let res = await axios.get(url)
      let choices = res.data
      console.log(choices)
      playGame(choices.results)
      questions = choices.results   
   } catch(error) {
      console.log(error)
   }
}
fetchData()

function playGame(questions) {
   displayQuestion(questions[currentQuestion].question)
   console.log(questions[currentQuestion])
   getAnswer(questions[currentQuestion].correct_answer, questions[currentQuestion].incorrect_answers)
}

function nextQuestion() {
   console.log(questions)
   questionsDisplay.innerText = ""
   displayQuestion(questions[Math.floor(Math.random() * questions.length)].question)
   resetAnswer()
   
}

function resetAnswer() {
   while(answerBtn.firstChild) {
      answerBtn.removeChild
      (answerBtn.firstChild)
   }
}

function nextAnswer() {

}

function displayQuestion(question) {
   questionsDisplay.innerText = question
}

function getAnswer(correct_answer, incorrect_answers) {
   let correct = correct_answer
   let answers = shuffle([...incorrect_answers, correct_answer])
   answers.forEach(answer => {
      if (answer === correct) {
         let button = document.createElement("button")
         button.classList.add("answers")
         button.setAttribute("data-correct", true)
         button.innerText = answer
         button.addEventListener("click", () =>  {
            nextQuestion()
            scoreCounter()
            button.classList.add("correct")
            // button.innerText = ""
            // getAnswer(answer[Math.floor(Math.random() * answer.length)].answer)
         })
         answerBtn.append(button)
      } else {
         let button = document.createElement("button")
         button.classList.add("answers")
         button.innerText = answer
         button.addEventListener("click", () => {
            nextQuestion()
            button.classList.add("wrong")
         })
         answerBtn.append(button)
      }
   })
}

function shuffle(array) {
   let currentIndex = array.length,  randomIndex;
 
   // While there remain elements to shuffle...
   while (currentIndex != 0) {
 
     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex--;
 
     // And swap it with the current element.
     [array[currentIndex], array[randomIndex]] = [
       array[randomIndex], array[currentIndex]];
   }
 
   return array;
 }

function scoreCounter() {
   score++
   scoreCount.innerText = score
 }

// let interval = setInterval(function(){
//    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
//    let seconds = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
//    let time = 60000

//    document.querySelector("#timer").innerHTML= time
//       time--
//       if (count === 0){
//         clearInterval(interval)
//         document.querySelector("#timer").innerHTML='Done'
//         // or...
//         alert("You're out of time!")
//       }
// }, 1000)