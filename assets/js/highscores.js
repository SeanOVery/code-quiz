const highscoreList = document.querySelector('#highscore-list');
let   initialsArray = [],
      scoresObj = {},
      scoresSortable = [],
      sortedScoreNamesArray = [],
      sortedScoresArray = [];
    // global variable declaration for highscores page
function init() {
    let storedInitials = JSON.parse(localStorage.getItem('names'))
    if (storedInitials !== null) {
        initialsArray = storedInitials
    }
    parseSortScores();
    displayScores();
} // Function to pull from localstorage and run other functions to parse info pulled from local storage and display it.

function parseSortScores() {
    for (i = 0; i < initialsArray.length; i++) {
        if (JSON.parse(localStorage.getItem(initialsArray[i])) !== null ) {
            scoresObj[initialsArray[i]] = JSON.parse(localStorage.getItem(initialsArray[i]));
        }
    }
    scoresSortable = Object.fromEntries(Object.entries(scoresObj).sort(([,a],[,b]) => b-a));
    sortedScoreNamesArray = Object.keys(scoresSortable);
    sortedScoresArray = Object.values(scoresSortable);
} // Function to take in info from local storage and put it in a usable form. Checks localstorage for only high scores by comparing to names in initialArray then stores all scores in an object. Object pairs sorted by value and stored in two sorted arrays where name and score will have matching indices.

function displayScores() {
    for (i = 0; i < sortedScoreNamesArray.length; i++) {
        let name = sortedScoreNamesArray[i];
        let score = sortedScoresArray[i];
        let li = document.createElement("li");
        li.textContent = `${name}: ${score} points`;
        highscoreList.appendChild(li);
    }
} // Function using sorted name and score arrays to display sorted highscores on the page.

init(); // Run init on opening webpage