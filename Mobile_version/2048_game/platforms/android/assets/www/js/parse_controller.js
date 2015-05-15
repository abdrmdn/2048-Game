Parse.initialize("yx7Gv48rS6tpAyWxMPNk1PHPD5BI3CA9jyRLp31Z", "yiFRXc1fRQLXUUls8PTbldXQqWQeGy9fQa1cSRmy");

user_id_var=-1;
user_name_var='-';
user_score_var=0;   
user_best_score_var=0;
user_leaderBoard=new Array();
user_leaderBoard_more=new Array();
user_leaderBoard_less=new Array();
user_leaderBoard_exact=new Array();
loading_leaderBoard=false;

function setUserId(id_param){user_id_var=id_param;}
function setUserScore(score_param){user_score_var=score_param;}
function setUserName(name_param){user_name_var=name_param;}
function leaderBoardArray_getter(){while(loading_leaderBoard){};  return user_leaderBoard;}
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
var LeaderBoard = Parse.Object.extend("leader_board_new");
var leader_board = new LeaderBoard();

//this function will get the userid and check his place between his friends
//and return the result as an (id,name,score) array
function getUserLeaderBoard()
{
  
  //check if user_id exist
    if(user_id_var<1)
      return null;
    
    loading_leaderBoard=false;
    user=new Array();
    user_leaderBoard=new Array();

    LeaderBoard = Parse.Object.extend("leader_board_new");
    leader_board = new LeaderBoard();

    //to retrieve 
    var query = new Parse.Query(LeaderBoard);
    query.equalTo("user_id", user_id_var);
    query.find({success:function(res_et){
      if(res_et.length>0){
        // equal to
        // ===========
        
            // alert(JSON.stringify(res_et));
        

            user_best_score_var=res_et[0].get('score');
            // user_name_var=res_et[0].get('user_name');
            
            var query = new Parse.Query(LeaderBoard);
            query.greaterThan("score", user_best_score_var);
            query.ascending("score");
            query.limit(2);
            query.find({success:function(res_gt){
              if(res_gt.length>0){
                // Greater Than
                // ===========

                  //register more
                  // $.each(res_gt,function(index,val){
                    for (var i = res_gt.length - 1; i >= 0; i--) {
                      user_leaderBoard.push({user_name : res_gt[i].get('user_name'),score : res_gt[i].get('score')});
                    };
                  // });
                  //register exact
                  user_leaderBoard.push({user_name : user_name_var, score : user_best_score_var, is_user: true});

//                  /*
                  var query = new Parse.Query(LeaderBoard);
                  query.lessThan("score", user_best_score_var);
                  query.descending("score");
                  query.limit(2);
                  query.find({success:function(res_lt){
                    if(res_lt.length>0){
                      // less Than
                      // ===========
                      
                      $.each(res_lt,function(index,val){
                        user_leaderBoard.push({user_name : val.get('user_name'),score : val.get('score')});
                      });

                      //remove everything first
                      $('.name_block.name_block_active').remove();
                      //for each show records
                      $.each(user_leaderBoard,function(index,val){
                        name_block_clone=$('.name_block.clonable').clone().removeClass('clonable').addClass('name_block_active');
                        name_block_clone.find('.name').text(val.user_name);
                        name_block_clone.find('.score').text(val.score);
                        name_block_clone.appendTo( $('.Game_Block_leader') );
                        if(val.is_user){name_block_clone.addClass('user');}
                        $('.name_block_active').show();
                      });

                      loading_leaderBoard=false;
                    } else{
                      
                    }

                  }});
                  //*/
                  
                  // ===========
              } else{
                
              }
            }});
        // ===========

      } else{
        
      }
    }});
    return true; 
}