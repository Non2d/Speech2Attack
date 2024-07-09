let mainMenuBList = [];
function initMainMenu() {
let buttonWidth = 900;
let buttonHeight = 300;
let buttonSpacing = 70;
let initialX = 20;
let initialY = 250;

b2InGame = new Button({
    x: initialX,
    y: initialY,
    w: buttonWidth,
    h: buttonHeight,
    sizeOfText: 150,
    bgColor: color(255,0,0),
    txtColor: color(255),
    label: "Play Game",
    onClick: () => {
      currentScene = "inGame";
    },
});
mainMenuBList.push(b2InGame);

//設定ボタン
mainMenuBList.push(new Button({
    x: initialX,
    y: initialY + buttonHeight + buttonSpacing,
    w: buttonWidth,
    h: buttonHeight,
    sizeOfText: 100,
    bgColor: color(0,255,0),
    txtColor: color(255),
    label: "Settings",
    onClick: () => {
    },
}));

//みにげーむぼたんをみぎれつに
mainMenuBList.push(new Button({
    x: initialX + buttonWidth + buttonSpacing,
    y: initialY,
    w: buttonWidth,
    h: buttonHeight,
    sizeOfText: 150,
    bgColor: color(0,0,100),
    txtColor: color(255),
    label: "Mini Game",
    onClick: () => {
    },
}));

//設定ボタン
mainMenuBList.push(new Button({
    x: initialX + buttonWidth + buttonSpacing,
    y: initialY + buttonHeight + buttonSpacing,
    w: buttonWidth,
    h: buttonHeight,
    sizeOfText: 100,
    bgColor: color(0,100,100),
    txtColor: color(255),
    label: "Custom",
    onClick: () => {
    },
}));

  mySpeechRecognition = new MySpeechRecognition();
}

let previousFIsDown = false;
function mainMenu() {
  background(255);

  fill(0,0,255);
  stroke(0,0,255);
  strokeWeight(5);
  text("Welcome to Speech2Attack!!", width/2, 120);

  //フルスクリーン
  if (keyIsDown(keyCodeDict.f) && !previousFIsDown){
    fullscreen(!fullscreen());
  }
  previousFIsDown = keyIsDown(keyCodeDict.f);
  
  for (let b of mainMenuBList) {
    b.display();
    b.handleClick();
  }
}
