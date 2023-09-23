const express = require("express");
const { user } = require("../db/schema");
const router = express.Router();

router.get("/", (req, res) => {
	user.find().then((result) => {
		res.send(result);
	});
});

router.get("/", (req, res) => {
	var { email, password } = req.body;
	user.find({ email: email, password: password }).then((result) => {
		res.send(result);
	});
});

module.exports = router;
