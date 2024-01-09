
function setup()
{
    createCanvas(500,500)

}


function draw(){
    background(200);

    let num = 10;
    let y = 50;
    while (num > 0) {
        text(num, 100, y);
        textSize(30);
        num = num - 1;
        y = y + 35;
    }
}