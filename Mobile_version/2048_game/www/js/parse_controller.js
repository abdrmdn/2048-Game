Parse.initialize("yx7Gv48rS6tpAyWxMPNk1PHPD5BI3CA9jyRLp31Z", "yiFRXc1fRQLXUUls8PTbldXQqWQeGy9fQa1cSRmy");

user_id_var=-1;
user_name_var='-';
user_score_var=0;   
user_leaderBoard=new Array();
user_leaderBoard_more=new Array();
user_leaderBoard_less=new Array();
user_leaderBoard_exact=new Array();
loading_leaderBoard=false;

function setUserId(id_param){user_id_var=id_param;}
function setUserScore(score_param){user_score_var=score_param;}
function setUserName(name_param){user_name_var=name_param;}
function leaderBoardArray_getter(){while(loading_leaderBoard){} return user_leaderBoard_more;}
function updateScore(data)
{
    
    $.each(data,function(index,val){
        current_score=val.get('score');

        if(parseInt(user_score_var)>parseInt(current_score)){
          alert(current_score+'s / '+user_score_var+'s');
          val.set('score',user_score_var);
          val.save();
        }
        });
}

function createNewScore()
{
      //create new one
      var LeaderBoard = Parse.Object.extend("leader_board_new");
      //to save
      var leader_board = new LeaderBoard();
      arr={user_id: user_id_var,user_name:user_name_var,score:user_score_var};//user_id_var,user_name_var
      alert(JSON.stringify(arr));
      leader_board.save(arr);
}

//this function shall return true or false
function processNewScore(score)
{
  if(user_id_var<1)
    {
      setTimeout(function(){ processNewScore(score);},500);
      return false;
    }

    
    //set vars
    setUserScore(score);
    
    var LeaderBoard = Parse.Object.extend("leader_board_new");
    var leader_board = new LeaderBoard();
    //to retrieve 
    var query = new Parse.Query(LeaderBoard);
    query.equalTo("user_id", user_id_var);
    query.find({success:function(res){
      if(res.length>0){
        //update
        
        updateScore(res);
      } else{
        //create new score
        createNewScore();
      }
    }});
    return true;
}

//this function will get the userid and check his place between his friends
//and return the result as an (id,name,score) array
function getUserLeaderBoard()
{
  
  //check if user_id exist
    if(user_id_var<1)
      return null;
    
    // loading_leaderBoard=true;
    user=new Array();
    more=new Array();
    less=new Array();

    var LeaderBoard = Parse.Object.extend("leader_board_new");
    var leader_board = new LeaderBoard();
    

    //to retrieve 
    var query = new Parse.Query(LeaderBoard);
    query.greaterThan("score", user_score_var);alert('asd'+user_score_var);
    query.find({success:function(res){
      if(res.length>0){
        alert(JSON.stringify(res));
        loading_leaderBoard=false;
      } else{
        
      }
    }});
    return true; 
}