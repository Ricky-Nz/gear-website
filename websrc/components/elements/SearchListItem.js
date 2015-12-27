import React, { PropTypes } from 'react';
import { ListGroupItem, Input } from 'react-bootstrap';

class SearchListItem extends React.Component {
	render() {
		const { searching, delay, onSearch, ...restProps } = this.props;

		return (
			<ListGroupItem {...restProps}>
				<Input ref='input' type='text' onInput={this.onTextChange.bind(this)}
					addonAfter={<Glyphicon glyph='align-left'/>} />
			</ListGroupItem>
		);
	}
	onTextChange() {
		if (this.state && this.state.timer) {
			clearTimeout(this.state.timer);
		}

		if (this.props.delay > 0) {
			this.setState({
				timer: setTimeout(() => {
					this.props.onSearch(this.refs.input.getValue());
				}, this.props.delay)
			});
		} else {
			this.props.onSearch(this.refs.input.getValue());
		}
	}
	getValue() {
		return this.refs.input.getValue();
	}
}

SearchListItem.propTypes = {
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onSearch: PropTypes.func.isRequired,
	searching: PropTypes.bool,
	delay: PropTypes.number
};

SearchListItem.defaultProps = {
	delay: 500,
	placeholder: 'search'
};

export default SearchListItem;

