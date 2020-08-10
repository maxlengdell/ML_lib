
var screens = 2;
var savedScreens = [];

 
// save this file as sketch.js
// Sketch One
for(let k = 0; k < screens ;k++){
  // Sketch Two
  

  var t = function( p ) { 
    var snakes = [];
    var population = 1;
    var counter = 0;
    var food;
    p.setup = function() {
        console.log("setup");
        p.createCanvas(200, 200);
        savedScreens.push(p);
        for(let i = 0; i < population; i++){
            let x = Math.random()*100;
            console.log(x);
            snakes[i] = new Snake(x,50);
        }
        food = new Food();
    };
  
    p.draw = function() {
        p.background(0);

        // for(let i = 0; i < population; i++){
        //     snakes[i].placeSnake(p);
        //     snakes[i].think(p);

        //     if(counter % 50 == 0){
        //         snakes[i].moveSnake();
        //     }
        //     if(snakes[i].offScreen(p)){
        //         snakes[i].splice(i,1);
        //     }
        // }

        // food.placeFood(p);

        // if(food.hitsFood(snakes)){
        //     food.generateFood(p);
        // }
        // // if(snake.hitsWall(snakes)){
        // //     food.generateFood(p);
        // // }
        // counter++;
    };
  };
  console.log("%d",k);
  var myp5 = new p5(t,("%d",k));
  savedScreens.push(myp5);

}


// function setup(){
//     //createCanvas(400, 400);

//     for(let i = 0; i < population; i++){
//         snakes[i] = new Snake();
        
//     }
//     food = new Food();
// }


// function draw(){
//     background(0);

//     for(let i = 0; i < population; i++){
//         snakes[i].placeSnake();
//         snakes[i].think();

//         if(counter % 10 == 0){
//             snakes[i].moveSnake();
//         }
//         if(snakes[i].offScreen()){
//             snakes[i].splice(i,1);
//         }
//     }

//     food.placeFood();

//     if(food.hits(snakes)){
//         food.generateFood();
//     }
//     counter++;


// }
// function keyPressed(){
//     if(keyCode === UP_ARROW && snake[0].dy != 10){
//         snake[0].dy = -10;
//         snake[0].dx = 0;
//     }else if(keyCode === RIGHT_ARROW && snake[0].dx != -10){
//         snake[0].dy = 0;
//         snake[0].dx = 10;
//     }else if(keyCode === LEFT_ARROW && snake[0].dx != 10){
//         snake[0].dy = 0;
//         snake[0].dx = -10;
//     }else if(keyCode === DOWN_ARROW && snake[0].dy != -10){
//         snake[0].dy = 10;
//         snake[0].dx = 0;
//     }

//   }