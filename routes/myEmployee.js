const express = require("express");
const mongoose = require("mongoose");
const { db } = require("../db/db");
const router = express.Router();
const multer = require("multer");
const { employees } = require("../db/schema");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/images/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});

var upload = multer({ storage });

router.post("/", upload.single("imgFile"), (req, res) => {
	try {
		let data = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			image: req.file.filename,
			cnic: req.body.cnic,
			type: req.body.type,
			salary: req.body.salary,
			data: [],
		};
		db.collection("employees").insertOne(data, (err, r) => {
			if (err) {
				res.status(500).json({
					status_code: 500,
					message: err,
					status: "error",
				});
			} else {
				res.status(200).json({
					message: "Employee Register successfully ",
					status_code: 200,
					status: "ok",
				});
			}
		});
	} catch (err) {
		res.status(500).json({
			status_code: 500,
			message: err,
			status: "error",
		});
	}
});

router.get("/", (req, res) => {
	try {
		employees.find().then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			status_code: 500,
			message: err,
			status: "error",
		});
	}
});

router.get("/:id", (req, res) => {
	try {
		let id = req.params.id;
		employees.findById(id).then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			status_code: 500,
			message: err,
			status: "error",
		});
	}
});

router.get("/type/:type", async (req, res) => {
	try {
		const type = req.params.type;
		employees.find({ type }).then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			status_code: 500,
			message: err,
			status: "error",
		});
	}
});

router.put("/:id", (req, res) => {
	try {
		let data = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			cnic: req.body.cnic,
			type: req.body.type,
			salary: req.body.salary,
			data: [],
		};
		let id = req.params.id;
		employees.findByIdAndUpdate(id, data).then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			status_code: 500,
			message: err,
			status: "error",
		});
	}
});

router.delete("/:id", (req, res) => {
	try {
		let id = req.params.id;
		employees.findByIdAndDelete(id).then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			status_code: 500,
			message: err,
			status: "error",
		});
	}
});

module.exports = router;
