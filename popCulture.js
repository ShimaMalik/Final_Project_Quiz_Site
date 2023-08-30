const popCultureQuestions=[ //Add the questions in an array of objects
    {
        question: 'Which actor played Harry Potter?', //object 1 question 1
        answers:[ //answers as objects in the array
            {text:'Daniel Radcliffe', correct: true},
            {text:'Owen Wilson', correct:false},
            {text:'Will Smith', correct:false},
            {text:'TEd Sheeran', correct:false},
        ]
    }, 
//question 2
    {
        question: "What is the name of Kim and Kanye's daughter?", 
        answers:[ //answers as objects in the array
            {text:'East West', correct: false},
            {text:'North East', correct:false},
            {text:'South West', correct:false},
            {text:'North West', correct:true},
        ]
    },
    //question 3
    {
        question: 'Who wrote the twilight books?', 
        answers:[ //answers as objects in the array
            {text:'Victoria Aveyard', correct: false},
            {text:'Leigh Bardugo', correct:false},
            {text:'Stephanie Meyer', correct:true},
            {text:'Saba Tahir', correct:false},
        ]
    },
    //question 4
    {
        question: "What is Rihanna's real name?", 
        answers:[ //answers as objects in the array
            {text:'Christen Robyn', correct: false},
            {text:'Mercedes', correct:false},
            {text:'Robyn Fenty', correct:true},
            {text:'Letoya Smith', correct:false},
        ]
    },
    //question 5
    {
        question: 'Who is the most powerful Jedi Master?', 
        answers:[ //answers as objects in the array
            {text:'Oni One Kanobi', correct: false},
            {text:'Yoda', correct:true},
            {text:'Ani Skywalker', correct:false},
            {text:'Princess Leya', correct:false},
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
    let CurrentQ = popCultureQuestions[CurrentQuestionIndex]; //to set correct question 
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
    questionElement.innerHTML=`Score:${score} / ${popCultureQuestions.length}`;
    btnNext.innerHTML='Play Again';
    btnNext.style.display='block';
}


function manipulateBtnNext(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < popCultureQuestions.length){
        viewQuestions();
    }else{
        viewScore();
    }
};


btnNext.addEventListener('click',()=>{
    if(CurrentQuestionIndex < popCultureQuestions.length){
        manipulateBtnNext();
    }else{
        quizBegin();
    }
});

quizBegin();