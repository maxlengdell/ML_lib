//flappy bird version

const total_pop = 100;
var birds = [];
var saved_birds = [];
var pipes = [];
let counter = 1;
let slider;
let width = 100;
let height = 200;
function keyPressed(){
  if(key === 's'){
    let bird = birds[0];
    let json = bird.brain.serialize();
    save(json, 'bird.json');
  }

}
function setup(){
  createCanvas(width,height);
  for(let i = 0; i < total_pop; i++)
  {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
  slider = createSlider(1, 100, 1);
}
function draw() {
  let snake_input;
  //Push new pipes
  for(let n = 0; n < slider.value(); n++){

    
    if(counter % 75 == 0){
      pipes.push(new Pipe());
      snake_input = parseInput();
      for(let bird of birds) {

        bird.think(pipes,snake_input);
      }
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
      //Leaves screen
    for(let i = birds.length - 1; i >= 0; i--){
      if(birds[i].offScreen()){
        saved_birds.push(birds.splice(i,1)[0]);
      }
    }

    for(let bird of birds) {

      //bird.think(pipes,snake_input);
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
function parseInput(){
  let input = [];
  loadPixels();
  for(let i = 0; i < pixels.length; i+= 4){
      let r = pixels[i+0];
      let g = pixels[i+1];
      let b = pixels[i+2];
      input.push(r,g,b);
  }
  return input;
}
