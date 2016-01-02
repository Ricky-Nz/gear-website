import { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean
} from 'graphql';

export default new GraphQLObjectType({
	name: 'AppVersion',
	description: 'application versions',
	fields: {
		version: {
			type: GraphQLString,
			description: 'version number.'
		},
		download: {
			type: GraphQLString,
			description: 'download address.'
		}
	}
});
