import React from 'react';
import Detail from './components/Detail';
import Button from 'react-bootstrap/Button';
import List from './components/List';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { show: 'list', userid: null, cid: null };
		this.homeClicked = this.homeClicked.bind(this);
	}

	renderDetail = (userid, cid) => {
		this.setState({ show: 'detail', userid: userid, cid: cid });
	}

	homeClicked = (e) => {
		this.setState({show: 'list'})
	}

	isShow = (s) => {
		return this.state['show'] === s;
	}

	render() {
		console.log('Rendering app');
		return (
			<>
				{
					this.isShow('list') ?
						<List userid='vahsekjar' onclick={this.renderDetail} /> :
						null
				}
				{
					this.isShow('detail') ?
						<div id="detail">
							<Detail key={this.state['cid']} userid={this.state['userid']} cid={this.state['cid']} />
							<div className="d-grid gap-2 mt-3">
								<Button variant="primary" onClick={this.homeClicked}>Back</Button>
							</div>
						</div>:
						null
				}
			</>
		);
	}
}

export default App;
