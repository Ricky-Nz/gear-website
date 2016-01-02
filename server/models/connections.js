import { connectionDefinitions } from 'graphql-relay';
import GraphQLScript from './GraphQLScript';
import GraphQLParameter from './GraphQLParameter';
import GraphQLReport from './GraphQLReport';

const {
	connectionType: ScriptsConnection,
	edgeType: GraphQLScriptEdge
} = connectionDefinitions({
	name: 'Script',
	nodeType: GraphQLScript
});

const {
	connectionType: ParametersConnection,
	edgeType: GraphQLParameterEdge
} = connectionDefinitions({
	name: 'Parameter',
	nodeType: GraphQLParameter
});

const {
	connectionType: ReportsConnection,
	edgeType: GraphQLReportEdge
} = connectionDefinitions({
	name: 'Report',
	nodeType: GraphQLReport
});

export {
	ScriptsConnection,
	GraphQLScriptEdge,
	ParametersConnection,
	GraphQLParameterEdge,
	ReportsConnection,
	GraphQLReportEdge
}

