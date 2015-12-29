export default const updateScriptMutation = mutationWithClientMutationId({
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