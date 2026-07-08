const {default: mongoose} = require('mongoose');

const tableSchema = new mongoose.Schema({

    tableNumber:{
        type: Number,
        required: true,
        unique: true
    },

    capacity:{
        type: Number,
        required: true,
        min: 1
    },

    status:{
        type: String,
        enum:['available' , 'occupied'],
        default: "available"

    },
    
},
{
    timestamps:true
})

const Table = mongoose.model('Table',tableSchema);
module.exports = Table ; 