const express = require("express");
const router = express.Router();
const { admin } = require("../db/schema");
const { db } = require("../db/db");

router.post("/loginAdmin", async (req, res) => {
	const { email, password } = req.body;
	try {
		const myUser = await user.findOne({ email });
		console.log(myUser);
		if (!myUser) {
			res
				.status(404)
				.json({ status: "error", message: "User not found", status_code: 40 });
			// console.log(myUser);

		} else if (password === myUser.password) {
			const token = jwt.sign(
				{ userId: user._id, email: user.email, name: user.name },
				"secretKey",
				{ expiresIn: "1h" }
			);
			res.status(200).json({
				message: "Log in Successful",
				status: "ok",
				user: myUser,
				token: token,
				status_code: 200,
			});
            
		} else {
			res.status(500).json({
				status: "error",
				message: "Email or password is incorrect",
				status_code: 500,
			});
			// console.log("Email or password is incorrect");
		}
	} catch (err) {
		res.json(500).json({
			status: "error",
			message: "Internal server error",
			status_code: 500,
		});
	}
});
router.post("/registerAdmin", (req, res) => {
	try {
		let name = req.body.name;
		let email = req.body.email;
		let password = req.body.password;
		console.log(req.body);
		let data = {
			email: email,
			password: password,
			name: name,
		};
		console.log(data);
		db.collection("admins").insertOne(data, (err, r) => {
			if (err) {
				res.status(500).json({
					status: "error",
					message: "Internal server error",
					status_code: 500,
				});
			} else {
				res.status(200).send({
					status: "ok",
					message: "successfully Registered",
					status_code: 200,
					result: req.body,
				});
			}
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			status_code: 500,
		});
	}
});
module.exports = router;
