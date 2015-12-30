import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, cursorForObjectInConnection } from 'graphql-relay';
import { getUserById, createScript, findScripts } from '../database';
import { GraphQLScript, GraphQLScriptEdge, GraphQLActionInput } from '../models';
import _ from 'underscore';

export default const createScriptMutation = mutationWithClientMutationId({
	name: 'CreateScript',
	description: 'create automation test script',
	inputFields: {
		userId: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'user id'
		},
		title: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'script title'
		},
		labels: {
			type: new GraphQLList(GraphQLID),
			description: 'label ids'
		},
		actions: {
			type: new GraphQLList(GraphQLActionInput),
			description: 'script actions'
		}
	},
	outputFields: {
		scriptEdge: {
			type: GraphQLScriptEdge,
			resolve: ({userId, scriptId}) =>
				findScripts(userId).then(scripts => {
					const newItem = _.find(scripts, script =>
						script._id.toString() === scriptId.toString());
					return {
						cursor: cursorForObjectInConnection(scripts, newItem),
						node: newItem
					};
				})
		}
	},
	mutateAndGetPayload: ({userId, ...fields}) => {
		const {type, id} = fromGlobalId(userId);
		return getUserById(id).then(user =>
			createScript({userId: id, ...fields}).then(script => ({userId: id, scriptId: script._id})));
	}
});

