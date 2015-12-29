import React, { PropTypes } from 'react';
import Relay from 'relay';
import { Panel, Label } from 'react-bootstrap';

class ReportItemScriptItem extends React.Component {
	render() {
		const { script, index } = this.props;
		const actionViews = script.actions.map((action, index) =>
			<p>
				<Label bsStyle='info'>{index}</Label>
				&nbsp;&nbsp;{action}
			</p>);

		return (
			<Panel header={script.title} eventKey={index}>
				{actionViews}
			</Panel>
		);
	}
}

ReportItemScriptItem.propTypes = {
	index: PropTypes.number.isRequired
};

export default Relay.createContainer(ReportItemScriptItem, {
	fragments: {
		script: () => Relay.QL`
			fragment on RecordScript {
				title
				actions
			}
		`
	}
});