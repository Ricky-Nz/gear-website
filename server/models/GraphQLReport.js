import { GraphQLObjectType, GraphQLString } from 'graphql';
import GraphQLScriptRecord from './GraphQLScriptRecord';

export default const GraphQLReport = new GraphQLObjectType({
	name: 'Report',
	description: 'Test report.',
	fields: () => ({
		startTime: {
			type: GraphQLString,
			description: 'test start time'
		},
		endTime: {
			type: GraphQLString,
			description: 'test end time'
		},
		platform: {
			type: GraphQLString,
			description: 'platform name'
		},
		platformVersion: {
			type: GraphQLString,
			description: 'platform version'
		},
		packageName: {
			type: GraphQLString,
			description: 'installation package file name.'
		},
		scripts: {
			type: new GraphQLList(GraphQLScriptRecord),
			description: 'test runned scripts.'
		},
		labels: {
			type: new GraphQLList(GraphQLString),
			description: 'run labels.'
		}
	})
});