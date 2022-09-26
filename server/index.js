const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const uri =
	"mongodb+srv://Ayomikun:Ayomikun@jwt-auth.902d3wo.mongodb.net/?retryWrites=true&w=majority;";

app.listen(5000, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Listening to PORT 5000");
	}
});

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connection Successful");
	})
	.catch((error) => {
		console.log(error);
	});

app.use(
	cors({
		origin: ["http://localhost:3000"],
		method: ["GET, POST"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
