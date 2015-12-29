import { GraphQLObjectType, GraphQLList,
	GraphQLString, GraphQLID } from 'graphql';
import { globalIdField } from 'graphql-relay';
import GraphQLAction from './GraphQLAction';
import GraphQLLabel from './GraphQLLabel';

export default const GraphQLScript = new GraphQLObjectType({
	name: 'Script',
	description: 'Automation test script.',
	fields: () => ({
		id: globalIdField('Script', script => script._id),
		title: {
			type: GraphQLString,
			description: 'Test script title.'
		},
		date: {
			type: GraphQLString,
			description: 'Script update date.'
		},
		labels: {
			type: new GraphQLList(GraphQLLabel),
			description: 'Script labels.'
		},
		actions: {
			type: new GraphQLList(GraphQLAction),
			description: 'Script actions.'
		}
	})
});