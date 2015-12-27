import React, { PropTypes } from 'react';
import Relay from 'relay';
import { Input, Label, ButtonGroup, Button } from 'react-bootstrap';
import { SelectButton } from './SelectButton';

class ScriptActionItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.onPropChange(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.action !== this.props.action) {
			this.setState(this.onPropChange(nextProps));
		}
	}
	onPropChange({action}) {
		return {
			actionType: action&&action.type||'',
			actionArgs: action&&action.args||'',
			findType: action&&action.findType||'',
			findArgs: action&&action.findArgs||''
		};
	}
	render() {
		const { actionTypes, findTypes } = this.props.user;
		const actionItems = actionTypes.map(actionType => actionType.name);
		const findItems = findTypes.map(findType => findType.name);
		const currentActionType = actionTypes[actionTypes.indexOf(this.state.actionType)];
		const currentFindType = findTypes[findTypes.indexOf(this.state.findType)]

		const topbarStyle = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		};

		return (
			<div>
				<div style={topbarStyle}>
					<Label bsStyle='info'>{this.props.index}</Label>
					<ButtonGroup>
						<Button onClick={() => this.props.onInsert(this.props.index)}>Insert</Button>
						<Button onClick={() => this.props.onDelete(this.props.index)} bsStyle='danger'>Delete</Button>
					</ButtonGroup>
				</div>
				<Input ref='action' value={this.state.actionArgs}
					onChange={e => this.setState({actionArgs: e.target.value})}
					disabled={!currentActionType||!currentActionType.needArgs}
					addonBefore={<SelectButton select={this.state.actionType}
						actions={actionItems}/> onSelect={newType => this.setState({actionType: newType})}}/>
				{currentActionType&&currentActionType.needTarget&&
					<Input ref='find' value={this.state.findArgs}
						onChange={e => this.setState({findArgs: e.target.value})}
						disabled={!currentFindType||!currentFindType.needArgs}
						addonBefore={<SelectButton select={this.state.findType}
							actions={findItems}/> onSelect={newType => this.setState({findType: newType})}}/>}
			</div>
		);
	}
	getAction() {
		return Object.assign({}, this.state);
	}
}

ScriptActionItem.propTypes = {
	index: PropTypes.number.isRequired,
	onInsert: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default Relay.createContainer(ScriptActionItem, {
	fragments: {
		action: () => Relay.QL`
			fragment on Action {
				type
				args
				findType
				findArgs
			}
		`,
		user: () => Relay.QL`
			fragment on User {
				actionTypes {
					name
					needTarget
					needArgs
				}
				findTypes {
					name
					needArgs
				}
			}
		`
	}
});