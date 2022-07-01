let rows = 10;
let cells = 10;
let totalCells = rows * cells;
let playerScore = 0;
let bombs = 16;
let maxScore = totalCells - bombs;
let min = 1;
let max = 100;

//Elementi UI
const startBtn = document.getElementById("startBtn");
const select = document.getElementById("level");
const message = document.querySelector(".message");
const gameOver = document.getElementById("game-over");
const winMsg = document.getElementById("win-lose");
const score = document.getElementById("score");
const rndNumbers = [];

//!FUNZIONI
//!Funzione per creare 16 numeri casuali tutti diversi
//
const createRndNumbers = (min, max, howManyNumbers) => {
  //Genera numeri casuali finchè l'array non raggiunge la lunghezza richiesta
  while (rndNumbers.length < howManyNumbers) {
    const rnd = Math.floor(Math.random() * (max - min)) + min;
    //se il numero casuale non è nell'array lo mette
    if (rndNumbers.indexOf(rnd) === -1) rndNumbers.push(rnd);
    console.log("min", min, "max", max, "howManyNumbers", howManyNumbers);
    console.log(rndNumbers.sort());
  }
};

//!Crea cella
const createCell = (content) => {
  //Crea elemento
  const cell = document.createElement("div");
  //Aggiunge classe
  cell.className = "cell";

  //Inserisce numero cella
  cell.innerText = content;

  //Aggiunge event listener

  cell.addEventListener("click", (e) => {
    if (e.target.className.includes("clicked")) {
      return;
    }

    if (rndNumbers.includes(parseInt(e.target.innerText))) {
      e.target.style.backgroundColor = "red";
      winMsg.innerText = "Hai perso";

      score.innerText = `Hai totalizzato ${playerScore} punti`;
      gameOver.innerText = "BOOOM!!!";

      message.classList.add("show");
    }

    e.target.classList.add("clicked", "not-allowed");
    playerScore++;

    if (playerScore === totalCells - bombs) {
      winMsg.innerText = "Hai vinto!!!";
      score.innerText = `Hai totalizzato ${playerScore} punti`;

      gameOver.innerText = "Game over";
      message.classList.add("show");

      message.style.backgroundColor = "rgba(1, 133, 15, 0.6)";
    }

    //Log numero cella
    console.log(`Hai cliccato sulla cella numero ${e.target.innerText}`);
  });

  grid.appendChild(cell);
};

//Event button

startBtn.addEventListener("click", () => {
  //Reset
  grid.innerHTML = "";
  playerScore = 0;
  message.classList.remove("show");

  //*Livelli difficoltà
  //Normal
  if (level.value == 2) {
    totalCells = 81;
    console.log(totalCells);
    max = totalCells;
    createRndNumbers(min, max, bombs);

    document.documentElement.style.setProperty("--rows", `9`);
    document.documentElement.style.setProperty("--cells", `9`);

    //Hard
  } else if (level.value == 3) {
    totalCells = 49;
    max = totalCells;
    createRndNumbers(min, max, bombs);

    document.documentElement.style.setProperty("--rows", `7`);
    document.documentElement.style.setProperty("--cells", `7`);

    //Easy
  } else if (level.value == 1) {
    totalCells = 100;
    max = totalCells;
    createRndNumbers(min, max, bombs);

    document.documentElement.style.setProperty("--rows", `10`);
    document.documentElement.style.setProperty("--cells", `10`);
  }

  for (let i = 1; i <= totalCells; i++) {
    createCell(i);
  }
});
