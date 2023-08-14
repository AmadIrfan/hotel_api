const express = require('express')
const { user } = require('../db/schema')
const router = express.Router()


router.get('/', (req, res) => {
    user.find().then(result => {
        res.send(result);
    })
    
})
module.exports = router;