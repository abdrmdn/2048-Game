// facebookConnectPlugin.login(Array strings of permissions, Function success, Function failure)

user_facebook_id='';
user_facebook_name='';
user_access_token='';
checkwithLeaderBoard=false;
function getUserSocialID()
{
	return user_facebook_id;
}
function getUserSocialName()
{
	return user_facebook_name;
}
var fbLoginSuccess = function (userData) 
{
	if(userData.status=="connected")
	{
		//alert('accessToken='+userData.authResponse.accessToken);
		user_facebook_id=userData.authResponse.userID;
		//alert(''+JSON.stringify(userData.authResponse));
		//user_facebook_name=userData.authResponse.userName;
		user_access_token=userData.authResponse.accessToken;
		

		//get info
		facebookConnectPlugin.api("me/?fields=id,email,name", ["public_profile"],
	    function (result) {
	         //alert("Result: " + JSON.stringify(result));
	    },
	    function (error) {
	        alert("Failed: " + error);
	    });

	}
	else
	{
		// alert("UserInfo: " + JSON.stringify(userData));
	}
    //alert("UserInfo: " + JSON.stringify(userData));
}

function social_initApp()
{
    
    facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function (error) { alert("" + error) }
    );
    
}

function social_getfriends()
{
	facebookConnectPlugin.api("me/friends?fields=id,name", ["user_friends"],
	    function (result) {
	        // alert("Result: " + JSON.stringify(result.data));
	        
	    },
	    function (error) {
	        alert("Failed: " + error);
	    });

}

function checkLogin()
{
	
	

	facebookConnectPlugin.getLoginStatus(
     function (status) {
            //alert("current status: " + JSON.stringify(status));

            if (status.status == "connected") {
            	
                //get friends
                if(checkwithLeaderBoard)
                {friends=social_getfriends();}
				
				////init info
				//user_access_token=status.authResponse.accessToken;

                facebookConnectPlugin.api("me?fields=name,id", ['public_profile'],
			    function (result) {
			    	alert("Result: " + JSON.stringify(result));
			    	//init info
	                user_facebook_id=result.id;
					user_facebook_name=result.name;
					setUserId(user_facebook_id);//in parse
    				setUserName(user_facebook_name);//in parse
			    },
			    function (error) {
			        alert("Failed: " + error);
			    });
                

                //check in parse if they have scores
                //order from 2 before to 2 after


            }
            else{
                 social_initApp();
            }
     },
     function (e) {
            alert("Failed: " + e);
    });	
}

$(document).ready(function(){


});