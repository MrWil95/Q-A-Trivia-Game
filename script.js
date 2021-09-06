let url = "https://opentdb.com/api.php?amount=10"
const startBtn = document.querySelector("#start")
let answerBtn = document.querySelector(".buttons")
const difficulty = document.querySelector("#difficulty")
const category = document.querySelector("#category")
const message = document.querySelector(".message-container")
const questionsDisplay = document.querySelector(".questions-container")
const scoreCount = document.querySelector("#score")
const timer = document.querySelector("#timer")
const section2 = document.querySelector(".section2")
let time = 15
let score = 0
let shuffleQuestions
let currentQuestion = 0
let questions
let answer

document.querySelector("#start").addEventListener("click", function(){
   section2.id = "section2"
   document.querySelector("#section1").className = "fade-out"
   document.querySelector("#section2").className = "slide-in"
   setTimeout(() => {
      startCountdown()
   }, 2000)
})

function startCountdown() {
   startTimer = setInterval(function startTime() {
      timer.innerText = time
      time -= 1
      if (time < 0) {
         nextQuestion()
         time = 15
      }
   }, 1000)    
}

 function stopCountdown() {
   time = 0
   clearTimeout(startTimer)
}

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
   if(currentQuestion === 10) {
      endGame()
   } else {
   playGame(questions)
   }
}

function resetAnswer() {
   console.log(answerBtn)
   while(answerBtn.firstChild) {
      answerBtn.removeChild
      (answerBtn.firstChild)
   }
}

function displayQuestion(question) {
   let questionText = document.createElement("h2")
   questionText.classList.add("questions")
   questionText.innerHTML = question
   questionsDisplay.append(questionText)
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
         button.innerHTML = answer
         button.addEventListener("click", () =>  {
            button.classList.add("correct")
            time = 15
            clearTimeout(startTimer)
            setTimeout(() => {
               nextQuestion()
               startCountdown()
               scoreCounter()
            }, 1000)
         })
         answerBtn.append(button)
      } else {
         let button = document.createElement("button")
         button.classList.add("answers")
         button.innerHTML = answer
         button.addEventListener("click", () => {
            button.classList.add("wrong")
            
            time = 15
            clearTimeout(startTimer)
            setTimeout(() => {
               nextQuestion()
               startCountdown()
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
     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
   }
 
   return array;
}

function scoreCounter() {
   if(score >= 10) {
      stopCountdown()
      let win = document.createElement("h2")
      win.classList.add("message")
      win.textContent = "Perfect score!"
      message.append(win)
   } else {
      score++
      scoreCount.innerText = score
   }
}

function endGame() {
   timer.innerText = 0
   console.log(message)
   stopCountdown()
   let gameOver = document.createElement("h2")
   gameOver.classList.add("message")
   gameOver.innerText = "Game over!"
   message.append(gameOver)
   // setTimeout(() => {
   //    document.querySelector("#section2").className = "fade-out"
   // }, 1000)
   setTimeout(() => {
      restartGame()
   }, 2000)
   // let tryAgain = document.createElement("h2")
   // let retry = document.createElement("button")
   // let  
   // tryAgain.classList.add("end-game")
   // tryAgain.innerText = "Try again?"
   // questionsDisplay.append(tryAgain)
   // message.style.display = "flex"
}

function restartGame() {
   window.location.reload(true)
}