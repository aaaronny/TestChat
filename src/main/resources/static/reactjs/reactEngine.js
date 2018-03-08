var client = null;
var username = null;
var displayName = null;
var profileImg = '';

//	LOGIN WITH GOOGLE
function onSignInGoogle(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  username = profile.getEmail();
	  displayName = profile.getName();
	  profileImg = profile.getImageUrl();
	  preLoad();
}


//	LOGIN WIDTH SYSTEM ACCOUNT
function login() {
	
	var utente = { username: $('#user').val(), password: $('#pass').val() };

	$.ajax({
		type : "POST",
		url : '/login',
		dataType : 'json',
		contentType : 'application/json',
		data : JSON.stringify(utente),
		statusCode : {
			200 : function(res) {
				username = $('#user').val();				
				preLoad();
			}
		}
	});

}

//	PRELOAD INIT
function preLoad(){
	$('#loginBox').css("display", "none");
	$('#chatBox').css("display", "inline-block");
	client = Stomp.over(new SockJS('/tsch'));
	ReactDOM.render(<ChatFull client={client} username={username} display={displayName} />, document.getElementById('chatBox'));
}


window.fbAsyncInit = function() {
  FB.init({
    appId      : '1022508357842402',
    xfbml      : true,
    version    : 'v2.12'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

