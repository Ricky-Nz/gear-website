import React from 'react';
import Relay from 'relay';
import { ListGroup } from 'react-bootstrap';
import ScriptItem from './ScriptItem';
import ListSearchHeader from './ListSearchHeader';
import ListLoadMoreFooter from './ListLoadMoreFooter';

class ScriptList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}
	render() {
		const { edges, pageInfo } = this.props.user.scripts;
		const listItems = edges&&edges.map(({ node }, index) =>
			<ScriptItem key={index} script={node}/>);

		return (
			<ListGroup>
				<ListSearchHeader placeholder='search script'
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

export default Relay.createContainer(ScriptList, {
	initialVariables: {
		cursor: null,
		search: null
	},
	fragments: {
		user: () => Relay.QL`
			fragment on User {
				scripts(first: 10, after: $cursor, search: $search) {
					edges {
						node {
							${ScriptItem.getFragment('script')}
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

