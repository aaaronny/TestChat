class ChatFull extends React.Component {
	
	constructor(props) {
		super(props);
		
		//	BINDING METHODS
		this.onError = this.onError.bind(this);
		this.onConnected = this.onConnected.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.onPvtMessageReceived = this.onPvtMessageReceived.bind(this);
		this.onMessageReceived = this.onMessageReceived.bind(this);
		this.loadOldMsg = this.loadOldMsg.bind(this);
		this.loadOnlineUsers = this.loadOnlineUsers.bind(this);
		
		console.log('logged user >>> ' + this.props.username);
		console.log('display name >>> ' + this.props.display);
		this.state = { messages: [] , users: [], noFirstAccess: true};
		this.connect();
	}
	
	connect(){
		console.log('connect >>> try to connect...');
		this.props.client.connect({}, this.onConnected, this.onError);		
	}

	onConnected() {
		console.log('onConnected >>> start');
		this.props.client.subscribe('/topic/' + this.props.username, this.onPvtMessageReceived);
		this.props.client.subscribe('/topic/public', this.onMessageReceived);
		
		this.ajaxLoad('/oldMsg', this.loadOldMsg);
		
		var chatMessage = {
				sender : this.props.username,
				displayName : this.props.display,
				content : profileImg,
				typeMessage : 'LOGIN',
				date: ''
			};
		this.props.client.send("/app/users", {}, JSON.stringify(chatMessage));
	}

	onError() {
		console.log('onError >>> start');
		if(this.state.noFirstAccess){
			if (confirm('Errore di connessione, vuoi provare a riconnetterti?')) {
				this.connect();
			}
		} else {
			this.setState({ noFirstAccess : true });
		}
	}

	onMessageReceived(payload) {
		console.log('onMessageReceived >>> start');
		const mss = JSON.parse(payload.body);
			if (mss.typeMessage == 'CHAT'){
				let mex = {
						display: mss.displayName,
						content: mss.content,
						date: mss.date,
						isMy: (this.props.username == mss.sender) ? 'sended' : 'received'
				}
				const messages = this.state.messages;
				messages.push(mex);
				this.setState({ messages });
		} else {
			this.ajaxLoad('/onlineUsers', this.loadOnlineUsers);
		}
	}
	
	onPvtMessageReceived(payload) {
		const mss = JSON.parse(payload.body);
		alert("From: " + mss.displayName + "\n\n" + mss.content);
	}
	
	sendMessage(message, channel) {
		console.log('send message >>> ' + message);
		if (this.props.client && message != '') {
			let chatMessage = {
				sender : this.props.username,
				displayName : this.props.display,
				content : message,
				typeMessage: 'CHAT',
				date: ''
			};

			this.props.client.send(channel, {}, JSON.stringify(chatMessage));
		}
	}
	
	ajaxLoad(url, callback){
		console.log('REST CALL TO >>> ' + url);
		$.ajax({
			async : false,
			type : "GET",
			url : url,
			contentType : 'application/json',
			statusCode : {
				200 : callback
			}
		});
	}
	
	loadOnlineUsers(mss) {
		const users = [];
		console.log('online n. >>> ' + mss.length);
		for (var i=0; i<mss.length; ++i){
			var img = (mss[i].imgUrl == '') ? '/img/noimguser.png' : mss[i].imgUrl;
			users.push({
				username: mss[i].username,
				display: mss[i].displayName,
				img: img
			});
		}
		this.setState({ users });
	}
	
	loadOldMsg(res){
		let mexs = JSON.parse(res);
		const messages = this.state.messages;
		for (var i=0; i<mexs.length; ++i)
			messages.push({
				display: mexs[i].displayName,
				content: mexs[i].content,
				date: mexs[i].date,
				isMy: (this.props.username == mexs[i].sender) ? 'sended' : 'received'
			})
		this.setState({ messages });
	}

	render() {
		return (
				<div className="chat container-fluid">
				<div className="row no-gutters">
				
				<UsersDisplay users={this.state.users} send={this.sendMessage} />
			    
			    <div className="col-md-10 col-12">    
			    <div className="container-fluid">
			    
				<div className="row bg-dark roomBar">
	            	<div className="col-12 ">MY USER</div>
	            </div>
				
				<ChatDisplay messages={this.state.messages} />
				<ChatConsole send={this.sendMessage} />
				
				</div>
				</div>
				
				</div>
				</div>
				);
	}
}
