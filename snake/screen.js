var screens = 1;
var savedScreens = [];

 
// save this file as sketch.js
// Sketch One
for(let k = 0; k < screens ;k++){
  // Sketch Two
  var t = function( p ) { 
    var snake;
    var population = 1;
    var counter = 0;
    var food;
    p.setup = function() {
        console.log("setup");
        p.createCanvas(400, 400);
        x = Math.ceil(Math.random(0,p.width)/10)*10;
        y = Math.ceil(Math.random(0,p.height)/10)*10;
        console.log(x);
        snake = new Snake(x,y);
        food = new Food();
    };
  
    p.draw = function() {
        p.background(0);
        snake.placeSnake(p);
        //snake.think(p);
        if(counter % 5 == 0){
            snake.moveSnake();
        }
        food.placeFood(p);
        if(food.hitsFood(snake)){
             food.generateFood(p);
        }
        //TODO:
        //If snake hits wall: destroy

        counter++;

    };


  };
  function keyPressed(){
    if(keyCode === UP_ARROW && snake[0].dy != 10){
        snake[0].dy = -10;
        snake[0].dx = 0;
    }else if(keyCode === RIGHT_ARROW && snake[0].dx != -10){
        snake[0].dy = 0;
        snake[0].dx = 10;
    }else if(keyCode === LEFT_ARROW && snake[0].dx != 10){
        snake[0].dy = 0;
        snake[0].dx = -10;
    }else if(keyCode === DOWN_ARROW && snake[0].dy != -10){
        snake[0].dy = 10;
        snake[0].dx = 0;
    }

  }
  var myp5 = new p5(t);
  savedScreens.push(myp5);

}

