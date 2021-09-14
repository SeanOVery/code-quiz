const startBtn = document.querySelector('#start-btn'),
      questionContainerEl = document.querySelector('#question-container'),
      questionEl = document.querySelector('#question'),
      nextBtn = document.querySelector('#next-btn'),
      answerBtnsEl = document.querySelector('#answer-btns');
let   questions = [
          {
            question: `console.log(typeof \u00A0 22) will log what in the console?`,
            answers: [
                {answer: 'number', correct: true},
                {answer: 'string', correct: false},
                {answer: 'boolean', correct: false},
                {answer: 'undefined', correct: false}
              ]
          }, 
          {
            question: `console.log(typeof \u00A0 '22') will log what in the console?`,
            answers: [
                {answer: 'number', correct: false},
                {answer: 'string', correct: true},
                {answer: 'boolean', correct: false},
                {answer: 'undefined', correct: false}
              ]
          },
          {
            question: `console.log(typeof \u00A0 true) will log what in the console?`,
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
      questionsIndex;
function startQuiz() {
    startBtn.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    nextBtn.classList.remove('hide');
    randomArray(questions);
    questionsIndex = 0;
    nextQuestion();
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

function setStatus(el, correct) {
    clearStatus(el);
    if(correct) {
        el.classList.add('correct');
    } else {
        el.classList.add('wrong');
    }
}

function clearStatus(el) {
    el.classList.remove('correct');
    el.classList.remove('wrong');
}

function answerChoice(ev) {
    ev.preventDefault();
    const selection = ev.target
    const correct = selection.dataset.correct
    setStatus(document.body, correct)
    Array.from(answerBtnsEl.children).forEach(b => {
        setStatus(b, b.dataset.correct)
    })
    if(questions.length > questionsIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        startBtn.textContent = 'Restart'
        startBtn.classList.remove('hide');
    }

}

function reset() {
    nextBtn.classList.add('hide');
    while(answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild
        (answerBtnsEl.firstChild)
    }
}
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', function() {
    questionsIndex++
    nextQuestion();
})