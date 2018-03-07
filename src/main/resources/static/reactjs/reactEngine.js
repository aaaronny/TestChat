//	LOGIN WITH GOOGLE
function onSignInGoogle(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  username = profile.getEmail();
	  displayName = profile.getName();
	  profileImg = profile.getImageUrl();
	  preLoad();
}

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

function preLoad(){
	$('#loginBox').css("display", "none");
	$('#chatBox').css("display", "inline-block");
	client = Stomp.over(new SockJS('/tsch'));
	ReactDOM.render(<ChatFull client={client} username={username} display={displayName} />, document.getElementById('react'));
}