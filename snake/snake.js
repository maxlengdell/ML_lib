class Snake{
    constructor(x_start,y_start){
        this.color = 'green';
        this.x_start = x_start;
        this.y_start = y_start;
        this.size = [{
                x: x_start,
                y: y_start
            },
            {
                x: x_start - 10,
                y: y_start
            },
            {
                x: x_start - 20,
                y: y_start
            },
            {
                x: x_start - 30,
                y: y_start
            },
            {
                x: x_start - 40,
                y: y_start
            }
        ]
        this.dx = 10;
        this.dy = 0;
        this.brain = new NeuralNetwork(3,4,3);
        this.score = 0;

    }
    update(){
        this.score++;
    }
    think(p){
        //clear to the left:
        let inputs = [];
        inputs[0] = this.checkFront(p);
        inputs[1] = this.checkLeft(p);
        inputs[2] = this.checkRight(p);

        let output = this.brain.predict(inputs);
        if(output[1] > 0.5) {
            //Go right
            console.log("right");

            this.goRight();
        }else if(output[2] > 0.5) {
            //Go right
            console.log("left");
            this.goLeft();
        }else if(output[0] > 0.5) {
            console.log("straight");
            //Go right
        }
        //console.log(output);
        
    }
    goRight(p){

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
    goLeft(p){
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
    checkLeft(p){
        //Returns 1 if wall is to the left
        if(this.dx == 10 && this.dy == 0){
            if(this.size[0].y -10<  0){
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
        if(this.x >= p.width || this.x < 0 || this.y >= p.height || this.y < 0){
            console.log("outside");
            return 1;
        }else {
            return 0;
        }
    }
    foodAhead(p,food){
        if(this.size[0].x == food.x || this.size[0].y == food.y){
            console.log("food ahead");
        }
    }
    foodToRight(p,food){
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
    foodToLeft(p,food){
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
    moveSnake() {
        const head = {
            x: this.size[0].x + this.dx,
            y: this.size[0].y + this.dy
        };
        this.size.unshift(head);
        this.size.pop();
        }

}