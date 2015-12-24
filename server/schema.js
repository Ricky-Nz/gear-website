import {
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';

import {
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	cursorForObjectInConnection,
	fromGlobalId,
	globalIdField,
	mutationWithClientMutationId,
	nodeDefinitions,
} from 'graphql-relay';

import {
	DBUser,
	DBScript,
	DBPackage,
	DBParameter,
	DBReport,
	findScripts,
	findParameters,
	findPackages,
	findReports,
	findUser
} from './database';

import fs from 'fs';
import path from 'path';
import _ from 'underscore';

var GraphQLAction = new GraphQLObjectType({
	name: 'Action',
	description: 'Script action.',
	fields: () => ({
		type: {
			type: GraphQLString
		},
		find: {
			type: GraphQLString
		},
		args: {
			type: GraphQLString
		}
	})
});

var GraphQLActionInput = new GraphQLInputObjectType({
	name: 'ActionInput',
	description: 'Script action input.',
	fields: () => ({
		type: {
			type: new GraphQLNonNull(GraphQLString)
		},
		find: {
			type: GraphQLString
		},
		args: {
			type: GraphQLString
		}
	})
});

var GraphQLScript = new GraphQLObjectType({
	name: 'Script',
	description: 'Automation test script.',
	fields: () => ({
		title: {
			type: GraphQLString
		},
		date: {
			type: GraphQLString
		},
		tags: {
			type: new GraphQLList(GraphQLString)
		},
		actions: {
			type: new GraphQLList(GraphQLAction)
		}
	})
});

var GraphQLPackage = new GraphQLObjectType({
	name: 'Package',
	description: 'Test installaction packages.',
	fields: () => ({
		title: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		},
		path: {
			type: GraphQLString
		},
		date: {
			type: GraphQLString
		},
		size: {
			type: GraphQLInt
		},
		description: {
			type: GraphQLString
		}
	})
});

var GraphQLParameter = new GraphQLObjectType({
	name: 'Parameter',
	description: 'Script global parameter',
	fields: () => ({
		key: {
			type: GraphQLString
		},
		value: {
			type: GraphQLString
		},
		date: {
			type: GraphQLString
		}
	})
});

var GraphQLReport = new GraphQLObjectType({
	name: 'Report',
	description: 'Test report.',
	fields: () => ({
		startDate: {
			type: GraphQLString
		},
		endDate: {
			type: GraphQLString
		},
		platform: {
			type: GraphQLString
		},
		platformVersion: {
			type: GraphQLString
		},
		packageName: {
			type: GraphQLString
		},
		packageDate: {
			type: GraphQLString
		},
		packageDescription: {
			type: GraphQLString
		},
		packagePath: {
			type: GraphQLString
		},
		scripts: {
			type: new GraphQLList(GraphQLScript)
		},
		tags: {
			type: new GraphQLList(GraphQLString)
		}
	})
});

var {
	connectionType: ScriptsConnection,
	edgeType: GraphQLScriptEdge
} = connectionDefinitions({
	name: 'Script',
	nodeType: GraphQLScript
});

var {
	connectionType: PackagesConnection,
	edgeType: GraphQLPackageEdge
} = connectionDefinitions({
	name: 'Package',
	nodeType: GraphQLPackage
});

var {
	connectionType: ParametersConnection,
	edgeType: GraphQLParameterEdge
} = connectionDefinitions({
	name: 'Parameter',
	nodeType: GraphQLParameter
});

var {
	connectionType: ReportsConnection,
	edgeType: GraphQLReportEdge
} = connectionDefinitions({
	name: 'Report',
	nodeType: GraphQLReport
});

