import { GraphQLString, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
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