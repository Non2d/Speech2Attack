let p;
let enemies = [];

function initInGame() {
  b2mainMenu = new Button({
    x: 20,
    y: 20,
    w: 300,
    h: 70,
    sizeOfText: 40,
    label: "Back to Menu",
    onClick: () => {
      currentScene = "mainMenu";
      enemies = []; //初期化処理はもうちょっとちゃんと体系的にまとめたい
    },
  });
  p = new Player({ initPos: createVector(1920 / 2, 1080 / 2) });
  enemies.push(new Enemy({ initPos: createVector(400, 500), player:p, type:"fire" }));
  enemies.push(new Enemy({ initPos: createVector(200, 300), player:p, type:"ice" }));
  enemies.push(new Enemy({ initPos: createVector(100, 470), player:p, type:"volt"}));

  mySpeechRecognition = new MySpeechRecognition(p);
}

function inGame() {
  background(240, 240, 255);

  //フルスクリーン
  if (keyIsDown(keyCodeDict.f) && !previousFIsDown){
    fullscreen(!fullscreen());
  }
  previousFIsDown = keyIsDown(keyCodeDict.f);
  
  for (let e of enemies){
    e.calcIsAlive();
    e.calcHp();
    e.calcMove();
    e.display();
  }
  
  mySpeechRecognition.toggleAsr({key:"e"});
  mySpeechRecognition.display();
  mySpeechRecognition.displayTypePower();

  p.setTypePower(mySpeechRecognition.typePower);
  p.calcAngle();
  p.calcMove();
  p.calcAim(100);
  p.calcBullet();
  p.display();

  b2mainMenu.handleClick();
  b2mainMenu.display();
  
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
