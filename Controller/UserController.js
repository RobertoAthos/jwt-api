const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserController = {
    register: async(req,res)=>{

        const emailAlreadyExists = await User.findOne({email:req.body.email})
        if(emailAlreadyExists){
            return res.status(400).send('Esse Email já existe')
        }

        const newUser = new User(req.body)
        const salt =  bcrypt.genSaltSync(10);
        newUser.password =  bcrypt.hashSync(req.body.password, salt)


        try {
            const saveUser = await newUser.save()
            res.send(saveUser)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    login: async(req,res)=>{


        const emailAlreadyExists = await User.findOne({email:req.body.email})
        if(!emailAlreadyExists){
            return res.status(400).send('Esse Email/Senha não existe')
        }

        const loginUser = bcrypt.compareSync(req.body.password, emailAlreadyExists.password)
        if(!loginUser){
            return res.status(400).send('Esse Email/Senha incorreto')
        }

        const token = jwt.sign({_id: emailAlreadyExists._id}, process.env.TOKEN_SECRET)
        res.header('authorizarion-token', token)
        res.status(200).send('Usuário logado')


    }
}

module.exports = UserController