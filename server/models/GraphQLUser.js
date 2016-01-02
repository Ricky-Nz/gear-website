import { GraphQLObjectType, GraphQLNonNull, GraphQLString,
	GraphQLID, GraphQLList } from 'graphql';
import { globalIdField, fromGlobalId, connectionArgs, connectionFromArray } from 'graphql-relay';
import { ScriptsConnection, ParametersConnection, ReportsConnection } from './connections';
import { findScripts, findLabels } from '../database';
import GraphQLScript from './GraphQLScript';
import GraphQLParameter from './GraphQLParameter';
import GraphQLReport from './GraphQLReport';
import GraphQLLabel from './GraphQLLabel';
import GraphQLActionType from './GraphQLActionType';
import GraphQLActionFindType from './GraphQLActionFindType';
import path from 'path';
import fs from 'fs-extra';

export default new GraphQLObjectType({
	name: 'User',
	description: 'application user.',
	fields: () => ({
		id: globalIdField('User', user => user._id),
		scripts: {
			type: ScriptsConnection,
			description: 'user script connection.',
			args: {
				search: {
					type: GraphQLString,
					description: 'search script title'
				},
				...connectionArgs
			},
			resolve: (user, {search, ...args}) =>
				findScripts(user._id, search).then(scripts => connectionFromArray(scripts, args))
		},
		parameters: {
			type: ParametersConnection,
			description: 'user parameter connection.',
			args: {
				search: {
					type: GraphQLString,
					description: 'search parameter key or value.'
				},
				...connectionArgs
			},
			resolve: (user, {search, ...args}) =>
				findParameters(user._id, search).then(parameters => connectionFromArray(parameters, args))
		},
		reports: {
			type: ReportsConnection,
			description: 'user report connection.',
			args: {
				search: {
					type: GraphQLString,
					description: 'search report date or title'
				},
				...connectionArgs
			},
			resolve: (user, {search, ...args}) =>
				findReports(user._id, search).then(reports => connectionFromArray(reports, args))
		},
		labels: {
			type: new GraphQLList(GraphQLLabel),
			args: {
				search: {
					type: GraphQLString,
					description: 'search label by name.'
				}
			},
			resolve: (user, {search}) =>
				findLabels(user._id, search).then(labels => labels)
		},
		actionTypes: {
			type: new GraphQLList(GraphQLActionType),
			resolve: (user) => fs.readJsonSync(path.join(__dirname, 'actionTypes'))
		},
		findTypes: {
			type: new GraphQLList(GraphQLActionFindType),
			resolve: (user) => fs.readJsonSync(path.join(__dirname, 'findTypes'))
		},
		script: {
			type: GraphQLScript,
			description: 'retrieve single script.',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'script id'
				}
			},
			resolve: (user, {id: globalId}) => {
				const { type, id } = fromGlobalId(globalId);
				return findScript(id).then(script => script);
			}
		},
		parameter: {
			type: GraphQLParameter,
			description: 'retrieve single parameter.',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'parameter id'
				}
			},
			resolve: (user, {id: globalId}) => {
				const { type, id } = fromGlobalId(globalId);
				return findParameter(id).then(parameter => parameter);
			}
		},
		report: {
			type: GraphQLReport,
			description: 'retrieve single report.',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'report id'
				}
			},
			resolve: (user, {id: globalId}) => {
				const { type, id } = fromGlobalId(globalId);
				return findParameter(id).then(report => report);
			}
		}
	})
});

