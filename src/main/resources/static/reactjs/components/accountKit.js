class AccountKit extends React.Component {
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
	}
	
	componentDidMount() {
	}
	
	send() {
		let ak = '<form id="akForm" method="get" action="https://www.accountkit.com/v1.0/basic/dialog/sms_login/">';
			ak += '<input type="hidden" name="app_id" value="1022508357842402">';
			ak += '<input type="hidden" name="redirect" value="https://aaar-testchat.herokuapp.com/requestToken">';
			ak += '<input type="hidden" name="state" value="91f463eee4e0c53a95bbca05f876374b">';
			ak += '<input type="hidden" name="fbAppEventsEnabled" value=true>';
			ak += '</form>';
	    $('#akFormDiv').html(ak);
	    $('#akForm').submit();
	}
	
	render() {
		    return (
		    		<div>
		    		<button onClick={this.send} className="btn btn-success btnLogin">Login Mobile</button>
		    		<div id="akFormDiv"></div>
		    		</div>
		    	);
	}
}

