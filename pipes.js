class Pipe{
  constructor(){
    this.spacing = 125;
    this.y_top = random(height / 6, 3 / 4 * height);
    this.y_bot = this.y_top + this.spacing;
    this.x = width;
    this.width = 20;
    this.velocity = 3;
  }
  placePipe(){
    fill(255);
    rect(this.x,0,this.width,this.y_top);
    rect(this.x,this.y_bot,this.width,this.y_bot + height);
  }
  update() {
    this.x -= this.velocity;
  }
  hits(bird){
    if(bird.x >= this.x){
       if((bird.y > this.y_bot) || (bird.y < this.y_top)){
        return true;
      }
    }
    return false;
  }
}
