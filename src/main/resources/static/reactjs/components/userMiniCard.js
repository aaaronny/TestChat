class UserMiniCard extends React.Component {
	
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}
	
	send(event) {
		this.props.send(this.props.username);
        event.preventDefault();
    }

	render() {
		var img = (this.props.img == '') ? '/img/noimguser.png' : this.props.img;
		return (
				<p className="userCard" onClick={this.send}><img src={img} />
				{ this.props.display }
				</p>
		);
	}
}