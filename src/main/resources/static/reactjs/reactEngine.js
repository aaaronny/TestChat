var client = null;
var username = null;
var displayName = null;
var profileImg = '';

//CHECK COOKIE
function checkCookieAccess() {
	var ck = document.cookie;
	alert(ck);
	if (ck != null && ck .length>0){
		var ckval = ck.substring(5);
		var json = JSON.parse(ckval);
		alert(ckval);
		username = json.username;
		displayName = json.username;
		preLoad();
	}
}

//LOGIN WITH GOOGLE
function onSignInGoogle(googleUser) {
  var profile = googleUser.getBasicProfile();
  username = profile.getEmail();
  displayName = profile.getName();
  profileImg = profile.getImageUrl();
  preLoad();
}


//	LOGIN WIDTH SYSTEM ACCOUNT
var loginFunc = function login(user, pass) {
	
	alert('Ti stai loggando con il sistema interno...');
	
	var utente = { username: user, password: pass };

	$.ajax({
		type : "POST",
		url : '/login',
		dataType : 'json',
		contentType : 'application/json',
		data : JSON.stringify(utente),
		statusCode : {
			200 : function(res) {
				username = user;
				displayName = user;				
				preLoad();
			}
		}
	});

}

//	PRELOAD INIT
function preLoad(){
	$('#loginGoogleBox').css("display", "none");
	//$('#chatBox').css("display", "inline-block");
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

checkCookieAccess();

ReactDOM.render(<div><LoginPage login={loginFunc} /><AccountKit /></div>, document.getElementById('chatBox'));

