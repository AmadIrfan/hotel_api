const express = require('express');
const router = express.Router()

const { db } = require('../db/db');

router.post('/', (req, res) => {
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
    }
    db.collection('users').insertOne(data, (err, r) => {
        if (err) { console.log(err) }
        else {
            res.status(200).json({ message: 'User Register successfully ', status_code: 200 });

        }

    })
},);

module.exports = router;