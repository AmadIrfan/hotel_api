const mongoose = require("mongoose");

const user = mongoose.model("user", {
	first_Name: {
		type: String,
		required: true,
	},
	last_Name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

const admin = mongoose.model("admins", {
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	supper: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		default: "admin",
	},
});

const employees = mongoose.model("employees", {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	cnic: {
		type: String,
		required: true,
	},
	salary: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	data: {
		type: Array,
		required: true,
	},
});

const Room = mongoose.model("rooms", {
	roomNo: {
		type: String,
		required: true,
	},
	pricePerDay: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	images: {
		type: Array,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	servant: {
		type: Array,
		required: true,
	},
});
module.exports = { user, admin, employees, Room };
