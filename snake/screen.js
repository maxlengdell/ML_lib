var screens = 100;
var savedScreens = [];
var savedSnakes = [];

for(let k = 0; k < screens ;k++){

  var t = function( p ) { 
    var snake;
    var population = 1;
    var counter = 0;
    var food;
    p.setup = function() {
        p.createCanvas(200, 200);
        x = Math.ceil(Math.random(0,p.width)/10)*10;
        y = Math.ceil(Math.random(0,p.height)/10)*10;
        snake = new Snake(p);
        food = new Food();
    };
  
    p.draw = function() {
        p.background(0);
        //If snake is still alive
        if(snake instanceof Snake){
            snake.placeSnake(p);
            snake.think(p,food);
            if(counter % 5 == 0){
                snake.moveSnake();
            }
            food.placeFood(p);
            if(food.hitsFood(snake)){
                food.generateFood(p);
                snake.score += 10;
            }

            if(snake.offScreen(p) || snake.collision()){
                savedSnakes.push(snake);
                snake = null;
            }
        }
        if(savedSnakes.length == screens){
            //Nextgen
            counter = 0;
            nextGen();
        }
        
        counter++;

    };
  };
  var myp5 = new p5(t);
  savedScreens.push(myp5);

}
// var snake;
// var population = 1;
// var counter = 0;
// var food;
// function setup(){
//     createCanvas(400, 400);
//     snake = new Snake(100,100);
//     food = new Food();
// }
// function draw(){
//     background(0);
//     snake.placeSnake();
//     if(counter % 5 == 0){
//         snake.moveSnake();
//     }
//     food.placeFood();
//     if(food.hitsFood(snake)){
//             food.generateFood();
            
//             food.placeFood();
//     }
//     if(snake.foodToLeft(food)){
//         console.log("left");
//     }
//     counter++;
// }
// function keyPressed(){
//     if(keyCode === UP_ARROW && snake.dy != 10){
//         snake.dy = -10;
//         snake.dx = 0;
//     }else if(keyCode === RIGHT_ARROW && snake.dx != -10){
//         snake.dy = 0;
//         snake.dx = 10;
//     }else if(keyCode === LEFT_ARROW && snake.dx != 10){
//         snake.dy = 0;
//         snake.dx = -10;
//     }else if(keyCode === DOWN_ARROW && snake.dy != -10){
//         snake.dy = 10;
//         snake.dx = 0;
//     }

//   }