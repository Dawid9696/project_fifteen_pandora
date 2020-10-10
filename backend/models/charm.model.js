/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const charmSchema = new Schema({
	charmName: { type: String, required: true, trim: true, unique: true },
	charmPrice: { type: Number, required: true, trim: true, min: 20, max: 500 },
	charmDescription: { type: String, required: true, trim: true },
	charmMetal: { type: String, required: true, trim: true },
	charmAccess: { type: Boolean, default: true },
	charmSale: { type: Boolean, default: false },
	charmSalePrice: { type: Number, trim: true, min: 20, max: 500 },
	charmNew: { type: Boolean, default: true },
	charmPhotos: [
		{
			type: String,
			trim: true,
		},
	],
	charmComments: [
		{
			postedBy: { type: Schema.Types.ObjectId, ref: "User" },
			text: { type: String, required: true, trim: true },
			ratio: { type: Number, required: true, trim: true, min: 20, max: 500 },
		},
	],
});

module.exports = mongoose.model("Charm", charmSchema);
