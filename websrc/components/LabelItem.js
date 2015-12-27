import React, { PropTypes } from 'react';
import Relay from 'relay';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import { ColorMarker } from './elements';

class LabelItem extends React.Component {
	render() {
		const label = this.props.label;
		const content = {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		};

		return (
			<ListGroupItem>
				<div style={content}>
					<Glyphicon glyph={this.props.select?'star':''}/>
					<ColorMarker color={label.color}/>
					{label.name}
				<div>
			</ListGroupItem>
		);
	}
}

LabelItem.propTypes = {
	select: PropTypes.bool.isRequired
};

export default Relay.createContainer(LabelItem, {
	fragments: {
		label: () => {
			fragment on Label {
				id
				name
				color
			}
		}
	}
});