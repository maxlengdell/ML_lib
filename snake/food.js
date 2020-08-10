class Food{
    constructor() {
        this.food = [];
        //this.x = random(0,width);
        //this.y = random(0,height);
        this.x = 250;
        this.y = 150;
    }
    placeFood(p){
        p.fill('red');
        p.rect(this.x,this.y,10,10);
    }
    hitsFood(snake){
        for(let i = 0; i < population; i++){
        
            if(snake[i].size[0].x == this.x){
                if(snake[i].size[0].y == this.y){
                    console.log("eaten");
                    return true;
                }
            }
        }
    }
    generateFood(p){
        this.x = Math.ceil(Math.random(0,p.width)/10)*10;
        this.y = Math.ceil(Math.random(0,p.height)/10)*10;
        console.log(this.x + " : " + this.y);
    }
    
}