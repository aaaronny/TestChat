//	LOGIN WITH GOOGLE
function onSignInGoogle(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  username = profile.getEmail();
	  displayName = profile.getName();
	  profileImg = profile.getImageUrl();
	  setOnChatDiv();
	  connect();
	  ReactDOM.render(<ChatFull client={client} username={username} display={displayName} />, document.getElementById('react'));
}