$(document).ready(function(){
//to keep the size boxed
$('.Game_Block').height($('.Game_Block').width());
$('.Game_Block').css('top',$('body').height()*0.13);
$('.Game_Block_leader').css('top',$('body').height()*0.13);
$('.Game_Block_leader').height($('.Game_Block').width());

//fix the size of num_block
$('.num_block').css('font-size',$('.num_block').width()*0.55);
//fix the size of replay and list
$('.top_bar_blocks').css('font-size',$('.num_block').width()*0.25);

padding_game_title=(parseInt($('body').height())-(parseInt($('.Game_Title').position().top)+parseInt($('.Game_Title').css('font-size'))))-10;
$('.Game_Title').css('padding-top',padding_game_title);
$('.Game_Title').css('padding-bottom',10);

});