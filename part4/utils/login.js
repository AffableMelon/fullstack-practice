const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

loginRouter.post('/', async (req, rep) => {
    const {username, password} = req.body
    if (!(username || password)){
        return rep.status(401).json({
            error: "Password or Username field empty"
        })
    }
    const user = await User.findOne({username})
    const correctPass = user === null ? false : await bcrypt.compare(password, user.password) 

    if(!(user && correctPass)){
        console.log(user)
        console.log(password)
        console.log(correctPass)
        return rep.status(401).json({
            error: 'username or password incorrect'
        })
    }

    const userTocken = {
        user: user.username,
        id: user.id
    }

    const token = jwt.sign(userTocken, process.env.SECRET)
    

    rep.status(200).send({
        token, username: user.username, name: user.name 
    })


})

module.exports = loginRouter