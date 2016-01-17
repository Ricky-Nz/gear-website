import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
// import { ScriptTab, ParameterTab, ReportTab,
// 	HomeTab, GuideTab } from './components';
import Dashboard from './components/Dashboard';
import HomeTab from './components/HomeTab';
import GuideTab from './components/GuideTab';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

Relay.injectNetworkLayer(
	new Relay.DefaultNetworkLayer('/api/graphql')
);

const versionsQuery = {
	versions: () => Relay.QL`
		query { versions }
	`
};

const userQuery = {
	app: () => Relay.QL`
		query { user }
	`
};

ReactDOM.render(
	<RelayRouter history={browserHistory}>
		<Route path='/' component={Dashboard}>
			<IndexRoute component={HomeTab} queries={versionsQuery}/>
			<Route path='guide' component={HomeTab} queries={versionsQuery}/>
		</Route>
	</RelayRouter>,
	document.getElementById('root')
);

			// <IndexRoute component={HomeTab} queries={versionsQuery}/>
			// <Route path='script' component={ScriptTab}
			// 	queries={userQuery} queryParams={['select']}/>
			// <Route path='parameter' component={ParameterTab}
			// 	queries={userQuery} queryParams={['select']}/>
			// <Route path='report' component={ReportTab}
			// 	queries={userQuery} queryParams={['select']}/>
