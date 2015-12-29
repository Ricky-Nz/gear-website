import {
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLString
} from 'graphql';

export default const GraphQLActionInput = new GraphQLInputObjectType({
	name: 'ActionInput',
	description: 'Script action input.',
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