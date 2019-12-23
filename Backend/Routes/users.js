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

module.exports = router