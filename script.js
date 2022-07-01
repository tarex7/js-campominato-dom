let rows = 10;
let cells = 10;
let totalCells = rows * cells;
let playerScore = 0;

//Elementi UI
const startBtn = document.getElementById("startBtn");
const select = document.getElementById("level");

//FUNZIONI
//Crea cella
const createCell = (content) => {
  const grid = document.getElementById("grid");

  //Crea elemento
  const cell = document.createElement("div");
  //Aggiunge classe
  cell.className = "cell";

  //Inserisce numero cella
  cell.innerText = content;
  //Aggiunge event listener
  cell.addEventListener("click", (e) => {
    if (e.target.className.includes("clicked")) {
      console.log("clicked");
    } else {
      playerScore++;
      e.target.classList.add("not-allowed");
    }
    //Aggiunge classe "clicked"
    e.target.classList.add("clicked");

    //Log numero cella
    console.log(`Hai cliccato sulla cella numero ${e.target.innerText}`);
    //Aumenta punteggio
    console.log(playerScore);
  });

  grid.appendChild(cell);
};
//Event button

startBtn.addEventListener("click", () => {
  if (level.value == 2) {
    document.documentElement.style.setProperty("--rows", `9`);
    document.documentElement.style.setProperty("--cells", `9`);
    totalCells = 81;
  } else if (level.value == 3) {
    document.documentElement.style.setProperty("--rows", `7`);
    document.documentElement.style.setProperty("--cells", `7`);
    totalCells = 49;
  } else if (level.value == 1) {
    document.documentElement.style.setProperty("--rows", `10`);
    document.documentElement.style.setProperty("--cells", `10`);
    totalCells = 1000;
  }

  for (let i = 1; i <= totalCells; i++) {
    createCell(i);
  }
});