var GraphQLUser = new GraphQLObjectType({
	name: 'User',
	description: 'Platform user.',
	fields: () => ({
		id: globalIdField('User', user => user._id),
		scripts: {
			type: ScriptsConnection,
			args: connectionArgs,
			resolve: (user, args) =>
				findScripts(user._id).then(scripts => connectionFromArray(scripts, args))
		},
		parameters: {
			type: ParametersConnection,
			args: connectionArgs,
			resolve: (user, args) =>
				findParameters(user._id).then(parameters => connectionFromArray(parameters, args))
		},
		packages: {
			type: PackagesConnection,
			args: connectionArgs,
			resolve: (user, args) =>
				findPackages(user._id).then(packages => connectionFromArray(packages, args))
		},
		reports: {
			type: ReportsConnection,
			args: connectionArgs,
			resolve: (user, args) =>
				findReports(user._id).then(reports => connectionFromArray(reports, args))
		}
	})
});

var GraphQLQueryRoot = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		user: {
			type: GraphQLUser,
			args: {
				username: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, { username, password }) =>
				findUser(username, password).then(user => user)
		}
	})
});

var createScriptMutation = mutationWithClientMutationId({
	name: 'CreateScript',
	inputFields: {
		sessionId: {
			type: new GraphQLNonNull(GraphQLString)
		},
		title: {
			type: new GraphQLNonNull(GraphQLString)
		},
		tags: {
			type: new GraphQLList(GraphQLString)
		},
		actions: {
			type: new GraphQLList(GraphQLActionInput)
		}
	},
	outputFields: {
		scriptEdge: {
			type: GraphQLScriptEdge,
			resolve: ({scriptId, userId}) =>
				findScripts(userId).then(scripts => {
						const newScript = _.find(scripts, script => script._id.toString() === scriptId.toString());
						return {
							cursor: cursorForObjectInConnection(scripts, newScript),
							node: newScript
						};
					})
		}
	},
	mutateAndGetPayload: ({sessionId, ...fields}) =>
		findUseBySession(sessionId).then(user =>
			createScript({userId: user._id, ...fields}).then(newScript =>
				({userId: newScript.userId, scriptId: newScript._id})))
});

var updateScriptMutation = mutationWithClientMutationId({
	name: 'UpdateProject',
	inputFields: {
		password: {
			type: new GraphQLNonNull(GraphQLString)
		},
		id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		name: {
			type: GraphQLString
		},
		order: {
			type: GraphQLString
		},
		category: {
			type: GraphQLString
		},
		index: {
			type: GraphQLString
		},
		promote: {
			type: GraphQLString
		},
		location: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		},
		area: {
			type: GraphQLString
		},
		status: {
			type: GraphQLString
		},
		banner: {
			type: GraphQLString
		},
		thumbnail: {
			type: GraphQLString
		},
		labels: {
			type: new GraphQLList(GraphQLString)
		},
		segments: {
			type: new GraphQLList(GraphQLSegmentInput)
		}
	},
	outputFields: {
		project: {
			type: GraphQLProject,
			resolve: (projectId) => findProjectById(projectId)
				.then(project => project)
		}
	},
	mutateAndGetPayload: ({password, ...fields}, {rootValue}) => {
		if (confirmPassword(password)) {
			return updateProject(fields, rootValue.request.files)
				.then(project => project._id);
		} else {
			return null;
		}
	}
});

var removeProjectMutation = mutationWithClientMutationId({
	name: 'RemoveProject',
	inputFields: {
		password: {
			type: new GraphQLNonNull(GraphQLString)
		},
		id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	outputFields: {
		deletedProjectId: {
			type: GraphQLString,
			resolve: ({projectId}) => projectId
		},
		app: {
			type: GraphQLApp,
			resolve: ({projectId}) => getApp().then(app => app)
		}
	},
	mutateAndGetPayload: ({id, password}) => {
		if (confirmPassword(password)) {
			return removeProject(id)
				.then(removedProject => ({projectId: id}));
		} else {
			return null;
		}
	}
});

var GraphQLMutationRoot = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		updateApp: updateAppMutation,
		createProject: createProjectMutation,
		updateProject: updateProjectMutation,
		removeProject: removeProjectMutation
	})
});

export var schema = new GraphQLSchema({
	query: GraphQLQueryRoot,
	mutation: GraphQLMutationRoot
});



