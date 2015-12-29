import { GraphQLObjectType, GraphQLList,
	GraphQLString } from 'graphql';
import GraphQLAction from './GraphQLAction';

export default const GraphQLScript = new GraphQLObjectType({
	name: 'Script',
	description: 'Automation test script.',
	fields: () => ({
		title: {
			type: GraphQLString,
			description: 'Test script title.'
		},
		date: {
			type: GraphQLString,
			description: 'Script update date.'
		},
		labels: {
			type: new GraphQLList(GraphQLString),
			description: 'Script labels.'
		},
		actions: {
			type: new GraphQLList(GraphQLAction),
			description: 'Script actions.'
		}
	})
});