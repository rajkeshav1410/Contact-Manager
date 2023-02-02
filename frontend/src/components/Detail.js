import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import 'bootstrap/dist/css/bootstrap.min.css';


class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: {
				cid: 0,
				name: { firstName: '', lastName: '' },
				email: '',
				phone: [{number: '', label: ''}]
			}
		};
	}

	componentDidMount() {
		console.log('Loading single contacts', this.props.userid, this.props.cid)
		axios.post('http://localhost:5000/contact/findcid', { userid: this.props.userid, cid: this.props.cid })
			.then((res) => {
				this.setState({ contact: res.data })
			})
	}

	componentWillUnmount() {
	}

	render() {
		const { cid, name, phone, email } = this.state.contact;
		console.log('Detail', this.props.userid, this.props.cid)
		return (
			<Card style={{ width: '350px' }}>
				<Card.Img variant="top" src={`http://localhost:5000/${cid}.jpeg`} alt={`${name.firstName + ' ' + name.lastName}`} />
				<Card.Body>
					<Card.Title className="d-flex justify-content-center">{name.firstName + ' ' + name.lastName}</Card.Title>
					<ListGroup>
						<ListGroup.Item>Email : {email}</ListGroup.Item>
						{
							phone.map((phone) => {
								return <ListGroup.Item className="d-flex justify-content-between">
									Phone : {phone.number}
									<Badge pill bg="primary">
										{phone.label}
									</Badge>
								</ListGroup.Item>
							})
						}
					</ListGroup>
				</Card.Body>
			</Card>
		)
	}
}

export default Detail;