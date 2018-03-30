class ChatConsole extends React.Component {
			
		constructor(props) {
			super(props);
		    this.send = this.send.bind(this);
		}
		
		send(event) {
	        this.props.send(this.message.value, "/app/chat");
	        this.message.value = '';
	        event.preventDefault();
	    }

		render() {
			return (
					<div className="console row bg-dark">
					<div className="col-12">
					<form onSubmit={this.send}>
						<div>
							<input placeholder="Cosa vuoi scrivere?" type="text" ref={(input) => this.message = input} />
						</div>
					</form>
					</div>
					</div>
			);
		}
}