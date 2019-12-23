let router = require('express').Router()
let Task = require('../models/Task.model')


router.route('/').get((req, res) => {
    Task.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
})

router.route('/add').post((req, res) => {
    const user_id = req.body.user_id
    const description  = req.body.description
    const state = false

    const newUserTask = new Task({
        description,
        state,
        user_id
    })
    newUserTask.save()
    .then(() => res.json({success : true, message : "Created"}))
    .catch((err) => res.status(400).json({success : false, message : err}))
})

module.exports = router