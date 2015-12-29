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