import React from 'react';
import Relay from 'relay';
import { ListGroup } from 'react-bootstrap';
import ReportItem from './ReportItem';
import ListSearchHeader from './ListSearchHeader';
import ListLoadMoreFooter from './ListLoadMoreFooter';

class ReportList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	render() {
		const { edges, pageInfo } = this.props.user.reports;
		const listItems = edges&&edges.map(({ node }, index) =>
			<ReportItem key={index} report={node}/>);

		return (
			<ListGroup>
				<ListSearchHeader placeholder='search report'
					onSearch={text => this.setVariables({search}, this.onReadyStateChange.bind(this))}/>
				{listItems}
				<ListLoadMoreFooter pageInfo={pageInfo} loading={this.state.loading}
					onLoadMore={cursor => this.props.relay.setVariables({cursor}, this.onReadyStateChange.bind(this))}/>
			</ListGroup>
		);
	}
	onReadyStateChange(event) {
		console.log(event);
	}
}

export default Relay.createContainer(ReportList, {
	initialVariables: {
		cursor: null,
		search: null
	},
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				reports(first: 10, after: $cursor, search: $search) {
					edges {
						node {
							${ReportItem.getFragment('report')}
						}
					}
					pageInfo {
						${ListLoadMoreFooter.getFragment('pageInfo')}
					}
				}
			}
		`
	}
});

