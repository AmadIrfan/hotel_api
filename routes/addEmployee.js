const express = require('express')
const mongoose = require('mongoose')
const { db } = require('../db/db');
const router = express.Router()
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);

    }
})
var upload = multer({ storage })

router.post('/', upload.single('imgFile'), (req, res) => {
    // console.log(req.body.name)
    // console.log(req.body.email)
    // console.log(req.body.phone)
    // console.log(req.body.cnic)
    // console.log(req.body.salary)
    // console.log(req.file.filename)
    let data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
        cnic: req.body.cnic,
        type: req.body.type,
        salary: req.body.salary,
        data: [],
    }
        db.collection('employees').insertOne(data, (err, r) => {
        if (err) throw err
        else {
            res.redirect('http://localhost:3000/manageEmployees')
        }
    });
})


module.exports = router;