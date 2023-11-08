const gameDisplay = document.querySelector(".game-display");
const gameList = document.querySelector(".game-list");
var X_pattern = [];
var O_pattern = [];
const winningSymbol = document.querySelector(".winning-symbol");
var turn = document.getElementById("turn");
var allBox = document.getElementsByClassName("box");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const cpuBtn = document.getElementById("cpuBtn");
const playerBtn = document.getElementById("playerBtn");
const xIconBtn = document.getElementById("X-icon");
const oIconBtn = document.getElementById("O-icon");
let winnerX = false;
let winnerO = false;

const box0 = document.querySelector(".box0");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const box6 = document.querySelector(".box6");
const box7 = document.querySelector(".box7");
const box8 = document.querySelector(".box8");
const restart = document.querySelector(".restart");
const cancelBtn = document.querySelector(".cancel-btn");
const restartBtn = document.querySelector(".restart-btn");
const nextBtn = document.querySelector(".next-btn");
const quitBtn = document.querySelector(".quit-btn");

var gameBoard = Array.from(Array(9).keys());
var human;
var computer;

const win_pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function newGameCPU() {
  gameDisplay.style.display = "initial";
  gameList.style.display = "none";
  if (xIconBtn.checked === true) {
    human = "X";
    computer = "O";
    player1Name.innerHTML = "X (You)";
    player2Name.innerHTML = "0 (CPU)";
  } else {
    human = "O";
    computer = "X";
    player1Name.innerHTML = "X (CPU)";
    player2Name.innerHTML = "0 (You)";
  }
  cpuBtn.setAttribute("data-value", "active");
  playerBtn.setAttribute("data-value", "");

  cpuTurn();
}

function newGamePlayer() {
  gameDisplay.style.display = "initial";
  gameList.style.display = "none";
  player1Name.innerHTML = "X (P1)";
  player2Name.innerHTML = "0 (P2)";
  playerBtn.setAttribute("data-value", "active");
  cpuBtn.setAttribute("data-value", "");
}

function restartGame() {
  window.location.reload();
}

function moveBox(box) {
  var boxChoice = document.getElementById(box);
  console.log(box);
  if (boxChoice) {
    var img = document.createElement("img");

    if (turn.getAttribute("data-value") === "X") {
      img.src = "./assets/icon-x.svg";
      img.setAttribute("class", "boxPlayed");
      boxChoice.appendChild(img);
      boxChoice.classList.remove("hoverBoxX");
      boxChoice.setAttribute("data-value", "X");
      boxChoice.setAttribute("click", "");
      turn.setAttribute("data-value", "O");
      turn.src = "./assets/icon-o-turn.svg";
      X_pattern.push(parseInt(boxChoice.id, 10));
      X_pattern.sort();
      if (xIconBtn.checked === true) {
        gameBoard.splice(
          parseInt(boxChoice.id, 10),
          1,
          (parseInt(boxChoice.id, 10), human)
        );
      } else {
        gameBoard.splice(
          parseInt(boxChoice.id, 10),
          1,
          (parseInt(boxChoice.id, 10), computer)
        );
      }
      for (e of allBox) {
        if (e.getAttribute("data-value") === "") {
          e.classList.add("hoverBoxO");
          e.classList.remove("hoverBoxX");
        }
      }
      checkWin(X_pattern);
    } else {
      img.src = "./assets/icon-o.svg";
      img.setAttribute("class", "boxPlayed");
      boxChoice.appendChild(img);
      boxChoice.classList.remove("hoverBoxO");
      boxChoice.setAttribute("data-value", "O");
      boxChoice.setAttribute("click", "");
      turn.setAttribute("data-value", "X");
      turn.src = "./assets/icon-x-turn.svg";
      O_pattern.push(parseInt(boxChoice.id, 10));
      O_pattern.sort();
      if (oIconBtn.checked === true) {
        gameBoard.splice(
          parseInt(boxChoice.id, 10),
          1,
          (parseInt(boxChoice.id, 10), human)
        );
      } else {
        gameBoard.splice(
          parseInt(boxChoice.id, 10),
          1,
          (parseInt(boxChoice.id, 10), computer)
        );
      }
      for (e of allBox) {
        if (e.getAttribute("data-value") === "") {
          e.classList.add("hoverBoxX");
          e.classList.remove("hoverBoxO");
        }
      }
      checkWin(O_pattern);
    }

    if (cpuBtn.getAttribute("data-value") === "active") {
      cpuTurn();
    }
  } else {
    draw();
  }
}

