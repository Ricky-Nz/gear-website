import {
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString
} from 'graphql';

export default new GraphQLInputObjectType({
	name: 'ActionInput',
	description: 'script action input.',
	fields: () => ({
		type: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'action type.'
		},
		args: {
			type: GraphQLString,
			description: 'action arguments.'
		},
		findType: {
			type: GraphQLString,
			description: 'element find type.'
		},
		findArgs: {
			type: GraphQLString,
			description: 'element find arguments.'
		}
	})
});