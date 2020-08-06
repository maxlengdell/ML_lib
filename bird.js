class Bird{
  constructor(brain){
    this.y = height/2;
    this.x = 25;
    this.gravity = 0.5;
    this.velocity = 0;
    this.lift = -15;
    this.size = 25;

    this.score = 0;
    this.fitness = 0;

    if(brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    }else {
      this.brain = new NeuralNetwork(4,4,2);
    }


  }
  placeBird(){

    fill(255,100);
    circle(this.x,this.y,this.size);
  }
  think(pipes) {

    let closest = null;
    let closestD = Infinity;
    for(let i = 0; i< pipes.length; i++){
      let d = pipes[i].x-this.x;
      if(d < closestD){
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y/height;
    inputs[1] = closest.y_top/height;
    inputs[2] = closest.y_bot/height;
    inputs[3] = closest.x/width;


    let output = this.brain.predict(inputs);
    if(output[0] > 0.5){
      this.up();
    }
  }
  update() {
    this.score++;
    //If it hits the bottom
    this.velocity *= 0.9;
    if(this.y > height - this.size/2){
      this.y = height - this.size/2;
      this.velocity = 0;
    }
    //If it hits the roof
    else if(this.y < 0){
      this.y = 0 + this.size/2;
      this.velocity = 0;
    }
    else{
        this.velocity += this.gravity;
        this.y += this.velocity;
    }
  }
  up(){
    this.velocity += this.lift;
  }
  mutate() {
    this.brain.mutate(0.1);
  }
  copy() {
    return new Bird(this.brain);
  }
}