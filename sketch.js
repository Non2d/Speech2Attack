let startButton, resultDiv, languageSelect, detectedLangDiv;
let recognition;

let typeRelationImage;
function preload(){
  typeRelationImage = loadImage("TypePowerRelation.jpg");
}

function setup() {
  createCanvas(1920, 1080);
}

currentScene = "mainMenu";

function draw() {
  sceneManager(currentScene);
}

function mousePressed(){
}