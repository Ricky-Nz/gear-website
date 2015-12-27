import React from 'react';
import Relay from 'relay';
import { Panel, Input } from 'react-bootstrap';
import LabelSelectList from './LabelSelectList';

class ScriptDetailEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.onPropChanged(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.script !== this.props.script) {
			this.setState(onPropChanged(nextProps));
		}
	}
	render() {
		return (
			<Panel>
				<Input type='text' placeholder='script title' label='Title'
					value={this.state.title} onChange={event => this.setState({title: e.target.value})}/>
				<LabelSelectList script={this.props.script}/>
			</Panel>
		);
	}
	onPropChanged({script}) {
		return {
			title: script&&script.title||''
		};
	}
}

export default Relay.createContainer(ScriptDetailEditor, {
	fragments: {
		script: () => Relay.QL`
			fragment on Script {
				id
				title
				${LabelSelectList.getFragment('script')}
			}
		`,
		user: () => Relay.QL`
			fragment on User {
				${LabelSelectList.getFragment('user')}	
			}
		`
	}
});