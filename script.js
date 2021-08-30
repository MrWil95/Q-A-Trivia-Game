const startBtn = document.querySelector("#start");

const start = () => {
   document.querySelector("#section1").className = "slide-out";
   document.querySelector("#section2").className = "slide-in";
}
startBtn.addEventListener("click", start);