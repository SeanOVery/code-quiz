const highscoreList = document.querySelector('#highscore-list');
let   initialsArray = [],
      scoresObj = {},
      scoresSortable = [],
      sortedScoreNamesArray = [],
      sortedScoresArray = []

function init() {
    let storedInitials = JSON.parse(localStorage.getItem('names'))
    if (storedInitials !== null) {
        initialsArray = storedInitials
    }
    parseSortDisplayScores();
}

function parseSortDisplayScores() {
    for (i = 0; i < initialsArray.length; i++) {
        if (JSON.parse(localStorage.getItem(initialsArray[i])) !== null ) {
            scoresObj[initialsArray[i]] = JSON.parse(localStorage.getItem(initialsArray[i]));
        }
    }
    scoresSortable = Object.fromEntries(Object.entries(scoresObj).sort(([,a],[,b]) => b-a))
    sortedScoreNamesArray = Object.keys(scoresSortable);
    sortedScoresArray = Object.values(scoresSortable)
}

init();