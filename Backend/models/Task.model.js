const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userTask = new Schema({
    description : { type : String, required : true},
    state : {type: Boolean, default: false},
    user_id : {type: String, required: true, ref:'User'}
}, {
    timestamps : true
})

const Task = mongoose.model('Task', userTask)

module.exports = Task