import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import GraphQLLabel from './GraphQLLabel';

export default new GraphQLObjectType({
	name: 'ScriptRecord',
	description: 'Script run record',
	fields: () => ({
		title: {
			type: GraphQLString,
			description: 'run script title'
		},
		labels: {
			type: new GraphQLList(GraphQLLabel),
			description: 'run script labels'
		},
		actions: {
			type: new GraphQLList(GraphQLString),
			description: 'run action record.'
		}
	})
});