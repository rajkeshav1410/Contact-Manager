import Row from './Row';
import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {contacts: []};
	}

	componentDidMount() {
		console.log('Loading all contacts')
		axios.post('http://localhost:5000/contact/listall', { userid: this.props.userid })
			.then((res) => { 
				console.log('Data received');
				this.setState({contacts: res.data})
			})
	}

	componentWillUnmount() {
	}

	render() {
		const { contacts } = this.state;
		return (
			<Card id="list" style={{ width: '350px' }}>
				<ListGroup>
					{
						contacts.map((contact) => {
							return (
								<ListGroup.Item>
									<Row key={contact.cid}
										name={contact.name.firstName + " " + contact.name.lastName}
										userid={this.props.userid}
										cid={contact.cid}
										onclick={this.props.onclick} />
								</ListGroup.Item>
							)
						})
					}
				</ListGroup>
			</Card>
		)
	}
}

export default List;