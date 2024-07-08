function initMainMenu() {
  b2InGame = new Button({
    x: 20,
    y: 20,
    w: 300,
    h: 70,
    sizeOfText: 40,
    label: "Play Game",
    onClick: () => {
      currentScene = "inGame";
    },
  });
  mySpeechRecognition = new MySpeechRecognition();
}

let previousFIsDown = false;
function mainMenu() {
  background("#bbb");

  //フルスクリーン
  if (keyIsDown(keyCodeDict.f) && !previousFIsDown){
    fullscreen(!fullscreen());
  }
  previousFIsDown = keyIsDown(keyCodeDict.f);
  

  b2InGame.display();
  b2InGame.handleClick();
}
