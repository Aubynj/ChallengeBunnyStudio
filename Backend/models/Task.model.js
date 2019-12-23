const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userTask = new Schema({
    description : { type : String, required : true},
    state : {type: Boolean, required : true},
    user_id : {type: String, required: true}
}, {
    timestamps : true
})

const Task = mongoose.model('Task', userTask)

module.exports = Task