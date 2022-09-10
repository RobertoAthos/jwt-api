const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const UserRouter = require('./Routes/UserRoutes')
const AdminRoute = require('./Routes/AdminRoutes')
const cors = require('cors')

app.use('/user',express.json(),UserRouter)
app.use('/admin', express.json(), AdminRoute)
app.use(cors())

const PORT = process.env.PORT || 5000



mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database Connected")
    console.log("server Started on PORT", PORT)
}).catch((err) => {
    console.log("Error in connecting to DataBase", err.message)
})

app.listen(process.env.PORT || 5000, ()=>console.log('Server Connected'))