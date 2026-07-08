const {default: mongoose} = require("mongoose")

const menuSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    category:{
        type: String,
        enum:['veg' , 'non-veg'],
        required: true

    },

    price:{
        type: Number,
        required: true,
        min: 1
    },

    available: {
        type: Boolean,
        default: true
    },

    description: {
        type: String,
        trim: true
    }

})

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;