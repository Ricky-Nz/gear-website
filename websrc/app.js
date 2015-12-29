import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import ScriptTab from './components/ScriptTab';
import ParameterTab from './components/ScriptTab';
import ReportTab from './components/ScriptTab';
import HomeTab from './components/HomeTab';
import GuideTab from './components/GuideTab';

import { IndexRoute, Route } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import RootQueries from './queries/UserQueries';
import RootQueries from './queries/Queries';

Relay.injectNetworkLayer(
	new Relay.DefaultNetworkLayer('/api/graphql')
);

class Application extends React.Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(
	<RelayRouter history={createBrowserHistory()}>
		<Route path='/' component={Application}>
			<IndexRoute component={HomeTab} queries={}/>
			<Route path='script' component={ScriptTab}
				queries={RootQueries} queryParams={['select']}>
			<Route path='parameter' component={ParameterTab}
				queries={RootQueries} queryParams={['select']}>
			<Route path='report' component={ReportTab}
				queries={RootQueries} queryParams={['select']}>
		</Route>
	</RelayRouter>,
	document.getElementById('root')
);
