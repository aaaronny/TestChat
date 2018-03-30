class ChatDisplay extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidUpdate () {
		  var el = this.refs.display;
		  var $jel = $(el);
			$jel.animate({
				scrollTop : el.scrollHeight
			}, 1000);
	}

	render() {
		return (
				<div className="display row bg-light">
				<div className="col-12 messageContainer" ref="display">
					{ this.props.messages.map(mex =>
						(
								<ChatMessage
								display={mex.display}
								content={mex.content}
								date={mex.date}
								isMy={mex.isMy} 
								key={mex.date + Math.random()} />
						)
					) }
				</div>
				</div>
		);
	}
}
