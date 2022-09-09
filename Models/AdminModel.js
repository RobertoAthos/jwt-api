const { Schema, default: mongoose } = require("mongoose");

const AdminSchema = new Schema ({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}
})

module.exports = mongoose.model('admin', AdminSchema)