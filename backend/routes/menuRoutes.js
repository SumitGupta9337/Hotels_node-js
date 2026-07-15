const express = require('express');
const router = express.Router();
const Menu = require("../models/Menu");
const {jwtAuthMiddleware} = require('../middlewares/jwt')
const checkRole = require("../middlewares/authRole");


router.get('/' , async (req,res) =>{
    try{
        const data = await Menu.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:id', async (req,res)=>{
    try {
    

        const data = await Menu.findById(req.params.id);

        if(!data)
        {
            return res.status(404).json({error: "Menu item not found"});
        }

        console.log('data fetched');
        res.status(200).json(data)

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/' ,jwtAuthMiddleware,checkRole("manager"), async (req,res) => {
    try{
        const data = req.body
        const newItem = new Menu(data);

        const response = await newItem.save();
        res.status(201).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})

    }

})


router.put('/:id' ,jwtAuthMiddleware, checkRole("manager"), async (req,res) => {
    try{
        const MenuId = req.params.id; // extract id from url parameter 
        const updateMenuData = req.body; //extract updated data for the person

        const response = await Menu.findByIdAndUpdate(MenuId , updateMenuData,{
            new : true, //Return the updated document 
            runValidators: true, // Run mongoose Validation 
        })

        if(! response){
            return res.status(404).json({error: 'Menu item not found'})
        }

        console.log(`Menu item ${MenuId} updated`);
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }
})


router.delete('/:id' ,jwtAuthMiddleware, checkRole("manager"), async (req , res) => {
    try {

        const MenuId = req.params.id;
        const response = await Menu.findByIdAndDelete(MenuId);

        if(! response){
            return res.status(404).json({error: 'Menu item not found'})
        }

        console.log('Data Deleted');
        res.status(200).json(response)

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"})
        
    }
})

module.exports = router;