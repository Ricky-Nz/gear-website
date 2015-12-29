import React from 'react';
import Relay from 'relay';
import { Glyphicon, Label, Panel } from 'react-bootstrap';

class ReportDetail extends React.Component {
	render() {
		const report = this.props.report;
		const tagViews = report.tags.map((tag, index) =>
			<Label key={index}>{tag.name}</Label>);

		return (
			<Panel>
				<p>Platform: {report.platform}</p>
				<p>Platform Version: {report.platformVersion}</p>
				<p>Duration: {report.startDate} ~ {report.endDate}</p>
				<p>Package Name: {report.packageName}</p>
				<p>Package Description: {report.packageDescription}</p>
				<p>Package Path: <a href={report.packagePath}>download</a></p>
				<p>Package Date: {report.packageDate}</p>
				<p>Tags: {tagViews}</p>
			</Panel>
		);
	}
}

export default Relay.createContainer(ReportDetail, {
	fragments: {
		report: () => Relay.QL`
			fragment on Report {
				startDate
				endDate
				platform
				platformVersion
				packageName
				packageDate
				packageDescription
				packagePath
				tags
			}
		`
	}
});