/** @format */

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	admin: { type: Boolean, default: false },
	name: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (validator.isEmpty(value)) throw new Error("Please enter your name !");
			if (!validator.isAlpha(value)) throw new Error(`Name: ${value} can not contain numbers !`);
		},
	},
	surname: { type: String, required: true, trim: true, minlength: 1, maxlength: 15 },
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate(value) {
			if (validator.isEmpty(value) || !validator.isEmail(value)) {
				throw new Error(`Value ${value} is not an email!`);
			}
		},
	},
	password: { type: String, required: true, trim: true, minlength: 3 },
	photo: {
		type: String,
		trim: true,
		default: "https://www.pngkey.com/png/detail/413-4139797_unknown-person-icon-png-submarine-force-library-and.png",
	},
	phone: {
		type: String,
		trim: true,
		validate(value) {
			if (value.length != 9) throw new Error("Phone must have 9 marks !");
		},
	},
	country: { type: String, trim: true },
	street: { type: String, trim: true },
	numberOfHome: { type: String, trim: true },
	cart: [{ type: Schema.Types.ObjectId, ref: "Charm" }],
	tokens: [
		{
			token: { type: String },
		},
	],
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "thisis", { expiresIn: "1h" });
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	console.log("Wykon");
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("There is no user");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("There is no match bitch");
	}
	return user;
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

var User = mongoose.model("User", userSchema);

module.exports = User;
