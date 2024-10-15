const mongoose = require('mongoose')

const contactScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5,
    },
    number:{
        type:String,
        required:true
    }
})

const Contact = mongoose.model('Contact', contactScheme)

module.exports = Contact
