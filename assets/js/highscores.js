const highscoreList = document.querySelector('#highscore-list');
let   initialsArray = [],
      scoresObj = {},
      scoresSortable = [],
      sortedScoreNamesArray = [],
      sortedScoresArray = [];

function init() {
    let storedInitials = JSON.parse(localStorage.getItem('names'))
    if (storedInitials !== null) {
        initialsArray = storedInitials
    }
    parseSortScores();
    displayScores();
}

function parseSortScores() {
    for (i = 0; i < initialsArray.length; i++) {
        if (JSON.parse(localStorage.getItem(initialsArray[i])) !== null ) {
            scoresObj[initialsArray[i]] = JSON.parse(localStorage.getItem(initialsArray[i]));
        }
    }
    scoresSortable = Object.fromEntries(Object.entries(scoresObj).sort(([,a],[,b]) => b-a));
    sortedScoreNamesArray = Object.keys(scoresSortable);
    sortedScoresArray = Object.values(scoresSortable);
}

function displayScores() {
    for (i = 0; i < sortedScoreNamesArray.length; i++) {
        let name = sortedScoreNamesArray[i];
        let score = sortedScoresArray[i];
        let li = document.createElement("li");
        li.textContent = `${name}: ${score} points`;
        highscoreList.appendChild(li);
    }
}

init();