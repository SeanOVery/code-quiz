const highscoreList = document.querySelector('#highscore-list');
let   initialsArray = [],
      scoresObj = {},
      sortedScoreArr = [];
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
    sortedScoreArr = Object.entries(scoresObj).sort((a, b) => b[1] - a[1]);
} // Function to pull names and scores from local storage and store them in an array and sort them.

function displayScores() {
    for (i = 0; i < sortedScoreArr.length; i++) {
        let name = sortedScoreArr[i][0]
        let score = sortedScoreArr[i][1]
        let li = document.createElement("li");
        li.textContent = `${name}: ${score} points`;
        highscoreList.appendChild(li);
    }
} // Function using sorted name and score arrays to display sorted highscores on the page.

init(); // Run init on opening webpage