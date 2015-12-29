import React from 'react';
import Relay from 'relay';
import { Row, Col } from 'react-bootstrap';
import ReportList from './ReportList';
import ReportItemBasic from './ReportItemBasic';
import ReportItemScripts from './ReportItemScripts';

class ReportTab extends React.Component {
	render() {
		return (
			<Row>
				<Col xs={12} sm={3} smOffset={1} md={2} mdOffset={2}>
					<ReportList report={this.props.user.reports}/>
				</Col>
				<Col xs={12} sm={7} md={6}>
					<ReportItemBasic report={this.props.user.report}/>
					<ReportItemScripts report={this.props.user.report}/>
				</Col>
			</Row>
		);
	}	
}

export default Relay.createContainer(ReportTab, {
	initialParameters: {
		select: null
	},
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				${ReportList.getFragment('user')}
				report @include(if: $select) {
					${ReportItemBasic.getFragment('report')}
					${ReportItemScripts.getFragment('report')}
				}
			}
		`
	}
});