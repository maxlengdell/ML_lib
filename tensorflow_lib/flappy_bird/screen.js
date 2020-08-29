//flappy bird version

const total_pop = 250;
var birds = [];
var saved_birds = [];
var pipes = [];
let counter = 1;
let slider;

function keyPressed(){
  if(key === 's'){
    let bird = birds[0];
    let json = bird.brain.serialize();
    save(json, 'bird.json');
  }

}
function setup(){
  createCanvas(400,500);
  tf.setBackend('cpu');
  for(let i = 0; i < total_pop; i++)
  {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
  slider = createSlider(1, 100, 1);
}
function draw() {
  //Push new pipes
  for(let n = 0; n < slider.value(); n++){

    
    if(counter % 75 == 0){
      pipes.push(new Pipe());
    }

    //Place pipes
    for(let i = pipes.length-1; i >= 0; i--){
      pipes[i].placePipe();
      pipes[i].update();
      //Remove offscreen pipes
      if(pipes[i].x < -60){
        pipes.splice(i,1);
      }
    
      //Check if bird hits pipe
      for(let j = birds.length - 1; j >= 0; j--){
        if(pipes[i].hits(birds[j])){
          saved_birds.push(birds.splice(j,1)[0]);
        }
      }
    }
    for(let i = birds.length - 1; i >= 0; i--){
      if(birds[i].offScreen()){
        saved_birds.push(birds.splice(i,1)[0]);
      }
    }

    for(let bird of birds) {
      bird.think(pipes);
      bird.update();
    }
    if(birds.length === 0){
      counter = 0;
      nextGen();
      pipes = [];
      pipes.push(new Pipe());

    }
    counter ++;
  }
//Drawing
  background(0);

  for(let bird of birds) {
    bird.placeBird();
  }
  for(let pipe of pipes){
    pipe.placePipe();
  }


}