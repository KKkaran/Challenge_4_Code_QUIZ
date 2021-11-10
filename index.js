var timerEl = document.querySelector(".timers")
var startQuizEl = document.querySelector("button")
var mainWrapEl = document.querySelector(".main-wrap")
var o = -1; //o increases when a question is displayed
var score = 90;
var start;
var scoresLocally = []; //list of all the playerScore Objects
var listQUestions = [//list of question objects with correct answer
    {
        question:"A very important tools ",
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
    
    displayQuestions();//user is displayed with questions
    
    start = setInterval(function (){
        timerEl.innerHTML = score--;
        if(score === 0){
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
        console.log(`The final score is: ${score+1}`)
        displayResult()
    }
}
function displayResult(){
    var resultWrapper = document.createElement("div")
    resultWrapper.className = "resultEl"
    var alldone = document.createElement("h1")
    alldone.textContent = "ALL DONE!!"
    var finalScore = document.createElement("p")
    finalScore.textContent = `Your final Score: ${score+1}`

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
reload();
//scoring the score locally
function saveScore(){
    localStorage.setItem("scores",JSON.stringify(scoresLocally))
    reload()
}
function reload(){
    var records = localStorage.getItem("scores")
    if(!records){
        return false;
    }
    scoresLocally = JSON.parse(records)
}


function checkMyAnswer(answer,id){
    //this will check the answer
    //console.log(listQUestions[id])
    var text = "";
    if(answer === listQUestions[parseInt(id)].rightAnswer()){
       text = "Correct!"
    }else{
        text = "Wrong!"
        score-=10;
    }
    var answer = document.createElement("div")
    answer.className = "answerDisplay"
    answer.innerHTML = `<h1>${text}</h1>`
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
function showHighScores(){
    //SHOWS THE SCORE MENU IN MODAL ....USE BOOTSTRAP
    
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
            playerScore: score-1
        }
        scoresLocally.push(scoreObject)
        saveScore(); 
        location.reload();//this will refresh the page for the user once the score is updated
        
    }else if(event.target.matches(".highscores")){
        showHighScores();
    }
})

//