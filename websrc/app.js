import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { AppBar, IconButton, NavigationClose } from 'material-ui';

import { IndexRoute, Route } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import RootQueries from './queries/RootQueries';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

Relay.injectNetworkLayer(
	new Relay.DefaultNetworkLayer('/api/graphql')
);

class Root extends React.Component {
	render() {
		return (
			<div>
				<AppBar title="Title"
					iconClassNameRight="muidocs-icon-navigation-expand-more" />
				<IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub"/>
			</div>
		);
	}
}

ReactDOM.render(
	<RelayRouter history={createBrowserHistory()}>
		<Route path='/' component={Root}>

		</Route>
	</RelayRouter>,
	document.getElementById('root')
);
