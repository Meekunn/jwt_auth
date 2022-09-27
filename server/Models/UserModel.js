const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
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
});

// static sign up method
userSchema.statics.signup = async function (username, email, password) {
	//validation
	if (!email || !password || !username) {
		throw Error("All Fields are Required");
	}
	if (!validator.isEmail(email)) {
		throw Error("Email is not valid");
	}
	if (!validator.isStrongPassword(password)) {
		throw Error("Password is not strong enough");
	}

	const emailExists = await this.findOne({ email });
	if (emailExists) {
		throw Error("Email already exists");
	}

	const usernameExists = await this.findOne({ username });
	if (usernameExists) {
		throw Error("Username already exists");
	}

	//generate salt
	const salt = await bcrypt.genSalt(15);
	//hash with password
	const hash = await bcrypt.hash(password, salt);

	//store password and email
	const user = await this.create({ username, email, password: hash });

	return user;
};

module.exports = mongoose.model("User", userSchema);