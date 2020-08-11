var screens = 20;
var savedScreens = [];
var savedSnakes = [];
var livingSnakes = [];
let genCounter = 0;
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
        livingSnakes.push(snake);
        food = new Food();
    };
  
    p.draw = function() {
        p.background(0);
        //If snake is still alive
        if(snake instanceof Snake){
            snake.placeSnake(p);
            snake.think(p,food);
            snake.update();

            if(counter % 5 == 0){
                oldX = snake.x;
                oldY = snake.y;
                snake.moveSnake();

                snake.awayFromFood(food,oldX,oldY,snake);
            }
            if(counter % 100 == 0){
                let q = new Snake(p);
            }
            food.placeFood(p);
            if(food.hitsFood(snake)){
                food.generateFood(p);
                snake.score += 10;
            }

            if(snake.offScreen(p) || snake.collision()){
                //Dead;
                p.background('red');
                livingSnakes.splice(snake,1);
                savedSnakes.push(snake);
                snake = null;
                genCounter++;
            }
            
        }
        if(snake == null){
            snake = nextGen()
            livingSnakes.push(snake);
            //snake.reset();
            counter = 0;
            //genCounter = 0;
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