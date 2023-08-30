const histQuestions=[ //Add the questions in an array of objects
    {
        question: 'Which country gifted the Statue of Liberty to the USA?', //object 1 question 1
        answers:[ //answers as objects in the array
            {text:'France', correct: true},
            {text:'Spain', correct:false},
            {text:'England', correct:false},
            {text:'South Africa', correct:false},
        ]
    }, 
//question 2
    {
        question: "How many years did WW1 last?", 
        answers:[ //answers as objects in the array
            {text:'3 years and 8 months', correct: false},
            {text:'12 years', correct:false},
            {text:'A decade', correct:false},
            {text:'4 years', correct:true},
        ]
    },
    //question 3
    {
        question: 'How many wives did Henry VIII have?', 
        answers:[ //answers as objects in the array
            {text:'2', correct: false},
            {text:'4', correct:false},
            {text:'6', correct:true},
            {text:'8', correct:false},
        ]
    },
    //question 4
    {
        question: "Thomas ........ invented the light bulb.", 
        answers:[ //answers as objects in the array
            {text:'Lumier', correct: false},
            {text:'Hardy', correct:false},
            {text:'Edison', correct:true},
            {text:'White', correct:false},
        ]
    },
    //question 5
    {
        question: 'Name a palace found in London?', 
        answers:[ //answers as objects in the array
            {text:'Versailles Palace', correct: false},
            {text:'Buckingham Palace', correct:true},
            {text:'St. Petersburg Palace', correct:false},
            {text:'Dolmabahçe Palace', correct:false},
        ]
    }
];

const questionElement = document.getElementById('elementQuestion');
const btnAnswer = document.getElementById('answerButton'); //to replace answer options in answer buttons 
const btnNext= document.getElementById('nextButton');
//to track the scores:
let CurrentQuestionIndex=0; // to move through question array by index
let score=0; //  cummuliate score

function quizBegin(){
    CurrentQuestionIndex=0; //to move through array of questions and reset index to 0 at restart Quiz
    score=0;
    btnNext.innerHTML='Next';
    viewQuestions(); //To start the quiz questions
}


function viewQuestions(){
    // remove default questions before looping through array
    reset();
    btnNext.style.display="none";
    let CurrentQ = histQuestions[CurrentQuestionIndex]; //to set correct question 
    questionElement.innerHTML ="* " + CurrentQ.question ;

//loop

    CurrentQ.answers.forEach(answer => {
    const button=document.createElement('button');
    button.innerHTML=answer.text;
    button.classList.add('quizButton');
    btnAnswer.appendChild(button);

    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
    button.addEventListener("click", answerSelected);// when clicking button call function answerSelected
    
});
}
//to remove default questions
function reset(){
    btnNext.style.display='none';
    while(btnAnswer.firstChild){
        btnAnswer.removeChild(btnAnswer.firstChild);
    }

};


function answerSelected(ans){
    const btnSelected = ans.target;  
    const isCorrect =btnSelected.dataset.correct=="true";

    if (isCorrect){
        btnSelected.classList.add('correct');
        score++;
    }else{
        btnSelected.classList.add('incorrect');
    }

    Array.from(btnAnswer.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled=true;
    });

    btnNext.style.display='block';
}


function viewScore(){
    reset();
    questionElement.innerHTML=`Score:${score} / ${histQuestions.length}`;
    btnNext.innerHTML='Play Again';
    btnNext.style.display='block';
}


function manipulateBtnNext(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < histQuestions.length){
        viewQuestions();
    }else{
        viewScore();
    }
};


btnNext.addEventListener('click',()=>{
    if(CurrentQuestionIndex <histQuestions.length){
        manipulateBtnNext();
    }else{
        quizBegin();
    }
});

quizBegin();

function openHistory() {
    const file = document.createElement('a');
    file.href = 'history.html';
    file.click();

}