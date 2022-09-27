const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
	res.json({ message: "Login user" });
};

const signup = async (req, res) => {
	const { email, username, password } = req.body;

	try {
		const user = await User.signup(username, email, password);
		res.status(200).json({ email, user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { signin, signup };
// const maxTime = 5 * 60;

// const createToken = (id) => {
// 	return jwt.sign({ id }, "moyosore secret key", {
// 		expiresIn: maxTime,
// 	});
// };

// module.exports.signup = async (req, res, next) => {
// 	try {
// 		const { username, email, password } = req.body;
// 		const user = await UserModel.create({ username, email, password });
// 		const token = createToken(user._id);

// 		res.cookie("jwt", token, {
// 			withCredentials: true,
// 			httpOnly: false,
// 			maxAge: maxTime * 1000,
// 		});

// 		res.status(201).json({ user: user._id, created: true });
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// };

// module.exports.signin = async (req, res, next) => {};
