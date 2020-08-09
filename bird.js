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
      this.brain = new NeuralNetwork(5,8,2);
    }


  }
  dispose() {
    this.brain.dispose();
  }
  placeBird(){

    fill(255,100);
    circle(this.x,this.y,this.size);
  }
  think(pipes) {

    let closest = null;
    let closestD = Infinity;
    for(let i = 0; i< pipes.length; i++){
      let d = (pipes[i].x+pipes[i].width)-this.x;
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
    inputs[4] = this.velocity/10;


    let output = this.brain.predict(inputs);
    if(output[0] > 0.5){
      this.up();
    }
  }
  offScreen() {
    return (this.y > height || this.y < 0);
  }
  update() {
    this.score++;
    //If it hits the bottom
    this.velocity *= 0.9;
    
    this.velocity += this.gravity;
    this.y += this.velocity;
    
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