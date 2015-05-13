var i = 359 , prec;
var degs;
var activeBorder;
color="#59B390";
played=false;
timerIncrement=150;
turn_speed=0.5;
function loopit(dir){
    if (dir == "c")
        i+=turn_speed;
    else
        i-=turn_speed;
    if (i < 0)
        {
            i = 0;
            if(!gameOver_flag)
            gameOver();
        }
    if (i > degs)
        {
            i = degs;
        }
    if(!gameOver_flag)
    {    
        prec = (100*i)/360;   
        $(".prec").html(Math.round(prec)+"%");
        
        if (i<=180){
            activeBorder.css('background-image','linear-gradient(' + (90+i) + 'deg, transparent 50%, '+color+' 50%),linear-gradient(90deg, '+color+' 50%, transparent 50%)');
            hx=(((180-i)/15)+1).toString(16).split('.')[0];
            hx2=(((i)/15)+5).toString(16).split('.')[0];
            hx3=(((i)/15)+1).toString(16).split('.')[0];
            color="#F"+hx+"A"+hx2+"3"+hx3;
            console.log(color);
        }
        else{
            activeBorder.css('background-image','linear-gradient(' + (i-90) + 'deg, transparent 50%, #F9F9F9 50%),linear-gradient(90deg, '+color+' 50%, transparent 50%)');
            color="#F1A541";
        }
    }
    setTimeout(function(){
        if(!played)
            loopit("nc");
        else
            loopit("c");
        
    },1);
    
}
function restartTimer(){
    played=false;
    i=359;
}
function increaseTimer()
{
    i+=timerIncrement;
}
function restartTimerSpeed(){
    turn_speed=0.5;
}


$(document).ready(function(){
i = 359 ;
degs = $("#prec").attr("class").split(' ')[1];
activeBorder = $("#activeBorder");


// setTimeout(function(){
//     if(!played)
//             loopit("c");
//         else
//             loopit("nc");
// },1);



});
