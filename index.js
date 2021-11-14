var timerEl = document.querySelector(".timers")
var startQuizEl = document.querySelector(".start")
var mainWrapEl = document.querySelector(".main-wrap")
var highscoresmenu = document.querySelector(".highscores")
var scoreDisplayMenu = document.querySelector(".displayingScores")
var o = -1; //o increases when a question is displayed
var boolean4Scores = true;
var score = 60;
var start;
var scoresLocally = []; //list of all the playerScore Objects
var listQUestions = [//list of question objects with correct answer
    {
        question:"What is the element for Header? ",
        options:["h1","p","footer","img"],
        rightAnswer : function(){
            return this.options[0]}
    }
    ,
    {
        question:"What is the tag for link?",
        options:["h1","p","footer","a"],
        rightAnswer : function(){
            return this.options[3]
        }
    },
    {
        question:"What is the tag for paragraph?",
        options:["h1","p","footer","img"],
        rightAnswer : function(){
            return this.options[1]
        }
    }

]
//keeps check on how much time is left 
function timer(){
    boolean4Scores = false

    displayQuestions();//user is displayed with questions
    
    start = setInterval(function (){
        timerEl.innerHTML = Math.max(0,--score);
        if(score > 20){
            timerEl.style.color = "green"
        }else if(score > 10){
            timerEl.style.color = "goldenrod"
        }else{
            timerEl.style.color = "red"
        }
        if(score <= 0){
            displayResult("No Time Left");
            clearInterval(start)
        }
    },1000)
}
//dynamically create div with question and options inside of it
//replace the main screen with the question
function displayQuestions(){
    o++;
    var questionWrapperEl = document.createElement("div");
    questionWrapperEl.className = "mainView"
    questionWrapperEl.id = "questionWrapper";
    var questionEl = document.createElement("p");
    questionEl.className = "questionEl"
    var optionsEl = document.createElement("ol");
    optionsEl.className = "optionsEl"
//looping through questionObject List
    if(o < listQUestions.length){
        questionEl.textContent = listQUestions[o].question;
        for(i in listQUestions[o].options){
            var option = document.createElement("li");
            option.className = "options"
            option.textContent = parseInt(i) + 1 + ". " + listQUestions[o].options[i]
            optionsEl.id = parseInt(o)
            optionsEl.append(option)
        }
        questionWrapperEl.append(questionEl,optionsEl)
        document.querySelector(".mainView").replaceWith(questionWrapperEl);
    }else if(o === listQUestions.length){
        clearInterval(start)
        console.log(`The final score is: ${score}`)
        displayResult("You answered all the questions!!")
    }
}
function displayResult(whyText){
    
    var b = whyText
    var resultWrapper = document.createElement("div")
    resultWrapper.className = "resultEl"
    var alldone = document.createElement("h1")
    
    alldone.innerHTML = "Game Over!!" + `<span class="whygameover">${b}</span>`
    var finalScore = document.createElement("p")
    finalScore.textContent = `Your final Score: ${Math.max(0,score)}`

    var inputField = document.createElement("input")
    inputField.className = "initials"
    inputField.setAttribute("type","text")
    inputField.setAttribute("name","name")
    inputField.setAttribute("placeholder","Your initials go here")
    inputField.setAttribute("required","true")
    var submitName = document.createElement("button")
    submitName.setAttribute("type","submit")
    submitName.className = "submitName"
    submitName.textContent = "Submit"


    resultWrapper.append(alldone,finalScore,inputField,submitName)
    document.querySelector(".mainView").replaceWith(resultWrapper);

}
//scoring the score locally
function saveScore(){
    localStorage.setItem("scores",JSON.stringify(scoresLocally))
}
function reload(){
    var records = localStorage.getItem("scores")
    if(!records){
        scoreDisplayMenu.innerHTML = "<p>No scores available</p>"
        document.querySelector(".clearscores").disabled = true
        document.querySelector(".clearscores").style.background = "grey"
        
        return false;
    }
    scoresLocally = JSON.parse(records)
    document.querySelector(".clearscores").disabled = false
    document.querySelector(".clearscores").style.background = "purple"
    scoresLocally.forEach(function(c){
        var p = document.createElement("p")
        p.textContent = c.playerName + " - " + Math.max(0,c.playerScore)

        scoreDisplayMenu.appendChild(p)
    })
}
//when user ends the game he sees his name pop up in the high score menu
function UpdateScoresRealTime(){
    scoreDisplayMenu.innerHTML = ""
    reload();
    
}

function checkMyAnswer(answer,id){
    //this will check the answer
    //console.log(listQUestions[id])
    var text = "";
    var color = ""
    if(answer === listQUestions[parseInt(id)].rightAnswer()){
       text = "Correct!"
       color = "green"
       score+=5;
    }else{
        text = "Wrong!"
        score-=10;
        color = "red"
    }

    if(score <= 0){
        score = 0;   
    }else{
        console.log("sdsdsdsd")
        var answer = document.createElement("div")
        answer.className = "answerDisplay"
        answer.innerHTML = `<h1>${text}</h1>`
        answer.style.color = color
        mainWrapEl.appendChild(answer)
        
        var t = 0
        var wait = setInterval(function(){
            t++;
            displayQuestions();
            answer.remove()
            if(t === 1){
                clearInterval(wait)
            }
        },700) 
    }
    

}
startQuizEl.addEventListener("click",timer)//starting the quiz
mainWrapEl.addEventListener("click",function(event){
    if(event.target.matches(".options")){
        var text  = event.target.textContent;      
        checkMyAnswer(text.substring(3,text.length),parseInt(event.target.parentNode.getAttribute("id")))
    }else if(event.target.matches(".submitName")){
        //console.log(event.target.closest(".resultEl").querySelector("input").value)
        if(!event.target.closest(".resultEl").querySelector("input").value){
            alert("You can't leave the Initials empty")
            return;
        }
        var scoreObject = {
            playerName:event.target.closest(".resultEl").querySelector("input").value,
            playerScore: score
        }
        scoresLocally.push(scoreObject)
        saveScore(); 
        document.querySelector(".modalbody").style.display = "block"
        UpdateScoresRealTime();
       
    }
})
//open the modal
highscoresmenu.addEventListener("click",function(){
    if(boolean4Scores){
        document.querySelector(".modalbody").style.display = "block"
    }else{
        alert("You need to finish the Quiz and Submit first!!")
    }
})
//close the modal on close button clicked
document.querySelector(".closebtn").addEventListener("click",function(){
    //document.querySelector(".modalbody").style.display = "none"
    location.reload()
})
//when clicked outside the menu the scores disappear
// document.querySelector(".modalbody").addEventListener("click",function(e){
//     if(e.target === document.getElementById("modal")){
//         document.querySelector(".modalbody").style.display = "none"
//     }
// })
//clears the highscores when clear button clicked
//clearscores
document.querySelector(".clearscores").addEventListener("click",function(){
    //document.querySelector(".modalbody").style.display = "none"
    localStorage.clear();
    reload();
    console.log('cleareed')
})
document.querySelector(".instructions").addEventListener("click",function(){
    document.querySelector(".intructClass").style.display = "block"
    console.log('cleareed')
})
document.querySelector(".intructClass").addEventListener("click",function(e){
    if(e.target === document.getElementById("instruct")){
        document.querySelector(".intructClass").style.display = "none"
     }
})
document.querySelector(".cross").addEventListener("click",function(e){
    document.querySelector(".intructClass").style.display = "none"

})

reload();//runs when page loads so as to grab the scores from local storage and populate the high scores menu




//function to sort the values