let router = require('express').Router()
let User = require('../models/User.model')

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username

    const newUser = new User({username})
    newUser.save()
    .then(() => res.json({success : true, message : "Created"}))
    .catch((err) => res.status(400).json({success : false, message : err}))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
})

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json({success : true, message : "Deleted Successfully"}))
    .catch((err) => res.status(400).json({success : false, message : err}))
})

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.username = req.body.username
        
        user.save()
        .then(() => res.json({success : true, message : "Updated Successfully"}))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router