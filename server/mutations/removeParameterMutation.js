import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { removeParameter } from '../database';
import { GraphQLParameter } from '../models';

export default mutationWithClientMutationId({
	name: 'RemoveParameter',
	description: 'remove script parameter',
	inputFields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'parameter id'
		}
	},
	outputFields: {
		deletedId: {
			type: GraphQLString,
			resolve: (deletedId) => deletedId
		}
	},
	mutateAndGetPayload: ({id: globalId}) => {
		const {type, id} = fromGlobalId(globalId);
		return removeParameter(id).then(param => globalId);
	}
});

