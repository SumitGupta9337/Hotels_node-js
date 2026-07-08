const {default: mongoose} = require("mongoose")
const bcrypt = require('bcrypt') 

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trin: true,
        lowercase: true

    },

    password:{
        type: String,
        required: true,
        minlength: 8
    },

    role:{
        type: String,
        enum:['manager' , 'customer' , 'chef' , 'waiter' ],
        required: true
    },
},
{
   timestamps:true
})


// This middleware runs automatically BEFORE a Person document is saved
userSchema.pre('save', async function (next) {

    // 'this' refers to the current Person document being saved

    // If the password has not changed, do not hash it again
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);
    
        // Hash the plain-text password using the generated salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
    
        // Replace the plain-text password with the hashed password
        this.password = hashedPassword;
    } catch (err) {
        next(err)
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword , this.password);
        return isMatch;
        
    } catch (error) {
        throw error;
        
    }
}


const User = mongoose.model('User' , userSchema);
module.exports = User;