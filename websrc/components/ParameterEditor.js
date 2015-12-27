import React from 'react';
import Relay from 'relay';
import { Panel, Input } from 'react-bootstrap';

class ParameterEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.onPropChanged(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.parameter !== this.props.parameter) {
			this.setState(onPropChanged(nextProps));
		}
	}
	render() {
		const buttonContent = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center'
		};

		return (
			<Panel>
				<Input label='Parameter Key' type='text' value={this.state.key}
					onChange={event => this.setState({key: event.target.value})}/>
				<Input label='Parameter Value' type='text' value={this.state.value}
					onChange={event => this.setState({value: event.target.value})}/>
				<div style={buttonContent}>
					{this.props.parameter&&<Button bsSize='small' style={{marginRight: 10}}
						bsStyle='danger' onClick={this.onDelete.bind(this)}>Delete</Button>}
					<Button bsSize='small' bsStyle='primary' onClick={this.onSubmit.bind(this)}>
						{this.props.parameter?'Update':'Create'}
					</Button>
				</div>
			</Panel>
		);
	}
	onPropChanged({parameter}) {
		return {
			key: parameter&&parameter.key||'',
			value: parameter&&parameter.value||''
		};
	}
	onDelete() {

	}
	onSubmit() {
		
	}
}

export default Relay.createContainer(ParameterEditor, {
	fragments: {
		parameter: () => Relay.QL`
			fragment on Parameter {
				id
				key
				value
			}
		`
	}
});