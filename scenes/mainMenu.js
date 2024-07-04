function initMainMenu() {
  b2InGame = new Button({
    x: 100,
    y: 20,
    w: 300,
    h: 70,
    sizeOfText: 40,
    label: "Back to Menu",
    onClick: () => {
      currentScene = "inGame";
    },
  });
  bToggleFs = new Button({
    x: 20,
    y: 20,
    w: 60,
    h: 70,
    sizeOfText: 40,
    label: "fs",
    onClick: () => {
      let fs = fullscreen();
      fullscreen(!fs);
    },
  }); //buttonListに追加してforで回すほうが賢そう
}

function mainMenu() {
  background("#bbb");
  b2InGame.display();
  b2InGame.handleClick();
  bToggleFs.display();
  bToggleFs.handleClick();
}
