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
      battlePhase = 0;
      enemies = []; //初期化処理はもうちょっとちゃんと体系的にまとめたい
    },
  });
  p = new Player({ initPos: createVector(1920 / 2, 1080 / 2) });
  enemies.push(new Enemy({ initPos: createVector(400, 700), player:p, type:"fire" }));
  enemies.push(new Enemy({ initPos: createVector(700, 200), player:p, type:"volt"}));
  enemies.push(new Enemy({ initPos: createVector(1300, 500), player:p, type:"ice" }));

  mySpeechRecognition = new MySpeechRecognition(p);
}

let battlePhase = 0;
function inGame() {
  background(255);

  if (keyIsDown(keyCodeDict.q)){
    
    image(typeRelationImage, 1200, 50);
    
  }
  fill(200);
  text("Press q for hint ",1600,30)

  //フルスクリーン
  if (keyIsDown(keyCodeDict.f) && !previousFIsDown){
    fullscreen(!fullscreen());
  }
  previousFIsDown = keyIsDown(keyCodeDict.f);

  controlPhase();
  
  for (let e of enemies){
    e.calcIsAlive();
    e.calcHp();
    e.calcMove();
    e.display();
  }


  p.setTypePower(mySpeechRecognition.typePower);
  p.calcAngle();
  p.calcMove();
  p.calcAim(100);
  p.calcBullet();
  p.display();

  mySpeechRecognition.toggleAsr({key:"e"});
  mySpeechRecognition.display();
  mySpeechRecognition.displayTypePower();

  b2mainMenu.handleClick();
  b2mainMenu.display();
  
}

function controlPhase(){
  if (battlePhase == 0){
    textSize(500);
    fill(100);
    text("Wave 1", 1920/2, 1080/2-200);
    //2秒後にbattlePhaseを1にする
    setTimeout(() => {
      battlePhase = 1;
    }, 2000);
  } else if (battlePhase == 1){
    //すべての敵の.isAliveがfalseならbattlePhaseを2にする
    let isAllDead = true;
    for (let e of enemies){
      if (e.isAlive){
        isAllDead = false;
      }
    }
    if (isAllDead){
      battlePhase = 2;
    }
  } else if (battlePhase == 2){
    enemies.push(new Enemy({ initPos: createVector(400, 500), player:p, type:"fire" }));
    enemies.push(new Enemy({ initPos: createVector(800, 600), player:p, type:"fire" }));
    enemies.push(new Enemy({ initPos: createVector(900, 300), player:p, type:"fire" }));
    enemies.push(new Enemy({ initPos: createVector(1000, 400), player:p, type:"fire" }));
    enemies.push(new Enemy({ initPos: createVector(1100, 500), player:p, type:"fire" }));
    enemies.push(new Enemy({ initPos: createVector(1200, 600), player:p, type:"fire" }));
    
    battlePhase = 3;

    
  } else if (battlePhase == 3){
    textSize(500);
    fill(100);
    text("Wave 2", 1920/2, 1080/2-200);
    //2秒後にbattlePhaseを3にする
    setTimeout(() => {
      battlePhase = 4;
    }, 2000);
  } else if (battlePhase == 4){
    //すべての敵の.isAliveがfalseならbattlePhaseを5にする
    let isAllDead = true;
    for (let e of enemies){
      if (e.isAlive){
        isAllDead = false;
      }
    }
    if (isAllDead){
      battlePhase = 5;
    }
  } else if (battlePhase == 5){
    enemies.push(new Enemy({ initPos: createVector(100, 500), player:p, type:"ice" }));
    enemies.push(new Enemy({ initPos: createVector(250, 700), player:p, type:"ice" }));
    enemies.push(new Enemy({ initPos: createVector(500, 900), player:p, type:"ice" }));
    enemies.push(new Enemy({ initPos: createVector(700, 600), player:p, type:"ice" }));
    enemies.push(new Enemy({ initPos: createVector(900, 300), player:p, type:"ice" }));
    enemies.push(new Enemy({ initPos: createVector(1100, 700), player:p, type:"ice" }));
    enemies.push(new Enemy({ initPos: createVector(1300, 900), player:p, type:"ice" }));
    enemies.push(new Enemy({ initPos: createVector(1200, 400), player:p, type:"ice" }));

    
    battlePhase = 6;
  } else if (battlePhase == 6){
    textSize(500);
    fill(100);
    text("Wave 3", 1920/2, 1080/2-200);
    //2秒後にbattlePhaseを3にする
    setTimeout(() => {
      battlePhase = 7;
    }, 2000);
  } else if (battlePhase == 7){
    //すべての敵の.isAliveがfalseならbattlePhaseを5にする
    let isAllDead = true;
    for (let e of enemies){
      if (e.isAlive){
        isAllDead = false;
      }
    }
    if (isAllDead){
      battlePhase = 8;
    }
  } else if (battlePhase == 8){
    textSize(500);
    fill(100);
    text("Clear!!", 1920/2, 1080/2-200);
  }
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
