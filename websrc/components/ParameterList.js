import React from 'react';
import Relay from 'relay';
import { ListGroup } from 'react-bootstrap';
import ParameterItem from './ParameterItem';
import ListSearchHeader from './ListSearchHeader';
import ListLoadMoreFooter from './ListLoadMoreFooter';

class ParameterList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	render() {
		const { edges, pageInfo } = this.props.user.parameters;
		const listItems = edges&&edges.map(({ node }, index) =>
			<ParameterItem key={index} parameter={node}/>);

		return (
			<ListGroup>
				<ListSearchHeader placeholder='search parameter'
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

export default Relay.createContainer(ParameterList, {
	initialVariables: {
		cursor: null,
		search: null
	},
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				parameters(first: 10, after: $cursor, search: $search) {
					edges {
						node {
							${ParameterItem.getFragment('parameter')}
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

