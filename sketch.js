let startButton, resultDiv, languageSelect, detectedLangDiv;
let recognition;
function setup() {
  createCanvas(1920, 1080);
}

currentScene = "mainMenu";

function draw() {
  sceneManager(currentScene);
}

function mousePressed(){
}