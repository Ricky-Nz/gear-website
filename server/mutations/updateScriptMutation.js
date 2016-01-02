import { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { updateScript } from '../database';
import { GraphQLScript, GraphQLActionInput } from '../models';

export default mutationWithClientMutationId({
	name: 'UpdateScript',
	description: 'update test script',
	inputFields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'script id'
		},
		title: {
			type: GraphQLString,
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
		script: {
			type: GraphQLScript,
			resolve: (script) => script
		}
	},
	mutateAndGetPayload: ({id: globalId, ...fields}) => {
		const {type, id} = fromGlobalId(globalId);
		return updateScript({id, ...fields}).then(script => script);
	}
});

