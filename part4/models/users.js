
const { uniqueId } = require('lodash')
const mongoose = require('mongoose')
const blog = require('./blog')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        minLength: 5,
        validate:{
            validator: (v) => {
                return  !(/^\W|^\d/.test(v))
            },
            message: (err) => 'username cant begin with special characters or numbers'
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
    },
    name:{
        type: String,
        required: true,
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.set("toJSON", {
    transform: (docu, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.password
        delete retObj.__v
    }
})

module.exports = mongoose.model('Users', userSchema)
