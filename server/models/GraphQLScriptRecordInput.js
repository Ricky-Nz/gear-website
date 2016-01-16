import { GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import GraphQLLabelInput from './GraphQLLabelInput';

export default new GraphQLInputObjectType({
	name: 'ScriptRecordInput',
	description: 'Script run record',
	fields: () => ({
		title: {
			type: GraphQLString,
			description: 'run script title'
		},
		labels: {
			type: new GraphQLList(GraphQLLabelInput),
			description: 'run script labels'
		},
		actions: {
			type: new GraphQLList(GraphQLString),
			description: 'run action record.'
		}
	})
});