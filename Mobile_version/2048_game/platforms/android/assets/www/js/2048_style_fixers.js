$(document).ready(function(){
//to keep the size boxed
$('.Game_Block').height($('.Game_Block').width());
$('.Game_Block').css('top',$('body').height()*0.1);

//fix the size of num_block
$('.num_block').css('font-size',$('.num_block').width()*0.55);
//fix the size of replay and list
$('.top_bar_blocks').css('font-size',$('.num_block').width()*0.25);

});