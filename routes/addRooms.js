const express = require('express')
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
var multi = upload.fields([{ name: 'imgFile1' }, { name: 'imgFile2' }]);
router.post('/', multi, (req, res) => {
    const data = {
        name: req.body.roomNo,
        email: req.body.pricePerDay,
        phone: req.body.description,
        type: req.body.type,
        pictures: [req.files.imgFile1[0].filename, req.files.imgFile2[0].filename],
        status: req.body.status,
        servant: [req.body.servant]
    }
    console.log(data);
    // db.collection('ro    oms').insertOne(data, (err, r) => {
    //     if (err) throw err
    //     else {
    //         res.redirect('http://localhost:3000/manageRooms')
    //     }
    // });
})
module.exports = router;