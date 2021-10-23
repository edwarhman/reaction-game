const closeModalButton = document.getElementById('closeModalButton');
const spinner = document.getElementById('spinner');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const playButton = document.getElementById('playButton');
const instructionsButton = document.getElementById('instructionsButton');
const instructionsDialog = document.getElementById('instructionsDialog');

let gameStarted = false;
let spinning = false;
let rotateCount = 0;
let startTime = null;
let rAF;
let winner = 0;

document.body.addEventListener('click', e => {
  switch(e.target) {
    case instructionsButton:
      instructionsDialog.setAttribute("open", "");
      break;
    case closeModalButton:
      instructionsDialog.removeAttribute("open");
      break;
    case playButton:
      gameStarted = true;
      if (!spinning) {
        spinning = true;
        spin();
        stopSpinner();
      }
      break;
  }
});

document.body.addEventListener("keydown" , e => {
  if (gameStarted) {
  switch (e.key) {
    case 'a':
      if(spinning)
        winner = 2;
      else
        winner = 1;
      break;
    case 'l':
      if(spinning)
        winner = 1;
      else
        winner = 2;
      break;
  }
    gameStarted = false;
    console.log(`Player ${winner} has won`);
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
  spinning = false;
  setTimeout(()=> {
    cancelAnimationFrame(rAF)
    player1.classList.add("waiting");
    player2.classList.add("waiting");
  }, randomInt(7,11) * 1000);
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log('se ha cargado el script');

