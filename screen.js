//flappy bird version

const total_pop = 300;
var birds = [];
var saved_birds = [];
var pipes = [];
let counter = 1;
function setup(){
  createCanvas(400,500);
  for(let i = 0; i < total_pop; i++)
  {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());

}
function draw() {
  background(0);
  //Push new pipes
  if(counter % 100 == 0){
    pipes.push(new Pipe());
  }

  //Place pipes
  for(let i = pipes.length-1; i >= 0; i--){
    pipes[i].placePipe();
    pipes[i].update();
    //Remove offscreen pipes
    if(pipes[i].x < -10){
      pipes.splice(i,1);
    }
  
    //Check if bird hits pipe
    for(let j = birds.length - 1; j >= 0; j--){
      if(pipes[i].hits(birds[j])){
        saved_birds.push(birds.splice(j,1)[0]);
      }
    }
  }

  for(let bird of birds) {
    bird.think(pipes);
    bird.placeBird();
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