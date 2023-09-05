const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const bugImage = new Image();
bugImage.src = "bug.png";
const bugSize = 70;

let score = 0;
let hoppingInterval = 1000;
let bugX = 0;
let bugY = 0;

const scoreContent = createScoreElement();
document.getElementById("title").appendChild(scoreContent);

function createScoreElement() {
  const scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  scoreDiv.style.color = "blue";
  updateScoreElement(scoreDiv);
  return scoreDiv;
}

function updateScoreElement(element) {
  element.innerHTML = `Score: ${score}`;
}

function drawBug() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bugImage, bugX, bugY, bugSize, bugSize);
}

function moveBug() {
  bugX = Math.floor(Math.random() * (canvas.width - bugSize));
  bugY = Math.floor(Math.random() * (canvas.height - bugSize));
  drawBug();
}

function handleCanvasClick(e) {
  e.preventDefault();
  if (isClickOnBug(e.offsetX, e.offsetY)) {
    score++;
    updateScoreElement(scoreContent);
    hoppingInterval -= 100;
    if (hoppingInterval < 0) {
      hoppingInterval = 1000;
    }
  }
}

function isClickOnBug(mouseX, mouseY) {
  return mouseX >= bugX && mouseX <= bugX + bugSize && mouseY >= bugY && mouseY <= bugY + bugSize;
}

canvas.addEventListener("click", handleCanvasClick);

const resetScore = () => {
  score = 0;
  updateScoreElement(scoreContent);
  hoppingInterval = 1000;
};

const resetSpeed = () => {
  hoppingInterval = 1000;
};

setInterval(moveBug, hoppingInterval);
