const closeModalButton = document.getElementById('closeModalButton');
const spinner = document.getElementById('spinner');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const playButton = document.getElementById('playButton');
const instructionsButton = document.getElementById('instructionsButton');
const instructionsDialog = document.getElementById('instructionsDialog');
const winnerMessage = document.getElementById('winnerMessage');

const players = [player1, player2];

let gameStarted = false;
let spinning = false;
let rotateCount = 0;
let startTime = null;
let rAF;
let winner = 0;
let looser = 0;
let stopTimeOut;

document.body.addEventListener('click', e => {
  switch(e.target) {
    case instructionsButton:
      instructionsDialog.setAttribute("open", "");
      break;
    case closeModalButton:
      instructionsDialog.removeAttribute("open");
      break;
    case playButton:
      console.log(gameStarted);
      if (!gameStarted) {
        initializeGame();
        if (!spinning) {
          spinning = true;
          spin();
          stopSpinner();
        }
      }
      break;
  }
});

document.body.addEventListener("keydown" , e => {
  if (gameStarted) {
    console.log(spinning);
    switch (e.key) {
      case 'a':
        if(spinning) {
          winner = 2;
          clearTimeout(stopTimeOut);
          spinning = false;
          cancelAnimationFrame(rAF);
          console.log(`no se habia detenido. player 1 pierde, ganador `, winner);
        } else {
          console.log(`se detuvo, ganador es player 1 `, winner);
          winner = 1;
        }
        break;
      case 'l':
        if(spinning) {
          winner = 1;
          clearTimeout(stopTimeOut);
          spinning = false;
          cancelAnimationFrame(rAF);
          console.log(`no se habia detenido. player 2 pierde, ganador `, winner);
        } else {
          winner = 2;
          console.log(`se detuvo, ganador es player 2 `, winner);
        }
        break;
    }
    gameStarted = false;
    winnerMessage.textContent = `Player ${winner} won. Congratulations!`;
    winnerMessage.hidden = false;
    players[winner - 1].classList.add('winner');
  }
});

function spin (timeStamp) {
  if(!startTime)
    startTime = timeStamp;

  rotateCount = (timeStamp - startTime ) / 3;
  rotateCount %= 360;
  spinner.style.transform = `rotate(${rotateCount}deg)`;

  rAF = requestAnimationFrame(spin);
}

function stopSpinner () {
  stopTimeOut = setTimeout(()=> {
    spinning = false;
    cancelAnimationFrame(rAF)
    player1.classList.add("waiting");
    player2.classList.add("waiting");
  }, randomInt(7,11) * 1000);
}

function initializeGame () {
  gameStarted = true;
  players.forEach(el => {
    el.classList.remove('waiting');
    el.classList.remove('winner');
    el.classList.remove('looser');
  });
  winnerMessage.hidden = true;
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log('se ha cargado el script');
