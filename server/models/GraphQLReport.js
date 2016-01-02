import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import GraphQLScriptRecord from './GraphQLScriptRecord';
import GraphQLLabel from './GraphQLLabel';

export default new GraphQLObjectType({
	name: 'Report',
	description: 'Test report.',
	fields: () => ({
		id: globalIdField('Report', report => report._id),
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
			type: new GraphQLList(GraphQLLabel),
			description: 'run labels.'
		}
	})
});