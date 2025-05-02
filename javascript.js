const INITIAL_GRID_UNITS = 16;
const MAX_GRID_UNITS = 100;
const OPACITY_DECREASE = 0.1;
const CONTAINER_ELEMENT = document.querySelector("#container");
const GENERATE_GRID_BUTTON = document.querySelector("#gridButton");

function removeGrid() {
    const squareElements = CONTAINER_ELEMENT.children;
    for (let i=squareElements.length-1; i>=0; i--) {
        CONTAINER_ELEMENT.removeChild(squareElements[i]);
    }
}

function generateGrid(gridUnits) {
    const squaresAmount = gridUnits * gridUnits;
    for (let i=0; i<squaresAmount; i++) {
        const newSquare = document.createElement("div");
        const sizePercentage = 100 / gridUnits;
        newSquare.style.flexBasis = `${sizePercentage}%`;
        CONTAINER_ELEMENT.appendChild(newSquare);
    }
}

const generateGridClick = (event) => {
    let newGridUnits = prompt("Enter Grid Size - (1 - 100)");
    newGridUnits = Math.round(newGridUnits);
    removeGrid();
    generateGrid(newGridUnits);
}

GENERATE_GRID_BUTTON.addEventListener("click", generateGridClick);

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var randomColor = "rgb(" + r + "," + g + "," + b + ")";  
    return randomColor;
}

const gridHover = (event) => {
    if (event.target.getAttribute("id") !== "container"){
        event.target.style.backgroundColor = getRandomColor();
        let opacity = event.target.style.opacity;
        if (opacity === "") {
            opacity = "1";
        }
        if (opacity > 0) {
            opacity -= OPACITY_DECREASE;
            if (opacity < 0) {
                opacity = 0;
            }
        }
        event.target.style.opacity = opacity;
    }
}

CONTAINER_ELEMENT.addEventListener("mouseenter", gridHover, {capture: true});

generateGrid(INITIAL_GRID_UNITS);