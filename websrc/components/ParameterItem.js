import React from 'react';
import Relay from 'relay';
import { ListGroupItem } from 'react-bootstrap';

class ParameterItem extends React.Component {
	render() {
		const { parameter, ...restProps } = this.props;
		return (
			<ListGroupItem {...restProps}>
				<div>
					<p>{parameter.key}</p>
					<p>{parameter.value}</p>
				<div>
			</ListGroupItem>
		);
	}
}

export default Relay.createContainer(ParameterItem, {
	fragments: {
		parameter: () => Relay.QL`
			fragment on Parameter {
				id
				key
				value
			}
		`
	}
});