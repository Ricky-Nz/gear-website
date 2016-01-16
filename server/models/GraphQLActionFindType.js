import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
	name: 'ActionFindType',
	description: 'Action support find element methods.',
	fields: {
		name: {
			type: GraphQLString,
			description: 'find method display name.'
		},
		regex: {
			type: GraphQLString,
			description: 'field validation.'
		},
		help: {
			type: GraphQLString,
			description: 'help messages.'
		}
	}
})
