let current = 1;
const m = [{title: "M&M's", 
        question: "M&M's stands for...",
        answers: ["Martin and Millie", "Mars and Murrie", "Marvin and Maude"],
        correct: 1, image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Plain-M%26Ms-Pile.jpg"}
]

const a = [{title: "Ants", 
question: "How many ants are estimated to inhabit the largest colony ever discovered?",
answers: ["152,000", "23 million", "307 million"],
correct: 2, image: "https://lmg-labmanager.s3.amazonaws.com/assets/articleNo/28511/aImg/51474/ant-neural-networks-compressed-m.webp"}]

const ak = [{title: "Alaska", 
        question: "The hottest temperature ever recorded in Alaska is: ",
        answers: ["95F", "100F", "110F"],
        correct: 1, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Parque_Eagle_River%2C_Anchorage%2C_Alaska%2C_Estados_Unidos%2C_2017-09-01%2C_DD_02.jpg/640px-Parque_Eagle_River%2C_Anchorage%2C_Alaska%2C_Estados_Unidos%2C_2017-09-01%2C_DD_02.jpg"}
]

const s = [{title: "XC Ski", 
        question: "Which mythology has a Ski God named Skaði?",
        answers: ["Norse", "Greek", "Icelandic"],
        correct: 0, image: "https://www.thesnowpros.org/wp-content/uploads/2020/03/cross-country_skate_greg-rhodes-scaled.jpg"}
]

async function askAll(name) {
    const currtitle = document.querySelector('#title');
    currtitle.textContent = "array[0].title";
    for (i = 0; i <= 2; i++) {
        await askOne(name, i);
    }
}

function quizPage(name) {
    localStorage.setItem("questionNumber", JSON.stringify(name));
    window.location.href = "quiz.html";
} 

function askOne()  {
    const array = localStorage.getItem("questionNumber");
    let ar = JSON.parse(array);

    const picEl = document.querySelector("#pic");
    picEl.src = ar[0].image;

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
    window.location.href = "index.html";
}

askOne();