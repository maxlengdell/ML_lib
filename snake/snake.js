class Snake{
    constructor(brain){
        this.color = 'green';
        this.x_start = 50;
        this.y_start = 50;
        this.size = [{
                x: this.x_start,
                y: this.y_start
            },
            {
                x: this.x_start - 10,
                y: this.y_start
            },
            {
                x: this.x_start - 20,
                y: this.y_start
            },
            {
                x: this.x_start - 30,
                y: this.y_start
            },
            {
                x: this.x_start - 40,
                y: this.y_start
            }
        ]
        this.score = 0;
        this.fitness = 0;
        this.dx = 10;
        this.dy = 0;
        if(brain instanceof NeuralNetwork){
            this.brain = brain.copy();
        }else{
            this.brain = new NeuralNetwork(6,4,3);
        }

    }
    update(){
        this.score++;
    }
    think(p,food){
        //clear to the left:
        let inputs = [];
        inputs[0] = this.checkFront(p);
        inputs[1] = this.checkLeft(p);
        inputs[2] = this.checkRight(p);
        inputs[3] = this.foodAhead(food);
        inputs[4] = this.foodToLeft(food);
        inputs[5] = this.foodToRight(food);

        let output = this.brain.predict(inputs);
        if(output[0] > 0.5) {
            //Go straight
            
        }if(output[1] > 0.5) {
            //Go left
            this.goLeft();
        }if(output[2] > 0.5) {
            //Go right
            this.goRight();
        }
        //console.log(output);
        
    }
    awayFromFood(food,oldX,oldY,snake){
        //if it steers away from food. subtract score by 1.5
        //Returns one if it steers away from food

      let oldDst = dist(food.x,food.y,oldX,oldY);
      let newDst = dist(food.x,food.y,snake.size[0].x,snake.size[0].y);

       if(newDst > oldDst){
           return 1;
       }else{
           return 0;
       }
    }
    reset(){
        //console.log("reset");
        this.size = [{
            x: this.x_start,
            y: this.y_start
        },
        {
            x: this.x_start - 10,
            y: this.y_start
        },
        {
            x: this.x_start - 20,
            y: this.y_start
        },
        {
            x: this.x_start - 30,
            y: this.y_start
        },
        {
            x: this.x_start - 40,
            y: this.y_start
        }
    ]
        this.dx = 10;
        this.dy = 0;
    }
    addScore(){
        this.score += 2;
    }
    subtractScore(){
        this.score -= 1.5;
    }
    snakeToLeft(){
        head = this.size[0];
        tail = this.size;
        for(let j = 1; j < this.size.length; j++){
            if(head.x + dx == tail[j] || head.y + dy == tail[j]){
                console.log()
            }
        }
    }
    goRight(){
        if(dirSet == 0){
            dirSet = 1;
            if(this.dx == 10 && this.dy == 0){
                this.dx = 0;
                this.dy = 10;
            }
            else if(this.dx == -10 && this.dy == 0){
                this.dx = 0;
                this.dy = -10;
            }
            else if(this.dx == 0 && this.dy == 10){
                this.dx = -10;
                this.dy = 0;
            }
            else if(this.dx == 0 && this.dy == -10){
                this.dx = 10;
                this.dy = 0;
            }
        }

    
    }
    goLeft(){
        if(dirSet == 0){
            dirSet = 1;
            if(this.dx == 10 && this.dy == 0){
                this.dx = 0;
                this.dy = -10;
            }
            else if(this.dx == -10 && this.dy == 0){
                this.dx = 0;
                this.dy = 10;
            }
            else if(this.dx == 0 && this.dy == 10){
                this.dx = 10;
                this.dy = 0;
            }
            else if(this.dx == 0 && this.dy == -10){
                this.dx = -10;
                this.dy = 0;
            }
        }

    
    }
    checkLeft(p){
            //Returns 1 if wall is to the left
            if(this.dx == 10 && this.dy == 0){
                if(this.size[0].y -10 <  0){
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else if(this.dx == -10 && this.dy == 0){
                if(this.size[0].y + 10 >= p.height){
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else if(this.dx == 0 && this.dy == 10){
                if(this.size[0].x + 10 >= p.width){
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else if(this.dx == 0 && this.dy == -10){
                if(this.size[0].x - 10 < 0){
                    return 1;
                }
                else {
                    return 0;
                }
            }else{
                return 0;
            }
    }
    checkRight(p){
        //Returns 1 if wall is to the right
        //höger
        if(this.dx == 10 && this.dy == 0){
            if(this.size[0].y + 10 >= p.height){
                return 1;
            }
            else {
                return 0;
            }
        }
        //Vänster
        else if(this.dx == -10 && this.dy == 0){
            if(this.size[0].y - 10 < 0){
    
                return 1;
            }
            else {
                return 0;
            }
        }
        //Ned
        else if(this.dx == 0 && this.dy == 10){
            if(this.size[0].x - 10 < 0){
    
                return 1;
            }
            else {
                return 0;
            }
        }
        //Upp
        else if(this.dx == 0 && this.dy == -10){
            if(this.size[0].x + 10 >= p.width){
    
                return 1;
            }
            else {
                return 0;
            }
        }else{
            return 0;
        }
    }
    checkFront(p){
        //Right
        if(this.size[0].x + 10 >= p.width && this.dx !== 0){
            return 1;
        }
        else if(this.size[0].x - 10 < 0 && this.dx !== 0){
            return 1;
        }
        else if(this.size[0].y + 10 >= p.height && this.dy !== 0){
            return 1;
        }
        else if(this.size[0].y - 10 < 0 && this.dy !== 0){
            return 1;
        }else{
            return 0;
        }
    }
    offScreen(p){
        if(this.size[0].x > p.width || this.size[0].x < 0 || this.size[0].y > p.height || this.size[0].y < 0){
            return 1;
        }else {
            return 0;
        }
    }
    collision(){
        var tempSnake = Array.from(this.size);
        var head = [this.size[0]];
        tempSnake.shift();
        var tail = tempSnake;
        let r = 0;
        var ret;
        while(r < tail.length){
            if(head[0].x == tail[r].x && head[0].y == tail[r].y){
                return true;
            }else{
                ret = false;
            }
            r++
        }
        return ret;
    }
    foodAhead(food){
        if(this.size[0].x == food.x || this.size[0].y == food.y){
            return 1;
        }else{
            return 0;
        }
    }
    foodToRight(food){
         //höger
         if(this.dx == 10 && this.dy == 0){
            if(this.size[0].y < food.y){
                return 1;
            }
            else {
                return 0;
            }
        }
        //Vänster
        else if(this.dx == -10 && this.dy == 0){
            if(this.size[0].y > food.y){
                return 1;
            }
            else {
                return 0;
            }
        }
        //Ned
        else if(this.dx == 0 && this.dy == 10){
            if(this.size[0].x > food.x){
                return 1;
            }
            else {
                return 0;
            }
        }
        //Upp
        else if(this.dx == 0 && this.dy == -10){
            if(this.size[0].x < food.x){
                return 1;
            }
            else {
                return 0;
            }
        }else{
            return 0;
        }
    }
    foodToLeft(food){
            //höger
        if(this.dx == 10 && this.dy == 0){
            if(this.size[0].y > food.y){
                return 1;
            }
            else {
                return 0;
            }
        }
        //Vänster
        else if(this.dx == -10 && this.dy == 0){
            if(this.size[0].y < food.y){
                return 1;
            }
            else {
                return 0;
            }
        }
        //Ned
        else if(this.dx == 0 && this.dy == 10){
            if(this.size[0].x < food.x){
                return 1;
            }
            else {
                return 0;
            }
        }
        //Upp
        else if(this.dx == 0 && this.dy == -10){
            if(this.size[0].x > food.x){
                return 1;
            }
            else {
                return 0;
            }
        }else{
            return 0;
        }
    }
    placeSnake(p){
        p.fill(250,50);
        this.size.forEach(part => {
            p.fill('green');
            p.rect(part.x,part.y,10,10);
        });
    }
    // placeSnake(){
    //     fill(250,50);
    //     this.size.forEach(part => {
    //         fill('green');
    //         rect(part.x,part.y,10,10);
    //     });
    // }
    moveSnake() {
        const head = {
            x: this.size[0].x + this.dx,
            y: this.size[0].y + this.dy
        };
        this.size.unshift(head);
        this.size.pop();
    }
    mutate(){
        this.brain.mutate(0.1);
    }
    copy(){
        return new Snake(this.brain);
    }
}
function dist(x1,y1,x2,y2){
    let a = (x2-x1)*(x2-x1);
    let b = (y2-y1)*(y2-y1);
    let dist = Math.sqrt(a+b);
    return dist;

}