import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default const GraphQLParameter = new GraphQLObjectType({
	name: 'Parameter',
	description: 'Script global parameter',
	fields: () => ({
		id: globalIdField('Parameter', param => param._id),
		key: {
			type: GraphQLString,
			description: 'parameter key.'
		},
		value: {
			type: GraphQLString,
			description: 'parameter value.'
		},
		date: {
			type: GraphQLString,
			description: 'parameter update date.'
		}
	})
});