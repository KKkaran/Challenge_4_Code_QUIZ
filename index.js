var timerEl = document.querySelector(".timers")
var startQuizEl = document.querySelector("button")
var mainWrapEl = document.querySelector(".main-wrap")
var o = -1;
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
     var count = 10;
    for(v in listQUestions){

        for(x in listQUestions[v].options){
            console.log(listQUestions[v].options[x])
        }
        
    }

    displayQuestions();//user is displayed with questions
    var start = setInterval(function (){

        //console.log(count--)
        timerEl.innerHTML = count--;
        if(count === 0){
            clearInterval(start)
        }
    },1000)

}

function displayQuestions(){
    //dynamically create div with question and options inside of it
    //replace the main screen with the question

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
        console.log("showResult")
    }
}

function checkMyAnswer(answer,id){
    //this will check the answer
    //console.log(listQUestions[id])
    var text = "";
    if(answer === listQUestions[parseInt(id)].rightAnswer()){
       text = "Correct!"
    }else{
        text = "Wrong!"
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
startQuizEl.addEventListener("click",timer)//starting the quiz



// mainWrapEl.on("click",".options",function(){
//     console.log($(this).value)
// })

mainWrapEl.addEventListener("click",function(event){
    if(event.target.matches(".options")){
        var text  = event.target.textContent;      
        checkMyAnswer(text.substring(3,text.length),parseInt(event.target.parentNode.getAttribute("id")))
    }
})
