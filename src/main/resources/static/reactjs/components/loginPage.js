class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}
	
	send(event) {
        this.props.login(this.user.value, this.pass.value);
        event.preventDefault();
    }
	
	render() {
		    return (
		    		<div className="container col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
		    		<div className="panel panel-default">
		    			<div className="panel-heading">
		    				<h1>Login Chat</h1>
		    			</div>
		    			<div className="panel-body">
		    				<div className="form-group">
		    					<div className="input-group">
		    						<span className="input-group-addon"> <i className="glyphicon glyphicon-user"></i>
		    						</span> <input ref={(input) => this.user = input} type="text" className="form-control" placeholder="Username" required="" />
		    					</div>
		    				</div>
		    				<div className="form-group">
		    					<div className="input-group">
		    						<span className="input-group-addon"> <i className="glyphicon glyphicon-lock"></i>
		    						</span> <input ref={(input) => this.pass = input} type="password" className="form-control" placeholder="Password" required="" />
		    					</div>
		    				</div>
		    				<button onClick={this.send} id="btnLoginr" className="btn btn-default btnLogin"> LOGIN<i className="glyphicon glyphicon-log-in"></i>
		    				</button>
		    				</div>
		    				</div>
		    			</div>
		    );
	}
}

