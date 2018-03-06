class ChatMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div className={this.props.isMy}><div className="message">
				<p className="sender">{this.props.display}</p><p className="textBody">{this.props.content}</p>
				<p className="time">{this.props.date}</p></div></div>
		);
	}
}

class ChatDisplay extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div className="display">
				{ this.props.messages.map(mex =>
					(
						<ChatMessage
						display={mex.display}
						content={mex.content}
						date={mex.date}
						isMy={mex.isMy} 
						key={mex.date} />
					)
			    ) }
				</div>
				);
	}
}

class ChatFull extends React.Component {
	
	constructor(props) {
		super(props);
		alert(this.props.username);
		this.state = { messages: [] };
		this.onConnected = this.onConnected.bind(this);
		this.props.client.connect({}, this.onConnected, alert('Connecting...'));
		}

		onConnected() {
		this.onMessageReceived = this.onMessageReceived.bind(this);
		this.props.client.subscribe('/topic/public', this.onMessageReceived);
		}

		onMessageReceived(payload) {
		const mss = JSON.parse(payload.body);
		let mex = {
				display: mss.displayName,
				content: mss.content,
				date: mss.date,
				isMy: (this.props.username == mss.sender) ? 'sended' : 'received'
		}
		const messages = this.state.messages;
		messages.push(mex);
		this.setState({ messages });
	}

	render() {
		return (
				<div className="chat">
				<ChatDisplay messages={this.state.messages} client={client} />
				</div>
				);
	}
}


