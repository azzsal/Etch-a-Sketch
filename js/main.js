const GRID_LENGTH_IN_PXS = 640;
const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 16;

function createGrid(gridArea) {
  let grid = document.querySelector(".grid");
  const squareLenght = GRID_LENGTH_IN_PXS / Math.sqrt(gridArea);
  for (let i = 0; i < gridArea; i++) {
    grid.appendChild(createSquare(squareLenght));
  }
}

function createSquare(squareLenght) {
  let square = document.createElement("div");
  square.classList.add("square");
  square.style.width = `${squareLenght}px`;
  square.style.height = `${squareLenght}px`;
  square.style.backgroundColor = "#d6d0d0";
  attachHoverEvent(square);
  return square;
}

function attachHoverEvent(square) {
  square.onmouseover = (e) => changeColor(e);
}

function changeColor(e) {
  let activePenControl = getActivePenControl();
  if (!activePenControl) e.target.style.backgroundColor = "#d4afaf";
  else if (activePenControl.classList.contains("rainbower"))
    e.target.style.backgroundColor = generateRandomColor();
  else if (activePenControl.classList.contains("shadower")) {
    let squareColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = addShadow(squareColor);
  } else if (activePenControl.classList.contains("eraser"))
    e.target.style.backgroundColor = "#d6d0d0";
}

function addShadow(color, shadowRate = 0.06) {
  let rgbColors = color.match(/[\d]+/g);
  let shadowedRgbColors = [];
  for (let i = 0; i < rgbColors.length; i++) {
    shadowedRgbColors.push(
      parseInt(rgbColors[i]) - parseInt(rgbColors[i]) * shadowRate
    );
  }
  return `rgba(${shadowedRgbColors.join(", ")})`;
}

function getActivePenControl() {
  let penControls = document.querySelectorAll(".pen-control button");
  for (let i = 0; i < penControls.length; i++)
    if (penControls[i].classList.contains("active-button"))
      return penControls[i];
}

function generateRandomColor() {
  let hexDigits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let hexColor = [];
  for (let i = 0; i < 6; i++) {
    hexColor.push(hexDigits[Math.floor(Math.random() * hexDigits.length)]);
  }
  return `#${hexColor.join("")}`;
}

createGrid(DEFAULT_WIDTH * DEFAULT_HEIGHT);

let girdControlBtns = document.querySelectorAll(".grid-control button");
for (let i = 0; i < girdControlBtns.length; i++) {
  girdControlBtns[i].addEventListener("click", (e) => {
    emptyCurrentGrid();
    let gridArea =
      e.target.className === "large"
        ? 8 * 8
        : e.target.className === "meduim"
        ? 16 * 16
        : 32 * 32;
    createGrid(gridArea);
  });
}

function emptyCurrentGrid() {
  let grid = document.querySelector(".grid");
  grid.innerHTML = "";
}

let penControlBtns = document.querySelectorAll(".pen-control button");
for (let i = 0; i < penControlBtns.length; i++) {
  penControlBtns[i].addEventListener("click", () => {
    if (!penControlBtns[i].classList.contains("active-button"))
      penControlBtns.forEach((penControlBtn) =>
        penControlBtn.classList.remove("active-button")
      );
    penControlBtns[i].classList.toggle("active-button");
  });
}

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clearGrid);

function clearGrid() {
  let squares = document.querySelectorAll(".square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = "#d6d0d0";
  }
}
