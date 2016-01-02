import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLSchema
} from 'graphql';

import {
	GraphQLUser,
	GraphQLAppVersion
} from './models';

import {
	createParameterMutation,
	updateParameterMutation,
	removeParameterMutation,
	createScriptMutation,
	updateScriptMutation,
	removeScriptMutation,
	createReportMutation,
	removeReportMutation
} from './mutations';

import fs from 'fs-extra';
import path from 'path';
import { getUser } from './database';

var GraphQLQuery = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		user: {
			type: GraphQLUser,
			description: 'application user',
			args: {
				username: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, {username, password}) =>
				getUser(username, password).then(user => user)
		},
		versions: {
			type: new GraphQLList(GraphQLAppVersion),
			resolve: (root) => {
				var versionFiles = fs.readdirSync(path.join(__dirname, 'versions'));
				versionFiles = versionFiles.reverse();
				return versionFiles.map(version => ({
					version: version,
					download: `/versions/${version}`
				}));
			}
		}
	})
});

var GraphQLMutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		createScript: createScriptMutation,
		updateScript: updateScriptMutation,
		removeScript: removeScriptMutation,
		createParameter: createParameterMutation,
		updateParameter: updateParameterMutation,
		removeParameter: removeParameterMutation,
		createReport: createReportMutation,
		removeReport: removeReportMutation,
	})
});

export const schema = new GraphQLSchema({
	query: GraphQLQuery,
	mutation: GraphQLMutation
});

