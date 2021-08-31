let url = "https://opentdb.com/api.php?amount=10"
const startBtn = document.querySelector("#start");
const answerBtn = document.querySelector(".answers");
const difficulty = document.querySelector("#difficulty");
const category = document.querySelector("#category");
const messageWin = document.querySelector("#win");
const messageLose = document.querySelector("#lose");
const questions = document.querySelector("#questions");

const start = () => {
   document.querySelector("#section1").className = "slide-out";
   document.querySelector("#section2").className = "slide-in";
}
startBtn.addEventListener("click", start);

async function fetchData(results) {
   try {
      let res = await axios.get(url);
      let choices = res.data;
      console.log(choices);
   
   } catch(error) {
      console.log(error);
   }
}
fetchData();

// fetch("https://opentdb.com/api.php?amount=10")
//    .then(res => {
//       return res.json();
//    })
//    .then(loadQuestions => {
//       console.log(loadQuestions.results);
//       // loadQuestions.results
//    })