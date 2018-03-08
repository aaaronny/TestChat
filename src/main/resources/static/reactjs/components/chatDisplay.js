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
		if (this.props.room == ''){
			return (
					<div className="display" ref="display">
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
			);
		} else {
			return (
					<div className="display" ref="display">
					<div>{this.props.room}</div>
					{ this.props.messages.map(mex =>
							(
								<ChatMessage
								display={''}
								content={mex.content}
								date={mex.date}
								isMy={mex.isMy} 
								key={mex.date + Math.random()} />
							)
						) }
					</div>
			);		
		}
	}
}