var isThereWinner = false;

function checkWin(currentPlayer) {
  for (const pattern of win_pattern) {
    if (isWinningPattern(pattern, currentPlayer)) {
      updateGameBoardAndResults();
      return;
    }
  }

  if (!isThereWinner && X_pattern.length === 5 && O_pattern.length === 4) {
    updateGameBoardForDraw();
  }
}

function isWinningPattern(pattern, currentPlayer) {
  for (const element of pattern) {
    if (!currentPlayer.includes(element)) {
      return false;
    }
  }
  return true;
}

function updateGameBoardAndResults() {
  for (const box of allBox) {
    if (box.getAttribute("data-value") === "") {
      box.classList.remove("hoverBoxX");
      box.classList.remove("hoverBoxO");
      box.setAttribute("click", "");
    }
  }
  isThereWinner = true;
  results();
}

function updateGameBoardForDraw() {
  for (const box of allBox) {
    box.classList.remove("hoverBoxX");
    box.classList.remove("hoverBoxO");
    box.setAttribute("click", "");
  }
  draw();
}

async function cpuTurn() {
  if (xIconBtn.checked === true) {
    const promise = new Promise((resolve, reject) => {
      if (turn.getAttribute("data-value") === "O") {
        box0.setAttribute("click", "");
        box1.setAttribute("click", "");
        box2.setAttribute("click", "");
        box3.setAttribute("click", "");
        box4.setAttribute("click", "");
        box5.setAttribute("click", "");
        box6.setAttribute("click", "");
        box7.setAttribute("click", "");
        box8.setAttribute("click", "");
        resolve();
      }
      if (winnerX === true) {
        reject();
      }
    });
    await promise;
    console.log(promise);

    setTimeout(cpuPlay, 5);
  }

  if (oIconBtn.checked === true) {
    const promise = new Promise((resolve) => {
      if (turn.getAttribute("data-value") === "X") {
        box0.setAttribute("click", "");
        box1.setAttribute("click", "");
        box2.setAttribute("click", "");
        box3.setAttribute("click", "");
        box4.setAttribute("click", "");
        box5.setAttribute("click", "");
        box6.setAttribute("click", "");
        box7.setAttribute("click", "");
        box8.setAttribute("click", "");
        resolve();
      }
      if (winnerO === true) {
        reject();
      }
    });
    await promise;
    setTimeout(cpuPlay, 5);
  }
}

function bestShot() {
  return minimax(gameBoard, computer).index;
}

function cpuPlay() {
  moveBox(bestShot());
  box0.setAttribute("click", "moveBox('0')");
  box1.setAttribute("click", "moveBox('1')");
  box2.setAttribute("click", "moveBox('2')");
  box3.setAttribute("click", "moveBox('3')");
  box4.setAttribute("click", "moveBox('4')");
  box5.setAttribute("click", "moveBox('5')");
  box6.setAttribute("click", "moveBox('6')");
  box7.setAttribute("click", "moveBox('7')");
  box8.setAttribute("click", "moveBox('8')");
}

//      Modal      //

const modal = document.getElementById("modal");
const endGame = document.getElementById("end-game");
const restartingGame = document.getElementById("restartGame");
const winnerTakes = document.getElementById("winnerTakes");
const winningPlayer = document.getElementById("winning-player");
const Xscore = document.getElementById("Xscore");
const drawScore = document.getElementById("draw");
const Oscore = document.getElementById("Oscore");

