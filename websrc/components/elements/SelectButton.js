import React, { PropTypes } from 'react';
import Relay from 'relay';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class SelectButton extends React.Component {
	render() {
		const { select, options, ...restProps } = this.props;
		const menuItems = options.map((option, index) =>
			<MenuItem key={index} eventKey={option}>{option}</MenuItem>);

		return (
			<DropdownButton id='dropdown' bsSize='small' title={select}
				onSelect={(e, eventKey) => this.props.onSelect(eventKey)} {...restProps}>
				{menuItems}
			</DropdownButton>
		);
	}
}

SelectButton.propTypes = {
	select: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelect: PropTypes.func.isRequired
};

export default SelectButton;