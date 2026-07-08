const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    waiter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    table:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true
    },

    items:[{

        menuItem:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            required: true
        },

        quantity:{
            type: Number,
            required: true,
            default: 1, 
            min:1
            
        },

        price:{
            type: Number,
            required: true,
            min: 0
        },

    }],

    totalAmount:{
        type: Number,
        required: true,
        min: 0
    },

    status:{
        type: String,
        enum:["pending" ,"preparing" ,"ready" , "served"],
        default: "pending",
    }


},
{
    timestamps: true,
  })

module.exports = mongoose.model("Order", orderSchema);