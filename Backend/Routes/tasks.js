let router = require('express').Router()
let Task = require('../models/Task.model')

// Routes for getting all task
router.route('/').get((req, res) => {
    Task.find()
    .then(task => res.json(task))
    .catch(err => res.status(400).json(err))
})

// Routes for adding user task
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

// Routes for retrieving single Task
router.route('/Single/:id').get((req, res) => {
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json(err))
})

// Routes for deleting User task
router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(() => res.json({success : true, message : "Deleted Successfully"}))
    .catch((err) => res.status(400).json({success : false, message : err}))
})

// Routes for updating User Task
router.route('/Update/:id').post((req, res) => {
    Task.findById(req.params.id)
    .then(task => {
        task.description = req.body.description
        
        task.save()
        .then(() => res.json({success : true, message : "Updated Successfully"}))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

// Routes for completing user task setting it done or not
router.route('/Completed/:id').post((req, res) => {
    // const newStatus = !req.body.state
    Task.findById(req.params.id)
    .then(task => {
        task.state = !req.body.state
        task.save()
        .then(() => res.json({success : true, message : "Updated Status Successfully"}))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

// Routes for finding all Tasks
router.route('/:id').get((req, res) => {
    let regex = new RegExp(req.params.user_id, "i"),
    query = { user_id: regex };
    Task.find(query, (err, doc) => {
        if (doc) {
            res.json(doc)
        }else if (err){
            console.log(err)
        }
    })
})


module.exports = router