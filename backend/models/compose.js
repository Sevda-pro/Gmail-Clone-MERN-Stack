const mongoose = require("mongoose");
const Compose = new mongoose.Schema({
	mail: {
		type: String,
        required:true,
	},
	sub: {
		type: String,
	    required:true,
	},
	message: {
		type: String,
	},
    from:{
        type: String,
    },
	isRead: { // Add this field to your schema
        type: Boolean,
        default: false, // Default value for new emails should be 'false'
    }
});

module.exports = mongoose.model("Compose", Compose);
