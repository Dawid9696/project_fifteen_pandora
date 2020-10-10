/** @format */

const router = require("express").Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const cookie = require("cookie");
// const passport = require("passport");

//MODELS
const User = require("../models/user.model");
const Charm = require("../models/charm.model");

//UTILS
let Authentication = require("../helpers/Authentication");

router.get("/charms", async (req, res) => {
	try {
		const Charms = await Charm.find();
		res.send(Charms);
	} catch (err) {
		throw new Error(err);
	}
});

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/Charm/:id", async (req, res) => {
	try {
		const OneCharm = await Charm.findById(req.params.id);
		res.send(OneCharm);
	} catch (err) {
		throw new Error(err);
	}
});

router.post("/addCharm", async (req, res) => {
	try {
		const newCharm = new Charm(req.body);
		newCharm
			.save()
			.then(() => {
				res.send(newCharm);
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	} catch (err) {
		throw new Error(err);
	}
});

router.delete("/deleteCharm/:id", async (req, res) => {
	try {
		const deletedCharm = await Charm.findByIdAndDelete(req.params.id);
		res.send(deletedCharm);
	} catch (err) {
		throw new Error(err);
	}
});

router.patch("/updateCharm/:id", async (req, res) => {
	try {
		const updatedCharm = await Charm.findByIdAndUpdate(req.params.id, req.body);
		res.send(updatedCharm);
	} catch (err) {
		throw new Error(err);
	}
});

// //USER ROUTER

//REJESTRACJA UZYTKOWNIKA
router.post("/register", async (req, res) => {
	try {
		const newUser = new User(req.body);
		newUser
			.save()
			.then((newUser) => res.send(newUser))
			.catch((err) => res.status(400).json("Error: " + err));
	} catch (err) {
		throw new Error(err.msg);
	}
});

//WSZYSCY UŻYTKOWNICY
router.get("/Users", async (req, res) => {
	const token = req.token;
	try {
		const Uzytkownicy = await User.find();
		// res.setHeader(
		// 	"Set-Cookie",
		// 	cookie.serialize("token", "sdfsdfdf", {
		// 		httpOnly: true,
		// 		secure: process.env.NODE_ENV !== "development",
		// 		sameSite: "strict",
		// 		maxAge: 3600,
		// 		path: "/Cart",
		// 	})
		// );
		res.setHeader("Set-Cookie", "test=value");
		res.cookie("rememberme", "yes", { maxAge: 900000 });
		res.send({ Uzytkownicy, token });
	} catch (err) {
		res.status(400).send(err);
	}
});

//JEDEN UŻYTKOWNIK
router.get("/user/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	res.send(user);
});

//LOGOWANIE UZYTKOWNIKA
router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.cookie("auth", "LOGIN", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			maxAge: 3600,
			path: "/",
		});
		// res.setHeader(
		// 	"Set-Cookie",
		// 	cookie.serialize("auth", "hhhh", {
		// 		httpOnly: true,
		// 		secure: process.env.NODE_ENV !== "development",
		// 		sameSite: "strict",
		// 		maxAge: 3600,
		// 		path: "/",
		// 	})
		// );
		res.send({ user, token });
	} catch (e) {
		res.status(400).send("No acces!" + e);
	}
});

//WYLOGOWANIE UZYTKOWNIKA
router.post("/logout", Authentication, async (req, res) => {
	try {
		req.user.tokens = [];
		req.user
			.save()
			.then((user) => res.send("Logged Out"))
			.catch((err) => res.status(400).json("Error: " + err));
	} catch (err) {
		throw new Error(err);
	}
});

//PROFIL UŻYTKOWNIKA
router.get("/myprofile", Authentication, async (req, res) => {
	User.find(req.user._id)
		.then((profile) => res.json(profile))
		.catch((err) => res.status(400).json("Error: " + err));
});

//ZMIANA HASŁA
router.patch("/changePassword", Authentication, async (req, res) => {
	try {
		req.user.password = req.body.password;
		req.user
			.save()
			.then((user) => res.send(user))
			.catch((err) => res.status(400).json("Error: " + err));
	} catch (err) {
		res.status(400).send(err);
	}
});

router.patch("/changeProfileData", Authentication, async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body);
		res.send(req.user);
	} catch (err) {
		throw new Error(err);
	}
});

router.delete("/deleteProfile", Authentication, async (req, res) => {
	try {
		await User.findByCredentials(req.body.email, req.body.password);
		req.deletedUser
			.remove()
			.then(() => {
				res.send("User deleted!");
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	} catch (err) {
		throw new Error(err);
	}
});

module.exports = router;
