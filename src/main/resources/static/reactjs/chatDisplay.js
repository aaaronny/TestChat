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
