const express = require("express");
const router = express.Router();
const { user } = require("../db/schema");
const jwt = require("jsonwebtoken");

router.post("/loginUsers", async (req, res) => {
	const { email, password } = req.body;
	try {
		const myUser = await user.findOne({ email });
		if (!myUser) {
			res
				.status(404)
				.json({ status: "error", message: "User not found", status_code: 404 });
		} else if (password === myUser.password) {
			const token = jwt.sign(
				{ userId: user._id, email: user.email, name: user.name },
				"secretKey",
				{ expiresIn: "1h" }
			);
			res.status(200).json({
				message: "Log in Successful",
				status_code: 200,
				user: myUser,
				token: token,
				status: "ok",
			});
		} else {
			res.status(500).json({
				status_code: 500,
				message: "Email or password is incorrect",
				status: "error",
			});
			// console.log("Email or password is incorrect");
		}
	} catch (err) {
		res.json(500).json({
			status_code: "error",
			message: "Internal server error",
			status_code: 500,
		});
	}
});

router.post("/registerUser", (req, res) => {
	try {
		let fName = req.body.fName;
		let lName = req.body.lName;
		let email = req.body.email;
		let password = req.body.password;
		let phone = req.body.phone;
		let data = {
			first_Name: fName,
			last_Name: lName,
			email: email,
			password: password,
			phone: phone,
		};

		db.collection("users").insertOne(data, (err, r) => {
			if (err) {
				res.json(500).json({ status_code: 500, message: err, status: "error" });
			} else {
				res.status(200).json({
					message: "User Register successfully ",
					status_code: 200,
					status: "ok",
				});
			}
		});
	} catch (err) {
		res.json(500).json({ status_code: 500, message: err, status: "error" });
	}
});


module.exports = router;
