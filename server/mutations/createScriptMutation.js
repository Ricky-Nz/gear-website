export default const createScriptMutation = mutationWithClientMutationId({
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