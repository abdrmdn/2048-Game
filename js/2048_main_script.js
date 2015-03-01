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
	var size='50px';

	//numbers array library
	var numbers_allowed = new Array(2,2,4);

	//vacancies
	var free_places= new Array();
// /////////////////
// /////////////////



//initialize the following for the Game::
// game rows / columns
// number array
// and generate two random blocks
function initializeGame(numberOfRowBlock)
{
	//rows and columns number
	rows=numberOfRowBlock;
	columns=numberOfRowBlock;
	
	//initialize numbers library
	numbers_allowed = new Array(2,2,4);

	//update the free places in the board
	updateMapVacancies();

	//generate two number blocks
	generateRandomNumBlock();
	generateRandomNumBlock();



}
//this function  will show that there are no more moves to be added
// the game has finished
function gameOver()
{
	console.log('gameOver');
}

// this function wil generate a new random Number block in 
// the game board when the directing of board blocks is done
function generateRandomNumBlock()
{

	clone=$('.num_block.clonable').clone().removeClass('clonable');
	rand_blockClass=free_places[Math.floor((Math.random() * 100) )%(free_places.length)];
	rand_number=numbers_allowed[Math.floor((Math.random() * 100) )%numbers_allowed.length];
	clone.addClass(rand_blockClass);console.log(rand_number);
	clone.val(rand_number).show();
	clone.appendTo( $('.Game_Block') );

	//update the free places in the board
	updateMapVacancies();
}

//this will generate an array of available blocks
function updateMapVacancies()
{
	free_places=new Array();index=0;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if($('.Game_Block .coords-'+i+'-'+j).length > 0){}
			else{free_places[index]='coords-'+i+'-'+j; index++;}
		}
	}
}
//this function will be responsible for moving the 
function moveBlocks(direction)
{

}

//do the main process in the game 
function process_game(direction)
{
	//if still moves left or not
	if(free_places.length>0)
	{
		//1.do move action
		moveBlocks(direction);

		//2.generate number block
		generateRandomNumBlock();
	}
	else
	{
		gameOver();
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

});