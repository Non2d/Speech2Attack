class Bullet{
  constructor({x,y,angle,speed, typePower}){
    this.x = x;
    this.y = y;
    this.vel = createVector(speed * Math.cos(angle), speed*Math.sin(angle));
    this.typePower = typePower; //与ダメージの属性係数は発射時に確定
    this.isActive = true;
  }
  calcPos(){
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
  display(){
    noStroke();
    fill(255,0,0);
    circle(this.x, this.y, 10);
  }
}