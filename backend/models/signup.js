const mongoose = require("mongoose");
const Signup = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	    required:true,
		unique: true,
	},
	password: {
		type: String,
	}
});

module.exports = mongoose.model("Signup", Signup);
