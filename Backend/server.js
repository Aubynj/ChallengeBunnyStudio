const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000
// app.use(cors)
app.use(express.json())

const uri = process.env.DB_URL
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Mongodb database establish successfully')
})

const taskRouter = require('./Routes/tasks')
const userRouter = require('./Routes/users')

// app.get("/hello", (req, res) => {
//     res.send("Hello world")
// });

app.use('/Task', taskRouter)
app.use('/Users', userRouter)

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})