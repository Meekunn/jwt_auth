const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is Required"],
		unique: [true, "Username already Exists"],
	},
	email: {
		type: String,
		required: [true, "Email is Required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is Required"],
	},
});

module.exports = mongoose.model("Users", userSchema);
