class Enemy {
  constructor({ initPos, player, type }) {
    this.pos = initPos;
    this.radius = 25;
    this.vel = createVector(10, 10);
    this.hp = 100;
    //外部の参照
    this.player = player;
    //敵が生きてるか死んでるか
    this.isAlive = true;
    this.type = type;
    this.speed = 2;

    this.inactiveBulletIdList = [];
  }
  
  calcIsAlive(){
    if(this.hp<=0){
      this.isAlive=false;
    }
  }

  calcHp() {
    if (this.isAlive) {
      for (let i = 0; i < this.player.bullets.length; i++) {
        let b = this.player.bullets[i];
        if (!this.inactiveBulletIdList.includes(i) && dist(b.x, b.y, this.pos.x, this.pos.y) <= this.radius) {
          // 基礎ダメージ
          let damage = 0.1;
          // 属性による付加ダメージ
          console.log(b.typePower);
          if (this.type == "fire") {
            damage += b.typePower["volt"] / 10;
          } else if (this.type == "ice") {
            damage += b.typePower["fire"] / 10;
          } else if (this.type == "volt") {
            damage += b.typePower["ice"] / 10;
          } else {
            damage += 0.9;
          }
          this.hp -= damage;
          this.inactiveBulletIdList.push(i);
          this.player.eventPoint++;

          if(this.player.buff=="ice"){
            this.speed = 0.5;
            //3秒後に戻す
            setTimeout(() => {
              this.speed = 2;
            }, 10000);
          } 
        }
      }      
    }
  }

  calcMove() {
    if (this.isAlive) {
      this.pos.y += 2*sin(radians(this.speed * frameCount));
    }
  }

  display() {
    if (this.isAlive) {
      noStroke();
      if(this.type==="fire"){
        fill(255, 100, 100);
      } else if(this.type==="ice"){
        fill(0,0,150);
      } else {
        stroke(0);
        strokeWeight(2);
        fill(255,255,0);
      }
      
      circle(this.pos.x, this.pos.y, 2 * this.radius);

      // HP表示
      noStroke();
      fill(0);
      textSize(30);
      text(this.hp.toFixed(1), this.pos.x, this.pos.y + 2 * this.radius);
    }
  }
}
