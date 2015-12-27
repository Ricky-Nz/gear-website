import React from 'react';
import Relay from 'relay';
import { SearchListItem } from './elements';
import LabelItem from './LabelItem';

class LabelSelectList extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.onPropChanged(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.script !== this.props.script) {
			this.setState(this.onPropChanged(nextProps));
		}
	}
	onPropChanged({script}) {
		return {
			selectLables: script&&script.label||[]
		};
	}
	render() {
		const labelItems = this.props.labels.map((label, index) =>
			<LabelItem key={index} label={label}
				select={this.state.selectLables.indexOf(label.id) >= 0}>);
		
		return (
			<ListGroup>
				<SearchListItem placeholder='search labels' onSearch={}/>
				{labelItems}
			</ListGroup>
		);
	}
}

export default Relay.createContainer(LabelSelectList, {
	fragments: {
		labels: () => {
			fragment on User {
				labels
			}
		},
		script: () => {
			fragment on Script {
				labels
			}
		}
	}
});