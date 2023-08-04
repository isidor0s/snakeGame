"use strict";
function setPositions() {
  var positions = [];
  var snakePositions = [13, 20, 28, 44, 58, 59, 65, 72, 78];
  var snakeNewPositions = [11, 10, 7, 34, 48, 39, 25, 52, 69];

  var ladderPositions = [5, 16, 21, 37, 42, 54, 60, 67, 73];
  var ladderNewPositions = [33, 36, 61, 56, 53, 64, 80, 77, 76];

  for (var i = 1; i <= 80; i++) {
    positions[i] = new Object();
    positions[i].from = i;

    if (snakePositions.indexOf(i) != -1) {
      positions[i].to = snakeNewPositions[snakePositions.indexOf(i)];
      positions[i].type = "Snake";
    } else if (ladderPositions.indexOf(i) != -1) {
      positions[i].to = ladderNewPositions[ladderPositions.indexOf(i)];
      positions[i].type = "Ladders";
    } else if (i === 29 || i === 46) {
      positions[i].to = i;
      positions[i].type = "pythonEffect";
    } else {
      positions[i].to = i;
      positions[i].type = "Normal";
    }
  }
  return positions;
}

var cells = setPositions();
for (var i = 1; i <= 80; i++) {
  console.log(
    "Cell: " +
      i +
      " type: " +
      cells[i].type +
      " From: " +
      cells[i].from +
      " To: " +
      cells[i].to
  );
}

function initBoard() {
  var table = document.getElementById("mainTable");
  var tr = document.createElement("tr");

  for (var i = 8; i >= 1; i--) {
    var tr = document.createElement("tr");
    for (var j = 9; j >= 0; j--) {
      var td1 = document.createElement("td");
      var num = i * 10 - j;
      td1.innerHTML =
        "<div id='position" +
        num +
        "'><img  src='images/" +
        num +
        ".png'  height=80 width=80></div>";

      tr.appendChild(td1);
    }
    table.appendChild(tr);
  }
}

//movement for red
function movementplayer1(newPosition) {
  document.getElementById("position" + newPosition).innerHTML =
    "<img  src='imagesRed/" + newPosition + ".png'  height=80 width=80></div>";
}
//movement for white
function movementplayer2(newPosition) {
  document.getElementById("position" + newPosition).innerHTML =
    "<img  src='imagesWhite/" +
    newPosition +
    ".png'  height=80 width=80></div>";
}
function shamePosition(newPosition) {
  document.getElementById("position" + newPosition).innerHTML =
    "<img  src='imagesBoth/" + newPosition + ".png'  height=80 width=80></div>";
}

function removePosition(newPosition) {
  document.getElementById("position" + newPosition).innerHTML =
    "<img  src='images/" + newPosition + ".png'  height=80 width=80></div>";
}
function removeDuplicate(player1, player2, newPosition) {
  if (player1) {
    document.getElementById("position" + newPosition).innerHTML =
      "<img  src='imagesWhite/" +
      newPosition +
      ".png'  height=80 width=80></div>";
  } else if (player2) {
    document.getElementById("position" + newPosition).innerHTML =
      "<img  src='imagesRed/" +
      newPosition +
      ".png'  height=80 width=80></div>";
  }
}

// rolldice
var roll_six = false; //flag for rolling six
function rollDice() {
  var num = 1 + Math.floor(Math.random() * 6);
  if (num === 6) {
    roll_six = true;
    document.getElementById("player-text").innerHTML =
      "<h3>You play again</h3>";
  } else {
    roll_six = false;
  }
  document.getElementById("dice").innerHTML =
    "<img width=100 height=100 src='ImagesDice/" + num + ".png'>";
  return num;
}
//effect function
function effect(num, python) {
  if (python && cells[num].type === "Snake") {
    return num;
  } else {
    return cells[num].to;
  }
}

