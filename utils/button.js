class Button {
  constructor({
    x,
    y,
    w,
    h,
    sizeOfText = 16,
    label = "Button",
    onClick = () => {},
    onPress = () => {}
  }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sizeOfText = sizeOfText;
    this.label = label;
    this.onClick = onClick; //コールバック関数を保存
    this.onPress = onPress;
    this.previousMouseIsPressed = true;
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
  
  handlePress(){
    if(mouseIsPressed&&this.isMouseOver()){ //this.がないとスコープ外になる
      if (typeof this.onPress === 'function') {
        this.onPress(); // コールバック関数を呼び出す
      } else {
        console.error("callback is not a function.")
      }
    }
  }
  
  handleClick(){
    if(mouseIsPressed&&!this.previousMouseIsPressed&&this.isMouseOver()){ //this.がないとスコープ外になる
      if (typeof this.onClick === 'function') {
        this.onClick(); // コールバック関数を呼び出す
      } else {
        console.error("callback is not a function.")
      }
    }
    this.previousMouseIsPressed = mouseIsPressed;
  }
}