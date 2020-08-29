function preload(){
    
}

function setup(){
    createCanvas(600, 600);
    background('grey');

}
function draw(){
    stroke(255);
    if(mouseIsPressed){
        line(mouseX,mouseY,pmouseX,pmouseY);

        pushUnique();
        

    }
    else{
        checkCrossedLine();
    }
}
function restartCanvas(){
    background('grey');
    outerLine = [];
}
function pushUnique(){
    const coord = {
        x: mouseX,
        y: mouseY
    };
    outerLine.push(coord);
}
function checkCrossedLine(){
    outerLine.forEach(point =>{
        if(mouseX > point.x && mouseY > point.y){
            console.log("hey!");
        }
    })

}