const express = require('express')
const app = express();
const cors = require('cors')
const Sib = require("sib-api-v3-sdk");
const User = require('./models/signup.js')
const Contact = require('./models/Contact.js')
const Compose = require('./models/compose.js')
const UserVerification = require('./models/UserVerification.js')
const bodyParser = require("body-parser");
const password_route = require('./routes/forget.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const connectDB = require('./db.js')
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use('/password', password_route)
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000
const OWN_URL = process.env.OWN_URL || 'http://localhost:5000'
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const authentication = async (req, res, next) => {
	try {

		const token = req.header("Authorization");
		const { userId } = jwt.verify(token, "secretKey");
		// console.log(userId);
		let currUser = await User.findById(userId);
		req.user = currUser;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ success: false, message: error });
	}
};
function generateAccessToken(id) {
	let x = jwt.sign({ userId: id }, "secretKey");
	return x;
}
app.post('/', async (req, res) => {
	try {
		const { email } = req.body;
		let obj = await User.findOne({ email: email });
		if (obj) {
			res.status(409).json({ message: "email already exits", success: false });
		} else {
			// Generate a random verification code
			const code = crypto.randomBytes(4).toString('hex').toUpperCase();
			// Save the verification code along with the user's email in the database
			await UserVerification.create({ email, code, status: false });
			const client = Sib.ApiClient.instance;
			const apiKey = client.authentications["api-key"];
			apiKey.apiKey = process.env.API;
			console.log("Using API key:", apiKey.apiKey);
			const transEmailApi = new Sib.TransactionalEmailsApi();
			const sender = {
				email: "mesahilsevda@gmail.com",
			};
			const receivers = [
				{
					email: email,
				},
			];
			const emailResponse = await transEmailApi.sendTransacEmail({
				sender,
				To: receivers,
				subject: "Registration NavLink",
				textContent: "NavLink Below",
				htmlContent: `<h3>Hi! We got the request from you. Here is the code below >>></h3>
                     ${code}`,
			});
			let salt = await bcrypt.genSalt(10);
			let hashedPassword = await bcrypt.hash(req.body.password, salt);
			req.body.password = hashedPassword;
			let result = await User.create(req.body);
			res.status(201).json({ success: true, message: "User account created", user: result });
		}
	} catch (error) {
		console.log(error);
		res.json({ message: error, success: false });
	}
})
app.post('/contact', async (req, res, next) => {
	try {
		let result = await Contact.create(req.body)
		res.status(200).json({ message: "We will get back to you within 48 hours.", success: true, result });
	} catch (error) {
		res.status(500).json({ message: error, success: false });
	}
})
app.get('/total', authentication, async (req, res, next) => {
	try {
		let user = await User.findOne({ _id: req.user._id })
		res.status(200).json({ result: user.total_expense });
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: error, success: false });
	}
})
app.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		let obj = await User.findOne({ email: email });
		if (obj) {
			let passwordMatch = await bcrypt.compare(password, obj.password);
			if (passwordMatch) {
				res.status(200).json({ name: obj.name, message: "login successfull", success: true, token: generateAccessToken(obj._id) });
			} else {
				res.status(400).json({ success: false, message: "invalid password" });
			}
		} else {
			res.status(404).json({ success: false, message: "email does not exist" });
		}
	} catch (error) {
		res.status(500).json({ message: error, success: false });
	}
})
app.get('/check',authentication, async (req, res) => {
	try {
		let data=await UserVerification.findOne({email:req.user.email})
		 res.status(200).json({result:data.status});
	} catch (error) {
		console.log(error);
		 res.status(409).json({ error, message: "failed registration" });
	}
});
app.post('/otpverification',authentication, async (req, res, next) => {
	try {
		const code = req.body.otp;
		let data=await UserVerification.findOne({email:req.user.email})
		if (data.code==code) {
			await UserVerification.updateOne({ email: req.user.email }, { status: true });
				res.status(200).json({message: "Otp verified", success: true });
			} else {
				res.status(200).json({ success: false, message: "invalid otp" });
			}
		}
	 catch (error) {
		console.log(error)
		res.status(500).json({ message: error, success: false });
	}
})
app.post('/compose',authentication,async(req,res)=>{
    try{
		 let obj={
			mail:req.body.mail,
			sub:req.body.sub,
			message:req.body.message,
			userId:req.user._id
		 }
		 await Compose.create(obj);
		 res.status(200).json({message: "Email sent", success: true });
	}catch(error){
        console.log(`${error} in compose`);
		res.status(500).json({ message: error, success: false });
	}
})
app.get('/sent',authentication,async(req,res)=>{
	try{
     let result=await Compose.find({userId:req.user._id})
	 res.status(200).json({result:result});
	}catch(error){
		console.log(error)
		res.status(500).json({ message: error, success: false });
	}
})
const apprun = () => {
	connectDB()
	app.listen(PORT);
}
apprun();