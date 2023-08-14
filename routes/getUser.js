const express = require('express')
const router = express.Router()
const { user } = require('../db/schema')


router.get('/', (req, res) => {
    var email = 'amadirfan443@gmail.com';
    var password = 'password';
    user.find({ email: email, password: password, }).then(result => {
        res.send(result);
    })
},)

module.exports = router;