function changePlayerTurn() {
  if (roll_six === false) {
    if (player1) {
      player1 = false;
      player2 = true;
      document.getElementById("player").innerHTML =
        "<img width=100 height=100 src='pawn/whitePawn.png'>";
      document.getElementById("player-text").innerHTML = "<h3>White turn</h3>";
      document.getElementById("border").style.border = "5px solid #f3ffbe";
      if (pythonEffect2) {
        document.getElementById("pythoneffect").innerHTML =
          "<h4>🐍 python effect on</h4>";
      } else {
        document.getElementById("pythoneffect").innerHTML = "";
      }
    } else {
      player2 = false;
      player1 = true;
      document.getElementById("player").innerHTML =
        "<img width=100 height=100 src='pawn/redPawn.png'>";
      document.getElementById("player-text").innerHTML = "<h3>Red turn</h3>";
      document.getElementById("border").style.border = "5px solid #ff0000";
      if (pythonEffect1) {
        document.getElementById("pythoneffect").innerHTML =
          "<h4>🐍 python effect on</h4>";
      } else {
        document.getElementById("pythoneffect").innerHTML = "";
      }
    }
  }
}
function showScore(score) {
  document.getElementById("score").innerHTML =
    "<h3>Your score: " + score + "</h3>";
}

var score_player1 = 0;
var score_player2 = 0;
var player1 = true;
var pythonEffect1 = false;
var player2 = false;
var pythonEffect2 = false;
function new_game() {
  initBoard();
  score_player1 = 0;
  score_player2 = 0;
  var turn = Math.floor(Math.random() * 2);
  pythonEffect1 = false;
  pythonEffect2 = false;
  if (turn === 0) {
    player1 = true;
    player2 = false;
  } else {
    player1 = false;
    player2 = true;
  }
  changePlayerTurn();
}

function reset() {
  for (var i = 1; i <= 80; i++) {
    removePosition(i);
  }
  score_player1 = 0;
  score_player2 = 0;
  player1 = true;
  player2 = false;
  var turn = Math.floor(Math.random() * 2);

  if (turn === 0) {
    player1 = true;
    player2 = false;
  } else {
    player1 = false;
    player2 = true;
  }
  changePlayerTurn();
  showScore(score_player2);
}

function roll() {
  if (player1) {
    

    if (score_player1 !== 0) {
      if (score_player2 !== score_player1) {
        removePosition(score_player1);
      } else {
        removeDuplicate(player1, player2, score_player1);
      }
    }
    var roll = rollDice();
    if (score_player1 + roll > 80) {
      roll = score_player1 + roll - 80;
      score_player1 = 80 - roll;
    } else if (score_player1 + roll === 80 || score_player1 === 80) {
      movementplayer1(score_player1);
      if (
        !alert(
          " player 1 rolled " + roll + " and wins the game \n Congrats!!!🏅"
        )
      ) {
        window.location.reload();
      }
    } else {
      score_player1 = score_player1 + roll;
    }

    if (roll_six) {
      showScore(score_player1);
    }else{
      showScore(score_player2);
    }
    //effect
    pythonEffect1 = switchPython(score_player1, pythonEffect1);
    score_player1 = effect(score_player1, pythonEffect1);
    if (score_player1 === 80) {
      if (
        !alert(
          " player 1 rolled " + roll + " and wins the game \n Congrats!!!🏅"
        )
      ) {
        window.location.reload();
      }
    }

    if (score_player2 !== score_player1) {
      movementplayer1(score_player1);
    } else {
      shamePosition(score_player1);
    }
  } else {
    
    if (score_player2 !== 0) {
      if (score_player2 !== score_player1) {
        removePosition(score_player2);
      } else {
        removeDuplicate(player1, player2, score_player2);
      }
    }
    var roll = rollDice();
    if (score_player2 + roll > 80) {
      roll = score_player2 + roll - 80;

      score_player2 = 80 - roll;
    } else if (score_player2 + roll === 80 || score_player2 === 80) {
      movementplayer2(score_player2);

      if (
        !alert(
          " player 2 rolled " + roll + " and wins the game \n Congrats!!!🏅"
        )
      ) {
        window.location.reload();
      }
    } else {
      score_player2 = score_player2 + roll;
    }

    if (roll_six) {
      showScore(score_player2);
    }else{
      showScore(score_player1);
    }
    pythonEffect2 = switchPython(score_player2, pythonEffect2);
    //effect
    score_player2 = effect(score_player2, pythonEffect2);
    if (score_player2 === 80) {
      if (
        !alert(
          " player 1 rolled " + roll + " and wins the game \n Congrats!!!🏅"
        )
      ) {
        window.location.reload();
      }
    }
    if (score_player2 !== score_player1) {
      movementplayer2(score_player2);
    } else {
      shamePosition(score_player2);
    }
  }
  changePlayerTurn();
}

function switchPython(num, lol) {
  if (cells[num].type === "pythonEffect") {
    lol = true;
    document.getElementById("pythoneffect").innerHTML =
      "<h4>🐍 python effect on</h4>";
    return lol;
  }
  return lol;
}
