// /////////////////
//variables to be initialized
	//direction codes for the input of KeyBoard
	var direction_codes = [];
	direction_codes["37"] = "left";
	direction_codes["38"] = "up";
	direction_codes["39"] = "right";
	direction_codes["40"] = "down";

	//number of rows and cols
	var rows=4;
	var cols=4;

	//block size
	var size='66px';
	var blocks_size='68';

	//numbers array library
	var numbers_allowed = new Array(2);

	//vacancies
	var free_places= new Array();
	var free_places_boolBoard=new Array();

	//moves
	var moves=[];

	//speed
	transition_speed=200;

	//finish count 
	finish_count=0
	touched=false;
	moved_this_turn=false;
// /////////////////
// /////////////////

function calculateScore()
{
	score=0;
	$.each($('.Game_Block .num_block'),function(){
		score+=parseInt($(this).attr('value'));
	});
	$('.Game_Score .score').text(score);

}

//initialize the following for the Game::
// game rows / columns
// number array
// and generate two random blocks
function initializeGame(numberOfRowBlock)
{
	//remove all blocks in the game 
	$('.Game_Block .num_block').remove();

	//rows and columns number
	rows=numberOfRowBlock;
	columns=numberOfRowBlock;
	
	//initialize numbers library
	numbers_allowed = new Array(2,2);

	//moves
	moves=[];

	//update the free places in the board
	updateMapVacancies();

	//generate two number blocks
	generateRandomNumBlock();
	generateRandomNumBlock();
}

function checkSimilarity(current_block,next_block)
{
	if(next_block.hasClass('newCombinedValue') || current_block.hasClass('newCombinedValue'))
	{
		//means cant add this to a new combined number, need to wait for next round
		return 0;
	}
	if(next_block.attr('value')==current_block.attr('value'))
	{
		old_value=parseInt(next_block.attr('value'));
		new_val=old_value*2;
		numbers_allowed.push(old_value);if(old_value>2)numbers_allowed.push(old_value/2);
		current_block.attr('value',new_val).addClass('newCombinedValue').addClass('toRemove');
		next_block.attr('value',new_val).addClass('newCombinedValue');
		next_block.animate({
        width: '70px',height: '62px',margin:'1px'},(transition_speed/4),function(){
		$(this).animate({width: '65px',height: '57px',margin:'6px'},(transition_speed/4));});
		touched=true;
		return 1;	
	}
	return 0;
}
//moveRight function
function moveRight()
{
	
		for (var i =rows-1; i >= 0; i--) {
			for (var j =cols-2; j >= 0; j--) {
				if(free_places_boolBoard[i][j])
				{
					moves_exist=false;
					browser_index=j+1;
					current_block=$('.Game_Block .coords-'+i+'-'+j);
					//skip empty spaces
					while(browser_index<(cols) && !free_places_boolBoard[i][browser_index])
						{browser_index++;moves_exist=true;}
					
					
					if((browser_index)<(cols))
					{
						next_block=$('.Game_Block .coords-'+i+'-'+(browser_index));
					
						if(checkSimilarity(current_block,next_block) == 1)
						{
							browser_index++;
							while(browser_index<(cols) && !free_places_boolBoard[i][browser_index])
							{browser_index++;moves_exist=true;}
						}
					}
					browser_index--;
					free_places_boolBoard[i][j]=false;free_places_boolBoard[i][browser_index]=true;

					moves['coords-'+i+'-'+j]='coords-'+i+'-'+browser_index;
					updateBoardPlaces();
				}
			};
		};
	
}
//moveLeft function
function moveLeft()
{
	for (var i =rows-1; i >= 0; i--) {
			for (var j =1; j < cols; j++) {
				if(free_places_boolBoard[i][j])
				{
					moves_exist=false;
					browser_index=j-1;
					current_block=$('.Game_Block .coords-'+i+'-'+j);
					//skip empty spaces
					while(browser_index>-1 && !free_places_boolBoard[i][browser_index])
						{browser_index--;moves_exist=true;}
					

					if((browser_index)>-1)
					{
						next_block=$('.Game_Block .coords-'+i+'-'+(browser_index));
						if(checkSimilarity(current_block,next_block)==1)
						{
							browser_index--;
							while(browser_index>-1 && !free_places_boolBoard[i][browser_index])
							{browser_index--;moves_exist=true;}
						}
					}
					browser_index++;
					free_places_boolBoard[i][j]=false;free_places_boolBoard[i][browser_index]=true;

					moves['coords-'+i+'-'+j]='coords-'+i+'-'+browser_index;
					updateBoardPlaces();
				}
			};
		};
}
//moveUp function
function moveUp()
{
	for (var i =1; i < rows; i++) {
		for (var j =cols-1; j >= 0; j--) {
				if(free_places_boolBoard[i][j])
				{
					moves_exist=false;
					browser_index=i-1;
					current_block=$('.Game_Block .coords-'+i+'-'+j);
					//skip empty spaces
					while(browser_index>-1 && !free_places_boolBoard[browser_index][j])
						{browser_index--;moves_exist=true;}
					
					if((browser_index)>-1)
					{
						next_block=$('.Game_Block .coords-'+(browser_index)+'-'+j);

						if(checkSimilarity(current_block,next_block)==1)
						{
							browser_index--;
							while(browser_index>-1 && !free_places_boolBoard[browser_index][j])
							{browser_index--;moves_exist=true;}
						}
					}
					browser_index++;
					free_places_boolBoard[i][j]=false;free_places_boolBoard[browser_index][j]=true;

					moves['coords-'+i+'-'+j]='coords-'+browser_index+'-'+j;
					updateBoardPlaces();
				}
			};
		};
}
//moveDown function
function moveDown()
{
	for (var i =rows-1; i >= 0; i--) {
			for (var j =cols-1; j >= 0; j--) {
				if(free_places_boolBoard[i][j])
				{
					moves_exist=false;
					browser_index=i+1;
					current_block=$('.Game_Block .coords-'+i+'-'+j);
					//skip empty spaces
					while(browser_index<(cols) && !free_places_boolBoard[browser_index][j])
						{browser_index++;moves_exist=true;}
					
					
					if((browser_index)<(cols))
					{
						next_block=$('.Game_Block .coords-'+(browser_index)+'-'+j);
						if(checkSimilarity(current_block,next_block)==1)
						{
							browser_index++;
							while(browser_index<(cols) && !free_places_boolBoard[browser_index][j])
							{browser_index++;moves_exist=true;}
						}	
					}
					browser_index--;
					free_places_boolBoard[i][j]=false;free_places_boolBoard[browser_index][j]=true;

					moves['coords-'+i+'-'+j]='coords-'+browser_index+'-'+j;
					updateBoardPlaces();
				}
			};
		};
}
function updateBoardPlaces()
{
	for (var key_i in moves){
		//to check if no new moves were made this turn
		if(key_i != moves[key_i]){moved_this_turn=true;}

		obj=$('.Game_Block .'+key_i).removeClass(key_i).addClass(moves[key_i]);
		if($('.'+moves[key_i]).length>1){
			setTimeout(function(){
				$('.toRemove').remove();
			 	},transition_speed);
			//$($('.'+moves[key_i])[1]).addClass('toRemove').fadeOut(transition_speed*2,function(){$('.toRemove').remove();});
		}
		//$('.'+moves[key_i]).text($('.'+moves[key_i]).attr('value'));
		console.log(key_i+" to "+moves[key_i]);
		blockcls=moves[key_i].split('-');
		obj.animate({'top':(blockcls[1]*blocks_size)+'px', 'left':(blockcls[2]*blocks_size)+'px'},transition_speed);
	};
	moves=[];
}

