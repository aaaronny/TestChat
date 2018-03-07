class UserMiniCard extends React.Component {
	
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}
	
	send(event) {
        this.props.send(prompt('Cosa vuoi dire in privato a ' + this.props.username + '?', '...'), "/app/chat" + this.props.username);
        event.preventDefault();
    }

	render() {
		return (
				<p className="userCard" onClick={this.send}><img src={this.props.img} />
				{ this.props.display }
				</p>
		);
	}
}