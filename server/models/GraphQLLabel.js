import { GraphQLObjectType, GraphQLString } from 'graphql';

export default const GraphQLLabel = new GraphQLObjectType({
	name: 'Label',
	description: 'script label',
	fields: () => ({
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