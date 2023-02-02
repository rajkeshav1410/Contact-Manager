import React from 'react';

class Row extends React.Component {
	constructor(props) {
		super(props);
		this.state = { contact: {} };
		this.clicked = this.clicked.bind(this);
	}

	clicked = (e) => {
		console.log(this.props.userid, this.props.cid)
		this.props.onclick(this.props.userid, this.props.cid)
	}

	render() {
		return (
			<>
				<div class="row" onClick={this.clicked}>
					{this.props.name}
				</div>
			</>
		)
	}
};

export default Row;