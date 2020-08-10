class Food{
    constructor() {
        this.food = [];
        //this.x = random(0,width);
        //this.y = random(0,height);
        this.x = 50;
        this.y = 50;
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
                console.log("eaten");
                return true;
            }
        }
    }
    // generateFood(p){
    //     this.x = Math.ceil(Math.random()/10)*10;
    //     this.y = Math.ceil(Math.random()/10)*10;
    //     console.log(this.x + " : " + this.y);
    // }
    generateFood(){
        this.x = Math.ceil((Math.random()*width)/10)*10;
        this.y = Math.ceil((Math.random()*height)/10)*10;
        
        console.log(this.x + " : " + this.y);
    }
}