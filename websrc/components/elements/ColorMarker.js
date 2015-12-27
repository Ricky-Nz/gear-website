import React, { PropTypes } from 'react';

let ColorMarker = props => {
	const markStyle = {
		heigth: 30,
		width: 30,
		backgroundColor: props.color,
		borderRadius: 5
	};
	return (
		<div style={markStyle}/>
	);
};

ColorMarker.propTypes = {
	color: PropTypes.string.isRequired
};

export default ColorMarker;