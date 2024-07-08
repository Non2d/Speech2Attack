class Button {
  constructor({
    x,
    y,
    w,
    h,
    sizeOfText = 16,
    label = "Button",
    gauge = 1,
    onClick = () => { },
    onPress = () => { }
  }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sizeOfText = sizeOfText;
    this.label = label;
    this.gauge = gauge; // うーん，やっぱりインスタンス内で共有することを考えたらdisplayCircleGauge関数に仮引数で取るよりこっちでもっといた方がいいんだろうな
    this.onClick = onClick; //コールバック関数を保存
    this.onPress = onPress;
    this.previousMouseIsPressed = true;
  }

  displayCircleGauge(t) {
    if (t < 0) {
      t = 0;
    } else if (t > 1) {
      t = 1;
    }
    stroke(200);
    strokeWeight(7);
    fill(100);
    if (t == 1) {

      let c = color(
        (frameCount % 100) + 155,
        ((frameCount + 33) % 100) + 155,
        ((frameCount + 66) % 100) + 155
      );
      fill(c);
    }
    ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
    noStroke();
    textSize(this.sizeOfText);
    textAlign(CENTER, CENTER);
    fill(0, 0, 100);
    if(t!=1){
      arc(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h, -PI / 2, -PI / 2 + t * TWO_PI, PIE);
    }
    fill(255);
    if(t==1){
      fill(0);
    }
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  display() {
    stroke(0);
    strokeWeight(1);
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    strokeWeight(0);
    textSize(this.sizeOfText);
    textAlign(CENTER, CENTER);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h;
  }

  handlePress() {
    if (mouseIsPressed && this.isMouseOver()) { //this.がないとスコープ外になる
      if (typeof this.onPress === 'function') {
        this.onPress(); // コールバック関数を呼び出す
      } else {
        console.error("callback is not a function.")
      }
    }
  }

  handleClick() {
    if (mouseIsPressed && !this.previousMouseIsPressed && this.isMouseOver()) { //this.がないとスコープ外になる
      if (typeof this.onClick === 'function') {
        this.onClick(); // コールバック関数を呼び出す
      } else {
        console.error("callback is not a function.")
      }
    }
    this.previousMouseIsPressed = mouseIsPressed;
  }
}