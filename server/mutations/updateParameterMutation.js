import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { updateParameter } from '../database';
import { GraphQLParameter } from '../models';

export default mutationWithClientMutationId({
	name: 'UpdateParameter',
	description: 'update script parameter value',
	inputFields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'parameter id'
		},
		value: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'parameter value'
		}
	},
	outputFields: {
		parameter: {
			type: GraphQLParameter,
			resolve: (param) => param
		}
	},
	mutateAndGetPayload: ({id: globalId, value}) => {
		const {type, id} = fromGlobalId(globalId);
		return updateParameter({id, value}).then(param => param);
	}
});