//this will take the moves and 
//this function will be responsible for moving the blocks
function moveBlocks(direction)
{
	if(direction=='up')
	{	moveUp();		}
	else if(direction=='down')
	{	moveDown();		}
	else if(direction=='right')
	{	moveRight();	}
	else if(direction=='left')
	{	moveLeft();		}
	else
	{}
	
	//updateBoardPlaces();
	updateMapVacancies();
	setTimeout(function(){calculateScore();},(transition_speed));
}

//this function  will show that there are no more moves to be added
// the game has finished
function gameOver()
{
	$('.Game_Over').fadeOut(500);
    $('.Game_Over').fadeIn(500);
}

// this function wil generate a new random Number block in 
// the game board when the directing of board blocks is done
function generateRandomNumBlock()
{

	clone=$('.num_block.clonable').clone().removeClass('clonable');
	rand_blockClass=free_places[Math.floor((Math.random() * 100))%(free_places.length)];
	rand_number=numbers_allowed[Math.floor((Math.random() * 100))%numbers_allowed.length];
	clone.addClass(rand_blockClass);
	clone.text(rand_number);
	clone.attr('value',rand_number);
	clone.appendTo( $('.Game_Block') );

	//update the boolean places board 
	blockcls=rand_blockClass.split('-');
	free_places_boolBoard[blockcls[1]][blockcls[2]]=true;
	clone.addClass('toGenerate');

	//setTimeout(function(){},transition_speed);
	clone.animate({'top':(blockcls[1]*blocks_size)+'px', 'left':(blockcls[2]*blocks_size)+'px'},transition_speed,function(){$('.toGenerate').removeClass('toGenerate').show();});
	//update the free places in the board
	updateMapVacancies();
}

//this will generate an array of available blocks
function updateMapVacancies()
{
	//clear all combined values
	$.each($('.newCombinedValue'),function(index,val){
		$(this).text($(this).attr('value')).removeClass('newCombinedValue');
	});

	//update places on metrix
	free_places=new Array();index=0;
	for (var i = 0; i < rows; i++) {
		free_places_boolBoard[i]=new Array();
		for (var j = 0; j < cols; j++) {
			if($('.Game_Block .coords-'+i+'-'+j).length > 0){free_places_boolBoard[i][j]=true;}
			else{free_places[index]='coords-'+i+'-'+j; index++; free_places_boolBoard[i][j]=false;}
		}
	}
}


//do the main process in the game 
function process_game(direction)
{
	if(touched){finish_count=0;}
	//if still moves left or not
	if(!touched && finish_count==0 && free_places.length==0)
	{
		finish_count++;
	}
	else if(!touched && finish_count==1 && free_places.length==0)
	{
		gameOver();
		return;
	}

	touched=false;
	
	//1.do move action
	moveBlocks(direction);

	if(moved_this_turn)
	{
		moved_this_turn=false;
		//2.generate number block
		generateRandomNumBlock();
	}

}

$(document).ready(function(){
	
	//.initialize Game
	initializeGame(4);

	//get the event from the keyboard for the game 
	$('body').keyup(function(event){
		
		if(event.which>36 && event.which<41)
		{
			direction=direction_codes[""+event.which];
			process_game(direction);
		}
		else
		{

		}
	});

	$('.Game_Replay').click(function(event){
		event.preventDefault();
		//.initialize Game
		initializeGame(4);
		$('.Game_Over').hide();
	});
});