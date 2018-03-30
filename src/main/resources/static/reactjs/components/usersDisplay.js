class UsersDisplay extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div className="row">
				
				<div className="col-12 no-gutters usersDisplay ">
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
		);
	}
}



