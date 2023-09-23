const express = require("express");
const multer = require("multer");
const router = express.Router();
const { db } = require("../db/db");
const { Room } = require("../db/schema");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);

//     }
// })
// var upload = multer({ storage })
// var multi = upload.fields([{ name: 'imgFile1' }, { name: 'imgFile2' }])
// multi

router.post("/", (req, res) => {
	let data = {
		roomNo: req.body.roomNo,
		pricePerDay: req.body.pricePerDay,
		description: req.body.description,
		type: req.body.type,
		images: [],
		status: req.body.status,
		servant: [req.body.servant],
	};
	db.collection("rooms").insertOne(data, (err, r) => {
		if (err) {
			res.status(500).json({ message: err });
		} else {
			res.status(200).json({
				message: "Room Register successfully ",
				status_code: 200,
				status: "ok",
			});
		}
	});
});

router.get("/", (req, res) => {
	try {
		Room.find().then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			message: err,
			status_code: 500,
			status: "error",
		});
	}
});

router.get("/:id", (req, res) => {
	try {
		const id = req.params.id;
		Room.findById(id).then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			message: err,
			status_code: 500,
			status: "error",
		});
	}
});

router.delete("/:id", (req, res) => {
	try {
		const id = req.params.id;
		Room.findByIdAndDelete(id).then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			message: err,
			status_code: 500,
			status: "error",
		});
	}
});

router.put("/:id", (req, res) => {
	try {
		const id = req.params.id;
		let data = {
			roomNo: req.body.roomNo,
			pricePerDay: req.body.pricePerDay,
			description: req.body.description,
			type: req.body.type,
			images: [],
			status: req.body.status,
			servant: [req.body.servant],
		};
		Room.findByIdAndUpdate(id, data).then((result) => {
			res.send(result);
		});
	} catch (err) {
		res.status(500).json({
			message: err,
			status_code: 500,
			status: "error",
		});
	}
});

module.exports = router;
