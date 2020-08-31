var screens = 20;
var savedScreens = [];
var savedSnakes = [];
var livingSnakes = [];
let generation = 1;
let highestScore = 0;
var snakeIndex = 0;
let dirSet = 0;
let width = 100;
let height = 100;
let speed = 5;
for(let k = 0; k < screens ;k++){

  var t = function( p ) { 
    var snake;
    var population = 1;
    var counter = 0;
    var food;
    var pixelInput;
    p.setup = function() {
        p.createCanvas(width, height);
        x = Math.ceil(Math.random(0,p.width)/10)*10;
        y = Math.ceil(Math.random(0,p.height)/10)*10;
        snake = new Snake(p);
        livingSnakes.push(snake);
        food = new Food();
    };
    
    p.draw = function() {

        p.background(0);
        if(k == 0){
            p.fill('white');
            p.text(('Generation: '+ generation),5,10);
            p.text(('Highest score: '+ highestScore),5,25);
        }
        
        //If snake is still alive
        if(snake instanceof Snake){
            snake.placeSnake(p);
            if(counter % speed == 0){
                snake_input = parseInput(p);


                dirSet = 0;
                snake.think(p,food,snake_input);
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
                if(snake.score > highestScore){
                    highestScore = snake.score;
                }
                snake.dead = 1;
                
                let ind = findDeadSnake(livingSnakes);
                livingSnakes.splice(ind,1);
                savedSnakes.push(snake);
                snake = null;
            }
            
        }
        if(snake == null && savedSnakes.length == screens){
            snake = nextGen(snakeIndex,p)
            snakeIndex++;
            food.generateFood(p);

            
            counter = 0;
            if(snakeIndex == screens){
                snakeIndex = 0;
                generation++;

            }
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
function parseInput(p){
    let inputs = [];
    p.loadPixels();
    for(let i = 0; i < p.pixels.length; i+= 4){
        let r = p.pixels[i+0];
        let g = p.pixels[i+1];
        let b = p.pixels[i+2];
        inputs.push(r,g,b);
    }
    return inputs;
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