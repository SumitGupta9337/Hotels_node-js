const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt');

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

    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

// This middleware runs automatically BEFORE a Person document is saved
personSchema.pre('save', async function () {

    // 'this' refers to the current Person document being saved

    // If the password has not changed, do not hash it again
    if (!this.isModified('password')) {
        return;
    }

    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);

    // Hash the plain-text password using the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plain-text password with the hashed password
    this.password = hashedPassword;
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword , this.password);
        return isMatch;
        
    } catch (error) {
        throw error;
        
    }
}

//create person model
const person = mongoose.model('Person',personSchema);
module.exports = person;