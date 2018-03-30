class UsersDisplay extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div className="col-md-2 d-md-block d-none">
				
				<div className="usersDisplay container bg-success">
				<div className="row no-gutters">
				
				<div className="col-12 no-gutters">
				 { this.props.users.map(mex => (
						 <UserMiniCard
						 send={this.props.send} 
						 username={mex.username}
						 display={mex.display}
						 img={mex.img}
						 key={mex.username} />
				 		)
				 ) }
				</div>
				
				</div>
				</div>
				
				</div>
		);
	}
}



