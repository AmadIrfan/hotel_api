const express = require('express')
const router = express.Router()
const { employees } = require('../db/schema')


router.get('/', (req, res) => {
    employees.find().then(result => {
        res.send(result);
    })
},)
router.get('/:id', (req, res) => {
    let id = req.params.id;
    employees.findById(id).then(result => {
        res.send(result);
    })

},)

router.get('/type/:type', async (req, res) => {
    const type = req.params.type;
    // console.log(type)
    // try {
    //     const employeesOfType = await Employee.find({ type });
    //     res.json(employeesOfType);
    // } catch (error) {
    //     console.error('Error fetching employees:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }

    employees.find({ type }).then(result => {
        res.send(result);
    })

});

router.put('/:id', (req, res) => {
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
    employees.findByIdAndUpdate(id, data).then(result => {
        res.send(result);
    })

},)
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    employees.findByIdAndDelete(id).then(result => {
        res.send(result);
    })

})

module.exports = router;