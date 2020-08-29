var screens = 1;
var savedScreens = [];
var savedSnakes = [];
var livingSnakes = [];
let genCounter = 0;
var snakeIndex = 0;
let dirSet = 0;
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
            if(counter % 5 == 0){

                dirSet = 0;
                snake.think(p,food);
                oldX = snake.size[0].x;
                oldY = snake.size[0].y;
                snake.moveSnake();


                if(snake.awayFromFood(food,oldX,oldY,snake)){
                    snake.subtractScore();
                }
                    snake.addScore();
                
            }
            food.placeFood(p);
            if(food.hitsFood(snake)){
                food.generateFood(p);
                snake.score += 10;
            }

            if(snake.offScreen(p) || snake.collision() || snake.score < 0){
                //Dead;
                // if(snake.score < 0){
                //     console.log("dead by score");
                // }
                // p.background('blue');
                // if(snake.collision()){
                //     console.log("collision");
                // }
                // if(snake.offScreen(p)){
                //     console.log("offScreen");
                // }
                snake.dead = 1;
                let ind = findDeadSnake(livingSnakes);
                livingSnakes.splice(ind,1);
                savedSnakes.push(snake);
                snake = null;
                genCounter++;
            }
            
        }
        if(snake == null && savedSnakes.length == screens){
            snake = nextGen(snakeIndex,p)
            snakeIndex++;
            food.generateFood(p);

            
            counter = 0;
            if(snakeIndex == screens){
                snakeIndex = 0;

            }
            //genCounter = 0;
        }

        
        counter++;

    };
  };
  var myp5 = new p5(t);
  savedScreens.push(myp5);

  


  function findDeadSnake(livingSnakes){
    for(let j = 0; j < livingSnakes.length; j++){
        if(livingSnakes[j].dead == 1){
            return j;
        }
    }
}
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