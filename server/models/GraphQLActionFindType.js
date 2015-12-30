import { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean
} from 'graphql';

export default const GraphQLActionFindType = new GraphQLObjectType({
	name: 'ActionType',
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
