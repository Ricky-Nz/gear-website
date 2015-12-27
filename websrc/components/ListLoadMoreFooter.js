import React, { PropTypes } from 'react';
import Relay from 'relay';
import { ListGroupItem } from 'react-boostrap';

class ListLoadMoreFooter extends React.Component {
	render() {
		const { endCursor, hasNextPage } = this.props.pageInfo;
		if (hasNextPage) {
			return (
				<ListGroupItem disabled={this.props.loading}
					onClick={() => this.props.onLoadMore(endCursor)}>
					Load more..
				</ListGroupItem>
			);
		} else {
			return null;
		}
	}
}

LoadMoreListFooter.propTypes = {
	loading: PropTypes.bool.isRequired,
	onLoadMore: PropTypes.func.isRequired
};

export default Relay.createContainer(ListLoadMoreFooter, {
	fragments: {
		pageInfo: () => Relay.QL`
			fragment on PageInfo {
				endCursor
				hasNextPage
			}
		`
	}
});

