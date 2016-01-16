import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export default new GraphQLInputObjectType({
	name: 'LabelInput',
	description: 'script label input',
	fields: () => ({
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'label name'
		},
		color: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'label color'
		}
	})
});