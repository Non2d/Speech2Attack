let p;
let enemies = [];

function initInGame() {
  b2mainMenu = new Button({
    x: 100,
    y: 20,
    w: 300,
    h: 70,
    sizeOfText: 40,
    label: "Back to Menu",
    onClick: () => {
      currentScene = "mainMenu";
      enemies = []; //初期化処理はもうちょっとちゃんと体系系的にまとめたい
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
  p = new Player({ initPos: createVector(1920 / 2, 1080 / 2) });
  enemies.push(new Enemy({ initPos: createVector(400, 500), player:p }));
  enemies.push(new Enemy({ initPos: createVector(200, 300), player:p }));
}

function inGame() {
  background(240, 240, 255);
  
  for (let e of enemies){
    e.calcIsAlive();
    e.calcHp();
    e.calcMove();
    e.display();
  }
  
  p.calcAngle();
  p.calcMove();
  p.calcAim(100);
  p.calcBullet();
  p.display();

  b2mainMenu.handleClick();
  b2mainMenu.display();

  bToggleFs.handleClick();
  bToggleFs.display();
}

let ingame_coolDownCount = 0;
function ingame_shootBullet(x, y, angle, speed, interval) {
  if (mouseIsPressed && ingame_coolDownCount == 0) {
    let bullet = new Bullet(x, y, angle, speed);
    bullets.push(bullet);
  }
  if (!mouseIsPressed || ingame_coolDownCount > interval) {
    ingame_coolDownCount = 0;
  } else {
    ingame_coolDownCount++;
  }
}

function ingame_displayBullets() {
  for (let bullet of bullets) {
    bullet.update();
    bullet.draw();
  }
}
