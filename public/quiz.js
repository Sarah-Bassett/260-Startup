const allQuestions = ["m", "a", "k", "s"];

const m = [{title: "M&M's", 
    question: "M&M's stands for...",
    answers: ["Martin and Millie", "Mars and Murrie", "Marvin and Maude"],
    correct: 1, image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Plain-M%26Ms-Pile.jpg",
    letter: "m"}
]

const a = [{title: "Ants", 
    question: "How many ants are estimated to inhabit the largest colony ever discovered?",
    answers: ["152,000", "23 million", "307 million"],
    correct: 2, image: "https://lmg-labmanager.s3.amazonaws.com/assets/articleNo/28511/aImg/51474/ant-neural-networks-compressed-m.webp",
    letter: "a"}
]

const k = [{title: "Alaska", 
    question: "The hottest temperature ever recorded in Alaska is: ",
    answers: ["95F", "100F", "110F"],
    correct: 1, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Parque_Eagle_River%2C_Anchorage%2C_Alaska%2C_Estados_Unidos%2C_2017-09-01%2C_DD_02.jpg/640px-Parque_Eagle_River%2C_Anchorage%2C_Alaska%2C_Estados_Unidos%2C_2017-09-01%2C_DD_02.jpg",
    letter: "k"}
]

const s = [{title: "XC Ski", 
    question: "Which mythology has a Ski God named Skaði?",
    answers: ["Norse", "Greek", "Icelandic"],
    correct: 0, image: "https://www.thesnowpros.org/wp-content/uploads/2020/03/cross-country_skate_greg-rhodes-scaled.jpg",
    letter: "s"}
]

class Game {
    socket;
    constructor() {
        this.configureWebSocket();
    }

    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
          this.displayMsg('system', 'game', 'connected');
        };
        this.socket.onclose = (event) => {
          this.displayMsg('system', 'game', 'disconnected');
        };
        this.socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text());
          this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
        };
    
    }

    broadcastEvent(from, type, value) {
        const event = {
          from: from,
          type: type,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
    }

    displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        if (chatText != null) {
            chatText.innerHTML =
            `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
        }
    }
    choiceMade(num) {
        var completeds; 
        const ans = localStorage.getItem("ans");
    
        const array = JSON.parse(localStorage.getItem("questionNumber"));
    
        if (num.toString() === ans) {
            completeds = localStorage.getItem("completeds");
    
            if(completeds == null) {
                localStorage.setItem("completeds", "")
            }
    
            const letter = array[0].letter;
    
            if(!completeds.includes(letter)) {
                localStorage.setItem("completeds", completeds + letter);
            }
    
            const event = {
                from: 'test',
                type: '10',
            };
    
            this.socket.send(JSON.stringify(event)); 
    
    
        }
        window.location.href = "home.html";
    };
}

function askAll(name) {
    const currtitle = document.querySelector('#title');
    currtitle.textContent = "array[0].title";
    for (i = 0; i <= 2; i++) {
        askOne(name, i);
    }
}

function quizPage(name) {
    localStorage.setItem("questionNumber", JSON.stringify(name));
    if(localStorage.getItem("score") == null) {
        localStorage.setItem("score", "0");
    }

    window.location.href = "quiz.html";
} 

function askOne()  {
    const array = localStorage.getItem("questionNumber");
    let ar = JSON.parse(array);

    const scoreEl = document.querySelector("#score");
    scoreEl.textContent = 'Score: ' + localStorage.getItem("score");

    const picEl = document.querySelector("#pic");
    picEl.src = ar[0].image;

    const currtitle = document.querySelector('#title');
    currtitle.textContent = ar[0].title;

    const currquest = document.querySelector('#question');
    currquest.textContent = ar[0].question;

    const Opt1 = document.querySelector('#zero');
    Opt1.textContent = ar[0].answers[0];

    const Opt2 = document.querySelector('#one');
    Opt2.textContent = ar[0].answers[1];

    const Opt3 = document.querySelector('#two');
    Opt3.textContent = ar[0].answers[2];

    localStorage.setItem("ans", JSON.stringify(ar[0].correct));
    
}

async function saveLetter(letter) {
    const userName = localStorage.getItem('username')
    try {
        const pastLetters = await fetch('/api/score', {
            method: 'GET', 
            headers: {'content-type':'application/json'},
        });

        //broadcast score
        const allScores = pastLetters + letter;
        localStorage.setItem("completeds", JSON.stringify(allSores));

        const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(allScores),
        });
    } catch {
       //nothing
    }
    
}

async function loadMain() {
    const matches = document.querySelectorAll("div.card");
    var completeds;
    try {
        const response = await fetch('/api/score', {
            method: 'GET',
            headers: {'content-type':'application/json'},
        });
        completeds = await response.text();
    } catch {
        completeds = localStorage.getItem("completeds")
    }
    let i = 0;

    /*matches.forEach(element => {
        if (i < completeds.length) {
            const imageNode = document.createElement('img');
            const array = eval(completeds.charAt(i))
            imageNode.src = array[0].image;
            element.appendChild(imageNode);
            i++;
        }
    });

    const toDos = document.querySelectorAll("button.card");
    i = 0;
    toDos.forEach(element => {
        const letter = allQuestions[i];
        if (completeds.includes(letter))  {
            element.removeChild(element.firstElementChild);
            element.onclick = function() {};
        }
        i++;
        }
    )*/
}

const game = new Game();

function choiceMade(num) {
    game.choiceMade(num);
}