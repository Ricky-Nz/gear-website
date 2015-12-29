import { GraphQLObjectType, GraphQLString } from 'graphql';

export default const GraphQLParameter = new GraphQLObjectType({
	name: 'Parameter',
	description: 'Script global parameter',
	fields: () => ({
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