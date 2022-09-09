const Admin = require('../Models/AdminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const AdminController ={
    register:async(req,res)=>{
        const emailAlreadyExists = await Admin.findOne({email:req.body.email})
        if(emailAlreadyExists){
            return res.status(400).send('Esse Email/Senha já existe')
        }
        const newAdmin = new Admin(req.body)
        const salt =  bcrypt.genSaltSync(10);
        newAdmin.password =  bcrypt.hashSync(req.body.password, salt)


        try {
            const saveUser = await newAdmin.save()
            res.send(saveUser)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    login: async(req,res)=>{
        const emailAlreadyExists = await Admin.findOne({email:req.body.email})
        if(!emailAlreadyExists){
            return res.status(400).send('Esse Email/Senha não existe')
        }

        const loginAdmin = bcrypt.compareSync(req.body.password, emailAlreadyExists.password)
        if(!loginAdmin){
            return res.status(400).send('Esse Email/Senha incorreto')
        }

        const token = jwt.sign({_id: emailAlreadyExists._id}, process.env.TOKEN_SECRET)
        res.header('authorizarion-token', token)
        res.status(200).send('Admin logado')
    }
}

module.exports = AdminController