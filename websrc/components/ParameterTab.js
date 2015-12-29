import React from 'react';
import Relay from 'relay';
import { Row, Col } from 'react-bootstrap';
import ParameterList from './ParameterList';
import ParameterEditor from './ParameterEditor';

class ParameterTab extends React.Component {
	render() {
		return (
			<Row>
				<Col xs={12} sm={3} smOffset={1} md={2} mdOffset={2}>
					<ParameterList parameters={this.props.user.parameters}/>
				</Col>
				<Col xs={12} sm={7} md={6}>
					<ParameterEditor parameter={this.props.user.parameter}/>
				</Col>
			</Row>
		);
	}
}

export default Relay.createContainer(ParameterTab, {
	initialParameters: {
		select: null
	},
	faragments: {
		user: () => Relay.QL`
			faragment on User {
				${ParameterList.getFragment('user')}
				script @include(if: $select) {
					${ParameterEditor.getFragment('parameter')}
				}
			}
		`
	}
});