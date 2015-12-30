import { GraphQLID } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { removeScript } from '../database';
import { GraphQLScript } from '../models';

export default const removeScriptMutation = mutationWithClientMutationId({
	name: 'RemoveScript',
	description: 'delete test script',
	inputFields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'script id'
		}
	},
	outputFields: {
		deletedId: {
			type: GraphQLID,
			resolve: (deletedId) => deletedId
		}
	},
	mutateAndGetPayload: ({id: globalId}) => {
		const {type, id} = fromGlobalId(globalId);
		return removeScript(id).then(script => globalId);
	}
});

