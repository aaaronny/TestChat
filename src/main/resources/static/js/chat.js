var client = null;
var username = null;

function onSignInGoogle(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  username = profile.getName();
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
	alert('Errore di connessione!');
	if (confirm('Vuoi provare a riconnetterti?')) {
		connect();
	}
}

function sendLogMessage(){
	var t = new Date();
	var times = t.toUTCString().substring(5, t.toUTCString().length - 4);
	var chatMessage = {
		sender : username,
		content : $('#message').val(),
		date : times,
		typeMessage : 'LOGIN'
	};
	client.send("/app/chat", {}, JSON.stringify(chatMessage));
}

function sendMessage(event) {
	if (client && $('#message').val() != '') {
		var t = new Date();
		var times = t.toUTCString().substring(5, t.toUTCString().length - 4);
		var chatMessage = {
			sender : username,
			content : $('#message').val(),
			date : times,
			typeMessage: 'CHAT'
		};

		client.send("/app/chat", {}, JSON.stringify(chatMessage));
		$('#message').val('');
	}
}

function sendPvtMessage(event) {
	if (client && $('#message').val() != '') {
		var t = new Date();
		var times = t.toUTCString().substring(5, t.toUTCString().length - 4);
		var chatMessage = {
			sender : username,
			content : $('#message').val(),
			date : times,
			typeMessage: 'CHAT'
		};

		client.send("/app/chat/" + prompt('A chi?', 'lorenzo') , {}, JSON.stringify(chatMessage));
		$('#message').val('');
	}
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
	if (mss.typeMessage == 'LOGIN') {
		html += '<div style="text-align: center;" ><div style="background-color: '
				+ color + ';" class="loginMessage">';
		html += '<p class="sender">' + mss.sender + ' entra in chat! - ' + mss.date + '</p></div></div>';
	} else {
		var isMy = '';
		var color = 'aliceblue';
		if (mss.sender == username) {
			isMy = ' style="text-align: right;"';
			color = 'greenyellow';
		}
		html += '<div' + isMy + '><div style="background-color: ' + color
				+ ';" class="message">';
		html += '<p class="sender">' + mss.sender + '</p><p class="textBody">'
				+ mss.content + '</p>';
		html += '<p class="time">' + mss.date + '</p></div></div>';
	}
	$('#display').append(html);
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


$(function() {

});