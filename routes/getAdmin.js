const express = require('express');
const router = express.Router();
const { admin } = require('../db/schema');
const { db } = require('../db/db');

router.post('/', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    admin.find({ email: email, password: password }).then(result => {
        if (result) {
            result.forEach((e) => {
                if (e.email === email && e.password === password) {

                    console.log(result)
                    res.redirect('http://localhost:3000/home');
                    return;
                }
                else {
                    console.log('User Not Founded')
                    res.redirect('http://localhost:3000/');
                    return;
                }
            })
        }
    })

})
router.post('/', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);
    let data = {
        email: email,
        password: password,
        name: name,
    }
    console.log(data);
    db.collection('admins').insertOne(data, (err, r) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).send({ message: 'success', status_code: 200, result: req.body, });
        }
    })
})
module.exports = router;
