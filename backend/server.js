/** @format */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const passportSetup = require("./passport");
var cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

// app.get("/auth/google", passport.authenticate("google", { scope: "https://www.google.com/m8/feeds" }));
// app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
// 	res.redirect("/");
// });

// app.post("./pay", async (req, res) => {
// 	const { email } = req.body;
// 	const paymentIntent = await stripe.paymentIntents.create({
// 		amount: 5000,
// 		currency: "pln",
// 		// Verify your integration in this guide by including this parameter
// 		metadata: { integration_check: "accept_a_payment" },
// 		recepient_email: email,
// 	});
// 	res.json({ client_secret: paymentIntent["client_secret"] });
// });
// const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb://localhost/", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	dbName: "Pandora",
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully !");
});

const pandoraRouter = require("./routes/pandoraRouter");

app.use("/Pandora", pandoraRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}...`);
});
