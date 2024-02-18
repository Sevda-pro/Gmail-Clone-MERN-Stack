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
	isRead: { 
        type: Boolean,
        default: false, 
    }
});

module.exports = mongoose.model("Compose", Compose);
