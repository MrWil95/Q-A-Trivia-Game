let url = "https://opentdb.com/api.php?amount=10"
const startBtn = document.querySelector("#start")
let answerBtn = document.querySelector(".buttons")
const difficulty = document.querySelector("#difficulty")
const category = document.querySelector("#category")
const message = document.querySelector(".message-container")
const questionsDisplay = document.querySelector("#questions")
const scoreCount = document.querySelector("#score")
const timer = document.querySelector("#timer")
let score = 0
let shuffleQuestions
let currentQuestion = 0
let questions
let answer

document.querySelector("#start").addEventListener("click", function(){
   document.querySelector("#section1").className = "fade-out"
   document.querySelector("#section2").className = "slide-in"

   let time = 15

   setTimeout(() => {
      let startTimer = setInterval(function function1(){
      timer.innerText = time
         time -=1
         if(time < 0){
            nextQuestion()
            time = 15  
         }
      }, 1000)
   }, 2000)


     

   console.log(timer);
});

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
   currentQuestion +=1
   console.log(questions)
   questionsDisplay.innerText = ""
   resetAnswer()
   playGame(questions)
}

function resetAnswer() {
   console.log(answerBtn)
   while(answerBtn.firstChild) {
      answerBtn.removeChild
      (answerBtn.firstChild)
   }
}

function displayQuestion(question) {
   questionsDisplay.innerText = question
}

function displayAnswer(answer) {
   answerBtn.innerText = answer
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
            button.classList.add("correct")
            setTimeout(() => {
               nextQuestion()
               scoreCounter()
               // startTime()
            }, 1000)
         })
         answerBtn.append(button)
      } else {
         let button = document.createElement("button")
         button.classList.add("answers")
         button.innerText = answer
         button.addEventListener("click", () => {
            button.classList.add("wrong")
            setTimeout(() => {
               nextQuestion()
               // resetTime()
            }, 1000)
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
   if(score > 10) {
     let win = document.createElement("h2")
      win.classList.add("message")
      win.textContent = "Perfect score!"
      message.append(win)
   }
 }