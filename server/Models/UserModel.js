const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
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

// static auth method
userSchema.statics.signup = async function (email, password) {
	//validation
	if (!email || !password) {
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

	//generate salt
	const salt = await bcrypt.genSalt(12);
	//hash with password
	const hash = await bcrypt.hash(password, salt);

	//store password and email
	const user = await this.create({ email, password: hash });

	return user;
};

userSchema.statics.signin = async function (email, password) {
	if (!email || !password) {
		throw Error("All Fields are Required");
	}

	const userExists = await this.findOne({ email });

	if (!userExists) {
		throw Error("This email isn't registered");
	}

	const match = await bcrypt.compare(password, userExists.password);

	if (!match) {
		throw Error("Incorrect password");
	}

	return userExists;
};

module.exports = mongoose.model("User", userSchema);
