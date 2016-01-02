import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
	name: 'Label',
	description: 'script label',
	fields: () => ({
		id: globalIdField('Label', label => label._id),
		name: {
			type: GraphQLString,
			description: 'label name'
		},
		color: {
			type: GraphQLString,
			description: 'label color'
		}
	})
});