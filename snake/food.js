class Food{
    constructor() {
        this.food = [];
        this.x = Math.round(Math.random()*10)*10;
        this.y = Math.round(Math.random()*10)*10;
    }
    placeFood(p){
        p.fill('red');
        p.rect(this.x,this.y,10,10);
    }
    // placeFood(){
    //     fill('red');
    //     rect(this.x,this.y,10,10);
    // }
    hitsFood(snake){
        if(snake.size[0].x == this.x){
            if(snake.size[0].y == this.y){
                const head = {
                    x: snake.size[0].x + snake.dx,
                    y: snake.size[0].y + snake.dy}
                snake.size.push({});
                return true;
            }
        }
    }
    generateFood(p){
        this.x = Math.round(Math.random()*10)*10;
        this.y = Math.round(Math.random()*10)*10;

    }
    // generateFood(){
    //     this.x = Math.ceil((Math.random()*width)/10)*10;
    //     this.y = Math.ceil((Math.random()*height)/10)*10;
        
    //     console.log(this.x + " : " + this.y);
    // }
}