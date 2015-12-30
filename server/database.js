import mongoose, { Schema } from 'mongoose';

const DBUser = mongoose.model('DBUser', new Schema({
	username: { type: String, unique: true },
	password: { type: String }
}));

let parameterSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	key: { type: String, required: true },
	value: { type: String },
	date: { type: Date, required: true }
});
parameterSchema.index({ userId: 1, key: 1 }, { unique: true });
const DBParameter = mongoose.model('DBParameter', parameterSchema);

const actionSchema = new Schema({
	type: { type: String, required: true },
	args: { type: String },
	findType: { type: String },
	findArgs: { type: String }
});

const labelSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
	color: { type: String, required: true }
});
labelSchema.index({ userId: 1, name: 1 }, { unique: true });
const DBLabel = mongoose.model('DBLabel', labelSchema);

const DBScript = mongoose.model('DBScript', new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, required: true },
	date: { type: Date, required: true },
	labels: { type: [String], required: true },
	actions: { type: [actionSchema], required: true }
}));

const labelRecordSchema = new Schema({
	name: { type: String, required: true },
	color: { type: String, required: true }
});

const scriptRecordSchema = new Schema({
	title: { type: String, required: true },
	labels: { type: [labelRecordSchema], required: true },
	actions: { type: [String], required: true }
});

const DBReport = new Schema({
	userId: { type: Schema.Types,ObjectId, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
	platform: { type: String, required: true },
	platformVersion: { type: String, required: true },
	packageName: { type: String, required: true },
	labels: { type: [labelRecordSchema], required: true },
	records: { type: [scriptRecordSchema], required: true }
});

export function findScripts(userId, search) {
	let query = { userId };
	if (search) {
		query.title = { '$regex': search };
	}
	return DBScript.find(query).exec();
}

export function findParameters(userId, search) {
	let query = { userId };
	if (search) {
		query.$or = [
			{ key: { '$regex': search } },
			{ value: { '$regex': search } }
		];
	}
	return DBParameter.find(query).exec();
}

export function findReports(userId, search) {
	let query = { userId };
	if (search) {
		query.$or = [
			{ startTime: { '$regex': search } },
			{ endTime: { '$regex': search } }
		];
	}
	return DBReport.find(query).exec();
}

export function findLabels(userId, search) {
	let query = { userId };
	if (search) {
		query.name = { '$regex': search };
	}
	return DBLabel.find(query).exec();
}

export function getLabels(ids) {
	return DBLabel.find({_id: {$in: ids}}).exec();
}

export function getScript(id) {
	return DBScript.findById(id).exec();
}

export function getParameter(id) {
	return DBParameter.findById(id).exec();
}

export function getReport(id) {
	return DBReport.findById(id).exec();
}

export function getUser(username, password) {
	return DBUser.findOne({ username, password }).exec();
}

export function getUserById(id) {
	return DBUser.findById(id).exec();
}

export function createParameter({userId, key, value}) {
	let param = new DBParameter();
	param.userId = userId;
	param.key = key;
	param.value = value;
	param.date = Date.now();
	return param.save();
}

export function updateParameter({id, value}) {
	return DBParameter.findOneAndUpdate({_id: id}, {value}, {'new': true}).exec();
}

export function removeParameter(id) {
	return DBParameter.findOneAndRemove({_id: id}, {'new': true}).exec();
}

export function createScript({userId, title, labels, actions}) {
	let script = new DBScript();
	script.userId = userId;
	script.title = title;
	script.labels = labels;
	script.actions = actions;
	script.date = Date.now();
	return script.save();
}

export function updateScript({id, title, labels, actions}) {
	return DBScript.findOneAndUpdate({_id: id}, {title, labels, actions}, {'new': true}).exec();
}

export function removeParameter(id) {
	return DBScript.findOneAndRemove({_id: id}, {'new': true}).exec();
}

export function crateReport({userId, startTime, endTime, platform,
	platformVersion, packageName, labels, records}) {
	let report = new DBReport();
	report.userId = userId;
	report.startTime = startTime;
	report.endTime = endTime;
	report.platform = platform;
	report.platformVersion = platformVersion;
	report.packageName = packageName;
	report.labels = labels;
	report.records = records;
	return report.save();
}

export function removeReport(id) {
	return DBReport.findOneAndRemove({_id: id}, {'new': true}).exec();
}

