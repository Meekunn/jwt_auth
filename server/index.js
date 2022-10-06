require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// middlewares
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		method: ["GET, POST"],
		credentials: true,
	})
);

app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use("/api/auth", authRoutes);

// mongodb
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(
				"connected to db & listening on port",
				process.env.PORT
			);
		});
	})
	.catch((error) => {
		console.log(error);
	});
