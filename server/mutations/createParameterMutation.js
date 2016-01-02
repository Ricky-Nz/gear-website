import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, cursorForObjectInConnection } from 'graphql-relay';
import { getUserById, createParameter, findParameters } from '../database';
import { GraphQLParameter, GraphQLParameterEdge } from '../models';
import _ from 'underscore';

export default mutationWithClientMutationId({
	name: 'CreateParameter',
	inputFields: {
		userId: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'user id'
		},
		key: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'parameter key'
		},
		value: {
			type: GraphQLString,
			description: 'parameter value'
		}
	},
	outputFields: {
		parameterEdge: {
			type: GraphQLParameterEdge,
			resolve: ({userId, paramId}) =>
				findParameters(userId).then(parameters => {
					const newItem = _.find(parameters, param =>
						param._id.toString() === paramId.toString());
					return {
						cursor: cursorForObjectInConnection(parameters, newItem),
						node: newItem
					};
				})
		}
	},
	mutateAndGetPayload: ({userId, key, value}) => {
		const {type, id} = fromGlobalId(userId);
		return getUserById(id).then(user =>
			createParameter({userId: id, key, value}).then(param => ({userId: id, paramId: param._id})));
	}
});

