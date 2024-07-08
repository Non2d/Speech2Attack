let startButton, resultDiv, languageSelect, detectedLangDiv;
let recognition;
function setup() {
  createCanvas(1920, 1080);
}

currentScene = "inGame";

function draw() {
  sceneManager(currentScene);
}

function mousePressed(){
}