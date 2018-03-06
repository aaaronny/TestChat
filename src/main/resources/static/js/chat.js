var client = null;
var username = null;
var displayName = null;
var profileImg = '';

function onSignInGoogle(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  username = profile.getEmail();
	  displayName = profile.getName();
	  profileImg = profile.getImageUrl();
	  setOnChatDiv();
	  connect();
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
				setOnChatDiv();
				connect();
			}
		}
	});

}

function setOnChatDiv(){
	$('#loginBox').css("display", "none");
	$('#chatBox').css("display", "inline-block");

	$(document).keypress(function(e) {
		if (e.which == 13)
			sendMessage();
	});
}

function connect() {
	loadOldMsg();
	var socket = new SockJS('/tsch');
	client = Stomp.over(socket);
	client.connect({}, onConnected, onError);
}

function onConnected() {
	client.subscribe('/topic/public', onMessageReceived);
	client.subscribe('/topic/' + username, onPvtMessageReceived);
	sendLogMessage();
}

function onError() {
	if (confirm('Errore di connessione, vuoi provare a riconnetterti?')) {
		connect();
	}
}

function sendLogMessage(){
	var chatMessage = {
		sender : username,
		displayName : displayName,
		content : profileImg,
		typeMessage : 'LOGIN',
		date: ''
	};
	client.send("/app/users", {}, JSON.stringify(chatMessage));
}

function sendMessage(event) {
	if (client && $('#message').val() != '') {
		var chatMessage = {
			sender : username,
			displayName : displayName,
			content : $('#message').val(),
			typeMessage: 'CHAT',
			date: ''
		};

		client.send("/app/chat", {}, JSON.stringify(chatMessage));
		$('#message').val('');
	}
}

function sendPvtMessage(li) {
	var chatMessage = {
		sender : username,
		displayName : displayName,
		content : prompt('Cosa vuoi dire in privato a ' + li.getAttribute("title") + '?', '...'),
		typeMessage : 'CHAT',
		date : ''
	};

	client.send("/app/chat/" + li.getAttribute("title"), {}, JSON
			.stringify(chatMessage));
}

function onMessageReceived(payload) {
	var mss = JSON.parse(payload.body);
	echoMsg(mss);
	scrollEnd();
}

function onPvtMessageReceived(payload) {
	var mss = JSON.parse(payload.body);
	alert("PRIVATE MESSAGE >>> From: " + mss.sender + ": " + mss.content);
}

function echoMsg(mss) {
	var html = '';
	if ((mss.typeMessage != 'LOGIN') && (mss.typeMessage != 'LOGOUT')) {
		var isMy = '';
		var color = 'aliceblue';
		if (mss.sender == username) {
			isMy = ' style="text-align: right;"';
			color = 'greenyellow';
		}
		html += '<div' + isMy + '><div style="background-color: ' + color
				+ ';" class="message">';
		html += '<p class="sender">'
				+ ((mss.displayName == '') ? mss.sender : mss.displayName)
				+ '</p><p class="textBody">' + mss.content + '</p>';
		html += '<p class="time">' + mss.date + '</p></div></div>';
		$('#display').append(html);
	} else {
		usersListManager(mss);
	}
}

function scrollEnd(){
	var scr = $('#display')[0].scrollHeight;
	$('#display').animate({
		scrollTop : scr
	}, 1000);
	$("#message").focus()
}

function loadOldMsg(){
	$.ajax({
		async : false,
		type : "GET",
		url : '/oldMsg',
		contentType : 'application/json',
		statusCode : {
			200 : function(res) {
					var mexs = JSON.parse(res);
					for (i=0; i<mexs.length; ++i)
						echoMsg(mexs[i]);
					scrollEnd();
				}
		}
	});
}

function usersListManager(){
	$.ajax({
		type : "GET",
		url : '/onlineUsers',
		contentType : 'application/json',
		statusCode : {
			200 : function(mss) {
				$('#usersList').html('');
					for (i=0; i<mss.length; ++i){
						var img = (mss[i].imgUrl == '') ? '/img/noimguser.png' : mss[i].imgUrl;
						$('#usersList').append('<p class="userCard" title="' + mss[i].username + '" onclick="sendPvtMessage(this)"><img src="' + img + '" />' + mss[i].displayName + '</p>');
					}
				}
		}
	});
}


$(function() {

});