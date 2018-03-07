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