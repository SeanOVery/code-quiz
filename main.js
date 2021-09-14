const startBtn = document.querySelector('#start-btn'),
      questionContainerEl = document.querySelector('#question-container'),
      questionEl = document.querySelector('#question'),
      nextBtn = document.querySelector('#next-btn'),
      answerBtnsEl = document.querySelector('#answer-btns'),
      questions = [
          {
              question: `console.log(typeof '22') will log what in the console?`,
              answers: [
                  {answer: 'number', correct: true},
                  {answer: 'string', correct: false},
                  {answer: 'boolean', correct: false},
                  {answer: 'undefined', correct: false}
              ]
          }
      ];
let   shuffleQuestions,
      QuestionsIndex
function startQuiz() {
    startBtn.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    nextBtn.classList.remove('hide');
    shuffleQuestions = randomArray(questions);
    QuestionsIndex = 0
    nextQuestion();
}

function nextQuestion() {
    showQs(questions[QuestionsIndex]);
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
        button.textContent = a.text;
        button.classList.add('btn');
    })
}

startBtn.addEventListener('click', startQuiz);

