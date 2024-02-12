const mongoose = require("mongoose");
const UserVerification = new mongoose.Schema({
	email: {
		type: String,
	    required:true,
		unique: true,
	},
	code: {
		type: String,
	},
    status:{
        type: Boolean,
        required: true,
    }
	
});

module.exports = mongoose.model("UserVerification", UserVerification);
