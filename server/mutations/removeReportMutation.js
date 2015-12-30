import { GraphQLID } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { removeReport } from '../database';
import { GraphQLReport } from '../models';

export default const removeReportMutation = mutationWithClientMutationId({
	name: 'RemoveReport',
	description: 'remove test report',
	inputFields: {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'report id'
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
		return removeReport(id).then(report => globalId);
	}
});

