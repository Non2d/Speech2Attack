//てか、こういうふうにクラスで定義できれば、アホみたいにinitMainMenu関数とかやんなくて良いのかな？シーン切り替えの時、setup関数とかって発火するんか。それともコンストラクタ内で関数を動かすんか。
class Player {
  constructor({ initPos }) {
    this.pos = initPos; //入力がベクトルなら、なるべくコンストラクタではなくインスタンス作成時にcreateVectorする。なんとなく。
    this.vel = createVector(7, 7);
    this.radius = 20;

    this.bullets = []; //構成として、プレイヤーインスタンスがメンバ変数として座標等の銃弾のデータを保持・描画まで行う。将来的に、使用中の武器の種類を引数にし、それをもとにintervalなどの変数を参照する？となると、武器パラメータはenumとかで定義？とりあえず今はこのコストラクタで定数として初期化する。
    this.interval = 3;
    this.bulletSpeed = 12;
    this.shootCoolDownCount = 0;
    this.typePower = { "fire": 1, "ice": 1, "volt": 1 }
    this.buff = "";

    // インスタンス内共通変数
    this.angle = undefined;
    this.reticle = createVector(undefined, undefined);
    this.eventPoint = 0;
  }
  //可能な限りcalcとdisplayは分離し、計算が不完全な段階で表示してしまうのを防ぐ。
  calcAngle() {
    this.angle = Math.atan2(mouseY - this.pos.y, mouseX - this.pos.x);
  }
  calcMove() {
    if (keyIsDown(keyCodeDict.a)) this.pos.x -= this.vel.x;
    if (keyIsDown(keyCodeDict.d)) this.pos.x += this.vel.x;
    if (keyIsDown(keyCodeDict.w)) this.pos.y -= this.vel.y;
    if (keyIsDown(keyCodeDict.s)) this.pos.y += this.vel.y;
  }
  calcAim(r) {
    fill(0);
    noStroke();
    this.reticle = {
      x: this.pos.x + r * Math.cos(this.angle),
      y: this.pos.y + r * Math.sin(this.angle),
    };
  }
  calcBullet() {
    //銃弾追加
    print(this.buff);
    if (mouseIsPressed && this.shootCoolDownCount == 0) {
      let bullet;
      switch (this.buff) {
        case "fire":
          let angles = [this.angle - PI / 8, this.angle, this.angle + PI / 8];
          for (let angle of angles) {
            let bullet = new Bullet({
              x: this.pos.x,
              y: this.pos.y,
              angle: angle,
              speed: this.bulletSpeed,
              typePower: this.typePower
            });
            this.bullets.push(bullet);
          }
          break;
        case "ice":
          bullet = new Bullet({
            x: this.pos.x,
            y: this.pos.y,
            angle: this.angle,
            speed: this.bulletSpeed,
            typePower: this.typePower
          });
          this.interval = 1;
          this.bullets.push(bullet);
          break;
        case "volt":
          bullet = new Bullet({
            x: this.pos.x,
            y: this.pos.y,
            angle: this.angle,
            speed: 3*this.bulletSpeed,
            typePower: this.typePower
          });
          this.bullets.push(bullet);
          break;
        default:
          bullet = new Bullet({
            x: this.pos.x,
            y: this.pos.y,
            angle: this.angle,
            speed: this.bulletSpeed,
            typePower: this.typePower
          });
          this.interval = 3;
          this.bullets.push(bullet);
      }
    }
    if (!mouseIsPressed || this.shootCoolDownCount > this.interval) {
      this.shootCoolDownCount = 0;
    } else {
      this.shootCoolDownCount++;
    }
    //既存の銃弾の座標更新
    for (let b of this.bullets) {
      b.calcPos();
    }
  }
  setTypePower(typePower) {
    this.typePower = typePower;
  }
  calcEp() { }
  display() {
    // プレイヤー
    strokeWeight(5);
    stroke(0);
    noFill(0);
    circle(this.pos.x, this.pos.y, 2 * this.radius);

    //EP -> 表示は音声ボタン上に移行
    // strokeWeight(5);
    // if (this.eventPoint < 50) {
    //   stroke(255);
    //   fill(255);

    //   //buff
    //   this.interval = 3;
    // } else if (this.eventPoint < 100) {
    //   stroke(0, 0, 255);
    //   fill(0, 0, 255);

    //   //buff
    //   this.interval = 2;
    //   this.bulletSpeed = 20;
    // } else {
    //   let c = color(
    //     (frameCount % 100) + 155,
    //     ((frameCount + 33) % 100) + 155,
    //     ((frameCount + 66) % 100) + 155
    //   );
    //   stroke(c);
    //   fill(c);

    //   //buff
    //   this.interval = 1;
    //   this.bulletSpeed = 30;
    // }
    // textSize(30);
    // text(this.eventPoint, this.pos.x, this.pos.y);

    // レティクル
    stroke(0);
    strokeWeight(1);
    line(
      this.reticle.x - 5,
      this.reticle.y,
      this.reticle.x + 5,
      this.reticle.y
    );
    line(
      this.reticle.x,
      this.reticle.y - 5,
      this.reticle.x,
      this.reticle.y + 5
    );
    // 銃弾
    for (let b of this.bullets) {
      b.display();
    }
  }
}
