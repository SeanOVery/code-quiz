const startBtn = document.querySelector('#start-btn'),
      questionContainerEl = document.querySelector('#question-container'),
      nextBtn = document.querySelector('#next-btn');
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
}

function nextQuestion() {

}

function randomArray(array) {
    for (let i = array.length-1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
}


startBtn.addEventListener('click', startQuiz);

