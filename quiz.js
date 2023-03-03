let current = 1;
const m = [{title: "M&M's", 
        question: "M&M's stands for...",
        answers: ["Martin and Millie", "Mars and Murrie", "Marvin and Maude"],
        correct: 1}
]
async function askAll(name) {
    const currtitle = document.querySelector('#title');
    currtitle.textContent = "array[0].title";
    for (i = 0; i <= 2; i++) {
        await askOne(name, i);
    }
}

function quizPage(name) {
    console.log(name);
    localStorage.setItem("questionNumber", JSON.stringify(name));
    window.location.href = "quiz.html";
} 

function askOne()  {
    const array = localStorage.getItem("questionNumber");
    console.log(array);
    let ar = JSON.parse(array);
    const currtitle = document.querySelector('#title');
    currtitle.textContent = ar[0].title;
    const currquest = document.querySelector('#question');
    currquest.textContent = ar[0].question;
    options = ar[0].answers;
    list = document.querySelector("#options");
    for (i in options) {
        newOpt = document.createElement('button');
        newOpt.addEventListener('click', () => choiceMade(i, ar[0].current));
        newOpt.textContent = options[i];
        list.appendChild(newOpt);
    }
    
}

function choiceMade(num) {
    console.log("here, i = " + num);
    goHome();
}

function goHome() {
    window.location.href = "index.html";
}

askOne();