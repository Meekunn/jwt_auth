const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const expTime = 5 * 60;

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: expTime });
};

const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.signin(email, password);
		const token = createToken(user._id);
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const signup = async (req, res) => {
	const { email, username, password } = req.body;

	try {
		const user = await User.signup(username, email, password);
		const token = createToken(user._id);
		res.status(200).json({ username, email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { signin, signup };
