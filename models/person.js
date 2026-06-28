const { default: mongoose } = require("mongoose")

//define person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    age:{
        type: Number,
        required: true
    },

    work:{
        type: String,
        enum: ['chef' , 'waiter' , 'manager' ,'Durga Mistri','Sweeper'],
        required: true
    },

    mobile:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    address:{
        type: String,
        
    },
    salary:{
        type: Number,
        required: true

    }
})

//create person model
const person = mongoose.model('Person',personSchema);
module.exports = person;