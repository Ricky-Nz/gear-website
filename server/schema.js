import {
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema
} from 'graphql';

import {
	GraphQLUser
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
			resolve: (root, { username, password }) =>
				findUser(username, password).then(user => user)
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

