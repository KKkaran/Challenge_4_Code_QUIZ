var timerEl = document.querySelector(".timers")
var startQuizEl = document.querySelector("button")

//keeps check on how much time is left
function timer(){
    var count = 10;
    var start = setInterval(function (){

        console.log(count--)
        timerEl.innerHTML = count;
        if(count === 0){
            clearInterval(start)
        }
    },1000)

}
startQuizEl.addEventListener("click",timer)
