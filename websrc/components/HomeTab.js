import React from 'react';
import Relay from 'react-relay';

class HomeTab extends React.Component {
	render() {
		return (
			<div>
				<br/>
				<br/>
				<br/>
				<br/>
				Home
			</div>
		);
	}
}

export default Relay.createContainer(HomeTab, {
	fragments: {
		versions: () => Relay.QL`
			fragment on AppVersion {
				version
				download
			}
		`
	}
});