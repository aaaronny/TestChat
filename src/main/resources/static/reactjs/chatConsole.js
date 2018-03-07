class ChatConsole extends React.Component {
			
		constructor(props) {
			super(props);
			this.state = { value: 'cock'};
		}
		
		send= () => {
	        this.props.send(this.state.value);
	    }

		render() {
			return (
					<div className="console">
						<div>
							<input type="text" value={this.state.value}  onChange={null}/>
							<button onClick={this.send}>SEND</button>
						</div>
					</div>
			);
		}
}