function results() {
  modal.style.display = "initial";
  endGame.style.display = "flex";
  restartingGame.style.display = "none";

  if (turn.getAttribute("data-value") === "O") {
    winningPlayer.style.display = "initial";

    if (playerBtn.getAttribute("data-value") === "active") {
      if (xIconBtn.checked === true) {
        winningPlayer.innerHTML = "Player 1 wins!";
      }
      if (oIconBtn.checked === true) {
        winningPlayer.innerHTML = "Player 1 wins!";
      }
    }
    if (cpuBtn.getAttribute("data-value") === "active") {
      if (xIconBtn.checked === true) {
        winningPlayer.innerHTML = "You won!";
      }
      if (oIconBtn.checked === true) {
        winningPlayer.innerHTML = "Oh no, you lost...";
      }
    }

    winningSymbol.src = "./assets/icon-x.svg";
    winningSymbol.style.display = "initial";
    winnerTakes.style = "color: hsl( var(--clr-lightBlue) );";
    winnerTakes.innerHTML = "takes the round";
    Xscore.innerHTML++;
    winnerX = true;
  } else {
    winningPlayer.style.display = "initial";
    if (playerBtn.getAttribute("data-value") === "active") {
      if (oIconBtn.checked === true) {
        winningPlayer.innerHTML = "Player 2 wins!";
      }
      if (xIconBtn.checked === true) {
        winningPlayer.innerHTML = "Player 2 wins!";
      }
    }
    if (cpuBtn.getAttribute("data-value") === "active") {
      if (oIconBtn.checked === true) {
        winningPlayer.innerHTML = "You won!";
      }
      if (xIconBtn.checked === true) {
        winningPlayer.innerHTML = "Oh no, you lost...";
      }
    }
    winningSymbol.src = "./assets/icon-o.svg";
    winningSymbol.style.display = "initial";
    winnerTakes.style = "color: hsl( var(--clr-orange) );";
    winnerTakes.innerHTML = "takes the round";
    Oscore.innerHTML++;
    winnerO = true;
  }
}

function draw() {
  modal.style.display = "initial";
  endGame.style.display = "flex";
  restartingGame.style.display = "none";
  winningSymbol.style.display = "none";
  winnerTakes.innerHTML = "round tied";
  winnerTakes.style = "color: hsl( var(--clr-silver) );";
  winningPlayer.style.display = "none";
  drawScore.innerHTML++;
}

function nextRound() {
  var boxPlayed = document.querySelectorAll(".boxPlayed");

  modal.style.display = "none";
  endGame.style.display = "none";
  restartingGame.style.display = "none";
  for (all of boxPlayed) {
    all.parentNode.removeChild(all);
  }

  for (all of allBox) {
    all.setAttribute("data-value", "");
    all.classList.add("hoverBoxX");
  }
  turn.setAttribute("data-value", "X");
  turn.src = "./assets/icon-x-turn.svg";
  box0.setAttribute("click", "moveBox('0')");
  box1.setAttribute("click", "moveBox('1')");
  box2.setAttribute("click", "moveBox('2')");
  box3.setAttribute("click", "moveBox('3')");
  box4.setAttribute("click", "moveBox('4')");
  box5.setAttribute("click", "moveBox('5')");
  box6.setAttribute("click", "moveBox('6')");
  box7.setAttribute("click", "moveBox('7')");
  box8.setAttribute("click", "moveBox('8')");
  X_pattern = [];
  O_pattern = [];
  gameBoard = Array.from(Array(9).keys());
  cpuTurn();
}

function Restart() {
  modal.style.display = "initial";
  endGame.style.display = "none";
  restartingGame.style.display = "flex";
}

function cancelReset() {
  modal.style.display = "none";
  checkWin(O_pattern);
  checkWin(X_pattern);
}

//    MiniMax    //

function emptySquares() {
  return gameBoard.filter((s) => typeof s == "number");
}

function checkWinner(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of win_pattern.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player,
      };
      break;
    }
  }
  return gameWon;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares();

  if (checkWinner(newBoard, human)) {
    return { score: -10 };
  } else if (checkWinner(newBoard, computer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == computer) {
      var result = minimax(newBoard, human);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, computer);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === computer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

// addEventListeners
box0.addEventListener("click", () => {
  moveBox("0");
});

box1.addEventListener("click", () => {
  moveBox("1");
});

box2.addEventListener("click", () => {
  moveBox("2");
});

box3.addEventListener("click", () => {
  moveBox("3");
});

box4.addEventListener("click", () => {
  moveBox("4");
});

box5.addEventListener("click", () => {
  moveBox("5");
});

box6.addEventListener("click", () => {
  moveBox("6");
});

box7.addEventListener("click", () => {
  moveBox("7");
});

box8.addEventListener("click", () => {
  moveBox("8");
});
restart.addEventListener("click", Restart);
cancelBtn.addEventListener("click", cancelReset);
restartBtn.addEventListener("click", restartGame);

nextBtn.addEventListener("click", nextRound);

quitBtn.addEventListener("click", restartGame);

cpuBtn.addEventListener("click", newGameCPU);

playerBtn.addEventListener("click", newGamePlayer);
