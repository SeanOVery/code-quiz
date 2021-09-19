const startBtn = document.querySelector('#start-btn'),
      questionContainerEl = document.querySelector('#question-container'),
      questionEl = document.querySelector('#question'),
      nextBtn = document.querySelector('#next-btn'),
      answerBtnsEl = document.querySelector('#answer-btns'),
      scoreEl = document.querySelector('#score'),
      timerEl = document.querySelector('#timer'),
      restartBtn = document.querySelector('#restart-btn'),
      saveScoreBtn = document.querySelector('#save-score-btn'),
      saveScoreContainer = document.querySelector('#save-score-container'),
      saveScoreForm = document.querySelector('#save-score-form'),
      saveScoreInput = document.querySelector('#save-score-text');
let   questions = [
          {
            question: `console.log(typeof\u00A0 22) will log what in the console?`,
            answers: [
                {answer: 'number', correct: true},
                {answer: 'string', correct: false},
                {answer: 'boolean', correct: false},
                {answer: 'undefined', correct: false}
              ]
          }, 
          {
            question: `console.log(typeof\u00A0 '22') will log what in the console?`,
            answers: [
                {answer: 'number', correct: false},
                {answer: 'string', correct: true},
                {answer: 'boolean', correct: false},
                {answer: 'undefined', correct: false}
              ]
          },
          {
            question: `console.log(typeof\u00A0 true) will log what in the console?`,
            answers: [
                {answer: 'number', correct: false},
                {answer: 'string', correct: false},
                {answer: 'boolean', correct: true},
                {answer: 'undefined', correct: false}
              ]
          }, 
          {
            question: `Which selector is more generalized?`,
            answers: [
                {answer: 'querySelector', correct: true},
                {answer: 'getElementById', correct: false},
                {answer: 'getElementByClassName', correct: false},
                {answer: `They're the same`, correct: false}
              ]
          }, 
          {
            question: `What is another name for event bubbling?`,
            answers: [
                {answer: 'Event Popping', correct: false},
                {answer: 'Event Stringing', correct: false},
                {answer: 'Event Propagation', correct: true},
                {answer: 'Event Delegation', correct: false}
              ]
          }, 
          {
            question: `Which of these is not an event addEventListener can listen for?`,
            answers: [
                {answer: 'click', correct: false},
                {answer: 'keydown', correct: false},
                {answer: 'mouseover', correct: false},
                {answer: 'hover', correct: true}
              ]
          } 
      ],
      score = {
          correct: 0,
          wrong: 0,
          points: 0
      },
      questionsIndex,
      questionsAnswered = 0,
      initialsArray = [],
      timeCheck = score.wrong;

function init() {
    let storedInitials = JSON.parse(localStorage.getItem('names'));
    if (storedInitials !== null) {
        initialsArray = storedInitials;
    }
}

function startQuiz() {
    startBtn.classList.add('hide');
    restartBtn.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    nextBtn.classList.remove('hide');
    randomArray(questions);
    questionsIndex = 0;
    nextQuestion();
    timer();
}

function timer() {
    let timeLeft = 60;
    let timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = `${timeLeft} Seconds Left`;
        if (timeCheck !== score.wrong) {
            timeLeft -= 10;
            timeCheck = score.wrong;
        }
        if (timeLeft >= 0) {
            if (questionsAnswered === questions.length) {
                clearInterval(timeInterval);
                timerEl.textContent = `All Questions Answered!`
                saveScoreBtn.classList.remove('hide');
                restartBtn.classList.remove('hide');
                questionContainerEl.classList.add('hide');
            }
        } else if (timeLeft < 0) {
            clearInterval(timeInterval);
            timerEl.textContent = `Time's up!`;
            saveScoreBtn.classList.remove('hide');
            restartBtn.classList.remove('hide');
            questionContainerEl.classList.add('hide');
        }
    }, 1000)
}

function nextQuestion() {
    reset();
    showQs(questions[questionsIndex]);
}

function randomArray(array) {
    for (let i = array.length-1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
}

function showQs(q) {
    questionEl.textContent = q.question;
    q.answers.forEach(a => {
        const button = document.createElement('button');
        button.textContent = a.answer;
        button.classList.add('btn');
        if(a.correct) {
            button.dataset.correct = a.correct;
        }
        button.addEventListener('click', answerChoice);
        answerBtnsEl.appendChild(button)
    })
}

function answerChoice(ev) {
    ev.preventDefault();
    const selection = ev.target
    const correct = selection.dataset.correct
    if (correct) {
        score.correct++;
        score.points += 10;
        questionsAnswered++;
        scoreEl.innerText = `Correct: ${score.correct}
        Incorrect: ${score.wrong}
        Points: ${score.points}`;
    } else {
        score.wrong++;
        score.points -= 5;
        questionsAnswered++;
        scoreEl.innerText = `Correct: ${score.correct} 
        Incorrect: ${score.wrong}
        Points: ${score.points}`;
    }
    if (questions.length > questionsIndex + 1) {
        questionContainerEl.classList.add('hide')
        nextBtn.classList.remove('hide');
    } else {
        restartBtn.classList.remove('hide');
    }

}

function reset() {
    nextBtn.classList.add('hide');
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild)
    }
}

startBtn.addEventListener('click', startQuiz);

nextBtn.addEventListener('click', function() {
    questionsIndex++
    questionContainerEl.classList.remove('hide')
    nextQuestion();
})

restartBtn.addEventListener('click', function() {
    score.correct = 0;
    score.wrong = 0;
    scoreEl.innerText = `Correct: ${score.correct}
    Incorrect: ${score.wrong}`;
    startQuiz();
})

saveScoreBtn.addEventListener('click', function() {
    saveScoreContainer.classList.remove('hide');
    saveScoreForm.addEventListener('submit', function(ev) {
        ev.preventDefault();
        let userName = saveScoreInput.value.trim();
        initialsArray.push(userName);
        localStorage.setItem('names', JSON.stringify(initialsArray))
        localStorage.setItem(`${userName}`, score.points);
        location.href = 'highscores.html'
    })
})

init();