const userRouter = require('express').Router()
const User = require('../models/users')
const { error } = require('../utils/logger')
const {errorHandler} = require('../utils/middleware')
const bcrypt = require('bcrypt')


userRouter.get('/', async (req, rep) => {
    const users = await User.find({}).populate('blogs', {user: 0})
    rep.json(users)
})

userRouter.get('/:id', async (req, rep) => {
    try{
        const user = await User.findById(req.params.id)
        rep.json(user)
    }catch (err){
        errorHandler(err, req, rep, null)
    }
})

userRouter.post('/', async (req, rep) => {
    try{
        const { username, name, password} = req.body
        const PasswordError = new Error("Password cant be empty!")
        PasswordError.name = 'PasswordErr'
        if(!password){
            throw PasswordError
        }
        
        const hashPass = await bcrypt.hash(password, 10)
            const user = new User( {
                username: username,
                name: name,
                password: hashPass
            })

            const savedUser = await user.save()
            rep.status(201).json(savedUser)
    }catch (err) {
        errorHandler(err, req,rep)
    }
})




module.exports = userRouter