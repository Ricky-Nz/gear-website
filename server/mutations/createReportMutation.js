import { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId, cursorForObjectInConnection } from 'graphql-relay';
import { getUserById, createReport, findReports } from '../database';
import { GraphQLReport, GraphQLReportEdge, GraphQLScriptRecordInput, GraphQLLabelInput } from '../models';
import _ from 'underscore';

export default mutationWithClientMutationId({
	name: 'CreateReport',
	description: 'create automation test report.',
	inputFields: {
		userId: {
			type: new GraphQLNonNull(GraphQLID),
			description: 'user id'
		},
		startTime: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'test start time'
		},
		endTime: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'test end time'
		},
		platform: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'test platform'
		},
		platformVersion: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'test platform version'
		},
		packageName: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'test pacakge name'
		},
		labels: {
			type: new GraphQLList(GraphQLLabelInput),
			description: 'label ids'
		},
		records: {
			type: new GraphQLList(GraphQLScriptRecordInput),
			description: 'script run records.'
		}
	},
	outputFields: {
		reportEdge: {
			type: GraphQLReportEdge,
			resolve: ({userId, reportId}) =>
				findReports(userId).then(reports => {
					const newItem = _.find(reports, report =>
						report._id.toString() === reportId.toString());
					return {
						cursor: cursorForObjectInConnection(reports, newItem),
						node: newItem
					};
				})
		}
	},
	mutateAndGetPayload: ({userId, ...fields}) => {
		const {type, id} = fromGlobalId(userId);
		return getUserById(id).then(user =>
			createReport({userId: id, ...fields}).then(report => ({userId: id, reportId: report._id})));
	}
});

