Parse.initialize("yx7Gv48rS6tpAyWxMPNk1PHPD5BI3CA9jyRLp31Z", "yiFRXc1fRQLXUUls8PTbldXQqWQeGy9fQa1cSRmy");

user_id_var=0;
user_name_var='-';
user_score_var=0;   

function setUserId(id_param){user_id_var=id_param;}
function setUserScore(score_param){user_score_var=score_param;}
function setUserName(name_param){user_name_var=name_param;}

function updateScore(data)
{
    $.each(res,function(index,val){
        val.set('score',user_score_var);
        val.save();
        });
}

function createNewScore()
{
      
      //create new one
      var LeaderBoard = Parse.Object.extend("leader_board");
      //to save
      var leader_board = new LeaderBoard();
      leader_board.save({user_id: user_id_var,user_name:user_name_var,score:user_score_var});
}

//this function shall return true or false
function processNewScore(score)
{

  //set vars
    setUserScore(score);
    
    var LeaderBoard = Parse.Object.extend("leader_board");
    var leader_board = new LeaderBoard();
    //to retrieve 
    var query = new Parse.Query(LeaderBoard);
    query.equalTo("user_id", user_id);alert('before find');
    query.find({success:function(res){
      alert('res:'); 
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
function getUserLeaderBoard(uid,friends)
{
    var LeaderBoard = Parse.Object.extend("leader_board");
    var leader_board = new LeaderBoard();
    //to retrieve 
    var query = new Parse.Query(LeaderBoard);
    query.equalTo("user_id", user_id);
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