// selected all elements with varibales 
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD= document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// using array creating questions
var questions = [
    {
        question :"1.What does CSS stand for?",
        choiceA : "Cascading CSS",
        choiceB : "Cascading style sheets",
        choiceC : "Cascading separate style",
        choiceD : "Computer Style System",
        correct : "B"
    },{
        question : "2.Which attribute can set text to bold",
        choiceA : "Text-decoration",
        choiceB : "Font Style",
        choiceC : "Font weigh",
        choiceD : "Font family",
        correct : "C"
    },{
        question : "3.Which tag is used to link an external CSS file?",
        choiceA : "Script",
        choiceB : "Link",
        choiceC : "Rel",
        choiceD : "Type",
        correct : "B"
    },
    {
        question :"4.Which attribute sets the underline property?",
        choiceA : "Text-decoration",
        choiceB : "Font style",
        choiceC : "Font weigh",
        choiceD: "Font family",
        correct : "B"
    },
    {
        question : "5.Which measurement is NOT relative?",
        choiceA : "Px",
        choiceB : "Cm",
        choiceC : "%",
        choiceD: "Em",
        correct : "B"
    },
    {
        question : "6.Which measurement unit IS relative?",
        choiceA : "Em",
        choiceB : "Cm",
        choiceC : "MM",
        choiceD: "Inch",
        correct : "A"
    },
    {
        question :"7.What attribute is used move an elements content away from its border?",
        choiceA : "Margin",
        choiceB : "Padding",
        choiceC : "Border",
        choiceD : "Width",
        correct : "B"
    },
    {
        question :"8.Which attribute does not contribute to a block elements total width?",
        choiceA : "Width",
        choiceB : "Border",
        choiceC : "Background-image",
        choiceD : "Padding",
        correct : "C"
    },
    {
        question :"9.What property changes positioned elements display order?",
        choiceA : "Width",
        choiceB : "Background",
        choiceC : "Z-index",
        choiceD : "Azimuth",
        correct : "C"
    },
    {
        question :"10.Which value of background-repeat will cause a background to repeat vertically?",
        choiceA : "Repeat-x",
        choiceB : "Repeat",
        choiceC : "Repeat-y",
        choiceD : "No-Repeat",
        correct : "C"
    }
];

// create some variables for question length, timmer, progress bar, score
var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 20; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// to get the question to html file
function renderQuestion(){
    var q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML= q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// get the progress bar
function renderProgress(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// get the time counter

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
// check the Anwer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// to get the final score 
function scoreRender(){
    scoreDiv.style.display = "block";
    scoreDiv.innerHTML += "<p>"+ score +"</p>";
}
