import React from 'react';
import Relay from 'relay';
import { Panel } from 'react-bootstrap';
import ScriptActionItem from './ScriptActionItem';

class ScriptActionList extends React.Component {
	render() {
		const actionItems = this.props.script.actions.map((action, index) =>
			<ScriptActionItem key={index} action={action} index={index}
				onInsert={this.onInsertItem.bind(this)} onDelete={this.onDeleteItem.bind(this)}/>);

		return (
			<Panel>
				{actionItems}
			</Panel>
		);
	}
	onInsertItem() {

	}
	onDeleteItem() {

	}
}

export default Relay.createContainer(ScriptActionList, {
	fragments: {
		script: () => Relay.QL`
			fragment on Script {
				actions {
					${ScriptActionItem.getFragment('action')}
				}
			}
		`
	}
});