class Enemy {
  constructor({ initPos, player }) {
    this.pos = initPos;
    this.radius = 25;
    this.vel = createVector(10, 10);
    this.hp = 100;
    //外部の参照
    this.player = player;
    //敵が生きてるか死んでるか
    this.isAlive = true;
  }
  
  calcIsAlive(){
    if(this.hp==0){
      this.isAlive=false;
    }
  }

  calcHp() {
    if (this.isAlive) {
      for (let b of this.player.bullets) {
        if (!b.hasHit && dist(b.x, b.y, this.pos.x, this.pos.y) < this.radius) {
          this.hp--;
          b.hasHit = true;
          this.player.eventPoint++;
        }
      }
    }
  }

  calcMove() {
    if (this.isAlive) {
      this.pos.y += sin(radians(2 * frameCount));
    }
  }

  display() {
    if (this.isAlive) {
      noStroke();
      fill(50, 200, 50);
      circle(this.pos.x, this.pos.y, 2 * this.radius);

      // HP表示
      fill(0);
      textSize(30);
      text(this.hp, this.pos.x, this.pos.y + 2 * this.radius);
    }
  }
}
