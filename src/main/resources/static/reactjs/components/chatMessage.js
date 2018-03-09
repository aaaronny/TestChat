class ChatMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let bubble = 'speech-bubble bubble-' + this.props.isMy;
		let mex = this.props.content;
		if (mex == '' || mex == null)
			mex = '...';
		return (
				<div className={this.props.isMy}><div className={bubble}>
				<p className="sender">{this.props.display}</p><p className="textBody">{mex}</p>
				<p className="time">{this.props.date}</p></div></div>
		);
	}
}