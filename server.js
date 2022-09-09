const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const UserRouter = require('./Routes/UserRoutes')

app.use('/user',express.json(),UserRouter)

const PORT = process.env.PORT || 5000



mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database Connected")
    console.log("server Started on PORT", PORT)
}).catch((err) => {
    console.log("Error in connecting to DataBase", err.message)
})

app.listen(process.env.PORT || 5000, ()=>console.log('Server Connected'))