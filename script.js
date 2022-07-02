let rows = 10;
let cells = 10;
let totalCells = rows * cells;

let playerScore = 0;
let bombs = 16;
let maxScore = totalCells - bombs;

let min = 1;
let max = 100;

let notAllowed;

//Elementi UI
const grid = document.getElementById("grid");
const startBtn = document.getElementById("startBtn");
const select = document.getElementById("level");
const message = document.querySelector(".message");
const gameOver = document.getElementById("game-over");
const score = document.getElementById("score");

//!FUNZIONI
//!Funzione per creare 16 numeri casuali tutti diversi

const createRndNumbers = (min, max, howManyNumbers) => {
  //Genera numeri casuali finchè l'array non raggiunge la lunghezza richiesta
  while (rndNumbers.length < howManyNumbers) {
    const rnd = Math.floor(Math.random() * (max - min)) + min;
    //se il numero casuale non è nell'array lo mette
    if (rndNumbers.indexOf(rnd) === -1) rndNumbers.push(rnd);
    //Ordina array bombe
    rndNumbers.sort(function (a, b) {
      return a - b;
    });
  }
  console.log("Cell bombs:", rndNumbers);
};

//!Funzione Crea cella
const createCell = (totalCells) => {
  for (let i = 1; i <= totalCells; i++) {
    //Crea elemento div
    const cell = document.createElement("div");
    //Gli aggiunge classe "cell"
    cell.className = "cell";
    //Inserisce numero nella cella
    cell.innerText = i;
    //Aggiunge classe bomb se il numero della cella si trova nei rndNumbers
    if (rndNumbers.includes(parseInt(cell.innerText)))
      cell.classList.add("bomb");

    //! Logica click su cella
    const onCellClick = (e) => {
      //Previene click su celle già cliccate
      if (e.target.className.includes("clicked") || notAllowed) {
        return;
      }

      //Aggiunge classi
      cell.classList.add("clicked", "not-allowed");

      //Controlla se viene cliccata una bomba
      if (rndNumbers.includes(parseInt(e.target.innerText))) {
        //Imposta sfondo rosso alla cella
        e.target.style.backgroundColor = "red";
        e.target.innerHTML = "<i class='fa-solid fa-bomb fa-2x text-dark'></i>";
        //Mostra messaggi
        message.classList.add("show");
        gameOver.innerText = "BOOOOM!";
        score.innerText = `Hai totalizzato ${playerScore} punti`;

        //Aumenta punteggio
        playerScore++;

        //!Funzione mostra bombe
        function showBombs(cell) {
          if (cell.classList.contains("bomb")) {
            cell.style.backgroundColor = "red";
            cell.innerHTML =
              "<i  class='fa-solid fa-bomb fa-2x'></i>";
          }
        }
        allCells.forEach(showBombs);

        //Blocca click su altre celle
        notAllowed = true;
      }

      //Controlla se viene raggiunto il punteggio massimo
      if (playerScore === maxScore) {
        message.classList.add("show");
        gameOver.innerText = "Hai vinto!";
        score.innerText = `Hai totalizzato ${playerScore} punti`;
        //Cambia colore sfondo
        message.style.backgroundColor = "rgba(1, 133, 15, 0.6)";
        //Blocca click su altre celle
        notAllowed = true;
      }
    };
    //!Aggiunge evento alla cella
    cell.addEventListener("click", onCellClick);
    //Inserisce cella nella grid
    grid.appendChild(cell);
  }

  //Lista celle
  const allCells = document.querySelectorAll(".cell");
};

//!START
startBtn.addEventListener("click", () => {
  //Reset
  grid.innerHTML = "";
  notAllowed = false;
  rndNumbers = [];
  playerScore = 0;
  message.classList.remove("show");

  //Difficulty levels
  switch (parseInt(level.value)) {
    //Easy
    case 1:
      maxScore = totalCells - bombs;

      createRndNumbers(min, totalCells, bombs);
      createCell(totalCells);

      break;

    //Normal

    case 2:
      document.documentElement.style.setProperty("--rows", `9`);
      document.documentElement.style.setProperty("--cells", `9`);

      rows = 9;
      cells = 9;
      totalCells = rows * cells;
      maxScore = totalCells - bombs;

      createRndNumbers(min, totalCells, bombs);
      createCell(totalCells);

      break;

    //Hard
    case 3:
      document.documentElement.style.setProperty("--rows", `7`);
      document.documentElement.style.setProperty("--cells", `7`);

      rows = 7;
      cells = 7;
      totalCells = rows * cells;
      maxScore = totalCells - bombs;

      createRndNumbers(1, 49, 16);
      createCell(totalCells);
  }
});
