class ChatFull extends React.Component {
	
	constructor(props) {
		super(props);
		console.log('logged user >>> ' + this.props.username);
		console.log('display name >>> ' + this.props.display);
		this.state = { messages: [] , noFirstAccess: true};
		this.connect();
	}
	
	connect(){
		console.log('connect >>> try to connect...');
		this.onError = this.onError.bind(this);
		this.onConnected = this.onConnected.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.props.client.connect({}, this.onConnected, this.onError);		
	}

	onConnected() {
		console.log('onConnected >>> start');
		this.onMessagePvtReceived = this.onPvtMessageReceived.bind(this);
		this.onMessageReceived = this.onMessageReceived.bind(this);
		this.props.client.subscribe('/topic/public', this.onMessageReceived);
		this.props.client.subscribe('/topic/' + this.props.username, onPvtMessageReceived);
		
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
		if(!this.state.noFirstAccess){
			if (confirm('Errore di connessione, vuoi provare a riconnetterti?')) {
				this.connect();
			}
		} else {
			this.setState({ noFirstAccess : true });
			alert(this.state.noFirstAccess);
		}
	}

	onMessageReceived(payload) {
		console.log('onMessageReceived >>> start');
		const mss = JSON.parse(payload.body);
		let mex = {
				display: mss.displayName,
				content: (mss.typeMessage == 'LOGIN') ? 'Sono entrato in chat!' : mss.content,
				date: mss.date,
				isMy: (this.props.username == mss.sender) ? 'sended' : 'received'
		}
		const messages = this.state.messages;
		messages.push(mex);
		this.setState({ messages });
	}
	
	onPvtMessageReceived(payload) {
		const mss = JSON.parse(payload.body);
		alert("PRIVATE MESSAGE >>> From: " + mss.sender + ": " + mss.content);
	}
	
	sendMessage(message) {
		console.log('send message >>> ' + message);
		if (this.props.client && message != '') {
			let chatMessage = {
				sender : this.props.username,
				displayName : this.props.display,
				content : message,
				typeMessage: 'CHAT',
				date: ''
			};

			this.props.client.send("/app/chat", {}, JSON.stringify(chatMessage));
		}
	}

	render() {
		return (
				<div className="chat">
				<ChatDisplay messages={this.state.messages} client={client} />
				<ChatConsole send={this.sendMessage} />
				</div>
				);
	}
}
