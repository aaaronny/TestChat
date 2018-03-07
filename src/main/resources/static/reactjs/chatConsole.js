class ChatConsole extends React.Component {
			
		constructor(props) {
			super(props);
		    this.send = this.send.bind(this);
		}
		
		send(event) {
	        this.props.send(this.message.value);
	        event.preventDefault();
	    }

		render() {
			return (
					<div className="console">
					<form onSubmit={this.send}>
						<div>
							<input defaultValue="Scrivi..." type="text" ref={(input) => this.message = input} />
						</div>
					</form>
					</div>
			);
		}
}