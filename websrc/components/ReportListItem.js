import React from 'react';
import Relay from 'relay';
import { ListGroupItem } from 'react-bootstrap';

class ReportItem extends React.Component {
	render() {
		const { report, ...restProps } = this.props;
		return (
			<ListGroupItem {...restProps}>
				<div>
					<p>{report.startDate}</p>
					<p>{`${report.platform}-${report.platformVersion}`}</p>
					<p>{`${report.packageName}-${report.tags}`}</p>
				<div>
			</ListGroupItem>
		);
	}
}

export default Relay.createContainer(ReportItem, {
	fragments: {
		reprot: () => Relay.QL`
			fragment on Report {
				id
				startDate
				platform
				platformVersion
				packageName
				tags
			}
		`
	}
});