import React, { PropTypes } from 'react';
import Relay from 'relay';
import { Accordion } from 'react-bootstrap';
import ReportItemScriptItem from './ReportItemScriptItem';

class ReportItemScripts extends React.Component {
	render() {
		const scriptViews = this.props.report.scripts.map((script, index) =>
			<ReportItemScriptItem index={index} key={index} script={script}/>);

		return (
			<Accordion defaultExpanded={true}>
				{scriptViews}
			</Accordion>
		);
	}
}

export default Relay.createContainer(ReportItemScripts, {
	fragments: {
		report: () => Relay.QL`
			fragment on Report {
				scripts {
					${ReportItemScriptItem.getFragment('script')}
				}
			}
		`
	}
});