import mongoose, { Schema } from 'mongoose';
import fs from 'fs-extra';
import path from 'path';

export const DBUser = mongoose.model('DBUser', new Schema({
	username: { type: String, unique: true },
	password: { type: String }
}));

export const DBPackage = mongoose.model('DBPackage', new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, required: true },
	type: { type: String, required: true },
	path: { type: String, required: true },
	date: { type: Date, required: true },
	size: { type: Number, required: true },
	description: { type: String }
}));

let parameterSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	key: { type: String, required: true },
	value: { type: String },
	date: { type: Date, required: true }
});
parameterSchema.index({ userId: 1, key: 1 }, { unique: true });
export const DBParameter = mongoose.model('DBParameter', parameterSchema);

let actionSchema = new Schema({
	type: { type: String, required: true },
	find: { type: String },
	args: { type: String }
});

let scriptSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	title: { type: String, required: true },
	tags: { type: [String], required: true },
	date: { type: Date, required: true },
	actions: { type: [actionSchema], required: true }
});
export const DBScript = mongoose.model('DBScript', scriptSchema);

export const DBReport = new Schema({
	userId: { type: Schema.Types,ObjectId, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	platform: { type: String, required: true },
	platformVersion: { type: String, required: true },
	packageName: { type: String, required: true },
	packageDate: { type: String, required: true },
	packageDescription: { type: String },
	packagePath: { type: String, required: true },
	scripts: { type: [scriptSchema], required: true },
	tags: { type: [String], required: true }
});

export function findScripts(userId) {
	return DBScript.find({ userId }).exec();
}

export function findParameters(userId) {
	return DBParameter.find({ userId }).exec();
}

export function findPackages(userId) {
	return DBPackage.find({ userId }).exec();
}

export function findReports(userId) {
	return DBReport.find({ userId }).exec();
}

export function findUser(username, password) {
	return DBUser.findOne({ username, password }).exec();
}




