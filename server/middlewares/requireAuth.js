const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
	//is user authenticated?
	const token = req.cookies.jwt;

	if (!token) {
		return res.status(401).json({ error: "Request is not authorized" });
	}

	const { _id } = jwt.verify(token, process.env.SECRET);
	const user = await User.findOne({ _id }).select("_id");
	if (!user) {
		return res
			.status(401)
			.json({ error: "You are not authorized to view this page" });
	}
	req.user;
	next();
};

module.exports = requireAuth;
