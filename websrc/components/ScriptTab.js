import React from 'react';
import Relay from 'relay';
import { Row, Col } from 'react-bootstrap';
import ScriptList from './ScriptList';
import ScriptEditor from './ScriptEditor';

class ScriptTab extends React.Component {
	render() {
		return (
			<Row>
				<Col xs={12} sm={3} smOffset={1} md={2} mdOffset={2}>
					<ScriptList scripts={this.props.user.scripts}/>
				</Col>
				<Col xs={12} sm={7} md={6}>
					<ScriptEditor script={this.props.user.script}/>
				</Col>
			</Row>
		);
	}
}

export default Relay.createContainer(ScriptTab, {
	initialParameters: {
		select: null
	},
	faragments: {
		user: () => Relay.QL`
			faragment on User {
				${ScriptList.getFragment('user')}
				script @include(if: $select) {
					${ScriptEditor.getFragment('script')}
				}
			}
		`
	}
});