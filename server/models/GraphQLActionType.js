import { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean
} from 'graphql';

export default new GraphQLObjectType({
	name: 'ActionType',
	description: 'Script support action types',
	fields: {
		name: {
			type: GraphQLString,
			description: 'action display name.'
		},
		args: {
			type: GraphQLBoolean,
			description: 'whether this action need action arguments.'
		},
		regex: {
			type: GraphQLString,
			description: 'field validation.'
		},
		help: {
			type: GraphQLString,
			description: 'help messages.'
		},
		needTarget: {
			type: GraphQLBoolean,
			description: 'whether this action need a target.'
		}
	}
});

