import React from 'react';
import Relay from 'relay';
import { ListGroupItem } from 'react-bootstrap';

class ScriptItem extends React.Component {
	render() {
		const { script, ...restProps } = this.props;
		return (
			<ListGroupItem {...restProps}>
				<div>
					<p>{script.title}</p>
					<p>{`${script.tags}`}</p>
					<p>{`${script.date}`}</p>
				<div>
			</ListGroupItem>
		);
	}
}

export default Relay.createContainer(ScriptItem, {
	fragments: {
		script: () => Relay.QL`
			fragment on Script {
				id
				title
				tags
				date
			}
		`
	}
});