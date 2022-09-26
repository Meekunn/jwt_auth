const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const maxTime = 5 * 60;

const createToken = (id) => {
	return jwt.sign({ id }, "moyosore secret key", {
		expiresIn: maxTime,
	});
};

module.exports.signup = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const user = await UserModel.create({ username, email, password });
		const token = createToken(user._id);

		res.cookie("jwt", token, {
			withCredentials: true,
			httpOnly: false,
			maxAge: maxTime * 1000,
		});

		res.status(201).json({ user: user._id, created: true });
	} catch (error) {
		console.log(error.message);
	}
};

module.exports.signin = async (req, res, next) => {};
