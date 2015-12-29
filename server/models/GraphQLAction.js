import { GraphQLString } from 'graphql';

export default const GraphQLAction = new GraphQLObjectType({
	name: 'Action',
	description: 'Script action.',
	fields: () => ({
		type: {
			type: GraphQLString,
			description: 'action type'
		},
		args: {
			type: GraphQLString,
			description: 'action arguments'
		},
		findType: {
			type: GraphQLString,
			description: 'element find methods.'
		},
		findArgs: {
			type: GraphQLString,
			description: 'element find arguments.'
		}
	})
});