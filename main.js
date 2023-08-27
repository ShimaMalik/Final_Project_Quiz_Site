const historyQuiz = document.getElementById('orange');

historyQuiz.addEventListener('click', () =>{
    window.open('history.html', '_blank');
});





const historyQuestions=[ //Add the questions in an array of objects
    {
        question: 'What is the longest river in the world?', //object 1 question 1
        answers:[ //answers as objects in the array
            {text:'The Amazon River', correct: true},
            {text:'The River Nile', correct:false},
            {text:'The Tigris River', correct:false},
            {text:'The River Sein', correct:false},
        ]
    }, 
//question 2
    {
        question: 'What is the largest desert in the world?', 
        answers:[ //answers as objects in the array
            {text:'The Mojave Desert', correct: false},
            {text:'The Atacama Desert', correct:false},
            {text:'The Gobi Desert', correct:false},
            {text:'The Sahara Desert', correct:true},
        ]
    },
    //question 3
    {
        question: 'Where are the Pyramids of Giza Located?', 
        answers:[ //answers as objects in the array
            {text:'France', correct: false},
            {text:'Australia', correct:false},
            {text:'Egypt', correct:true},
            {text:'Canada', correct:false},
        ]
    },
    //question 4
    {
        question: 'What is the capital of France?', 
        answers:[ //answers as objects in the array
            {text:'France City', correct: false},
            {text:'Alberta', correct:false},
            {text:'Paris', correct:true},
            {text:'Washington DC', correct:false},
        ]
    },
    //question 5
    {
        question: 'What is the largest country in the world?', 
        answers:[ //answers as objects in the array
            {text:'The United Kingdom', correct: false},
            {text:'Russia', correct:true},
            {text:'South Africa', correct:false},
            {text:'Azerbaijan', correct:false},
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
    viewQuestions(); //To start the quiz questions
}


function viewQuestions(){
    // remove default questions before looping through array
reset();
btnNext.style.display='none';
    let CurrentQ = historyQuestions[CurrentQuestionIndex]; //to set correct question 
    questionElement.innerHTML ="* " + CurrentQ.question ;



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
    while(btnAnswer.firstChild){
        btnAnswer.removeChild(btnAnswer.firstChild);
    }

}


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
        if(button.dataset.correct=='true'){
            button.classList.add('correct');
        }
        button.disabled=true;
    });

    btnNext.style.display='block';
}


function viewScore(){
    reset();
    questionElement.innerHTML=`Score:${score} / ${historyQuestions.length}`;
    btnNext.innerHTML='Play Again';
}
function manipulateBtnNext(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex< historyQuestions.length){
        viewQuestions();
    }else{
        viewScore();
    }
};


btnNext.addEventListener('click',()=>{
    if(CurrentQuestionIndex <historyQuestions.length){
        manipulateBtnNext();
    }else{
        quizBegin();
    }
});

quizBegin();