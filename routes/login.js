const express = require('express');
const router = express.Router();
const { user } = require('../db/schema');
// const { db } = require('../db/db');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const myUser = await user.findOne({ email })
        console.log(myUser);
        if (!myUser) {
            res.status(404).json({ status: 'error', message: 'User not found' });
            console.log(myUser)
        }
        else if (password === myUser.password) {
            const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, 'secretKey', { expiresIn: '1h' });
            res.status(200).json({ message: 'Log in Successful', status: 'ok', user: myUser, token: token, });
            console.log('Log in Successful')
        }
        else {
            res.status(500).json({ status: 'error', message: 'Email or password is incorrect' });
            console.log('Email or password is incorrect')
        }
    } catch (err) {
        res.json(500).json({ status: 'error', message: 'Internal server error' });
    }
})

module.exports = router