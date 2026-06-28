const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');
const { models } = require('mongoose');

router.post('/', async(req,res)=>{
    try{
            
        const data = req.body  //Assuming the request body contains the person data

        //create a new person document using mongoose model
        const newItem = new MenuItem(data);

        //save new person to databse 
        // const response = await newItem.save();
        const response = await MenuItem.insertMany(data);
        console.log('data saved');
        res.status(200).json(response);


    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})

    }
    
})


router.get('/', async (req , res) =>{
    try{
        const data = await MenuItem.find();
        console.log('Items fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})

    }
})


router.get('/:tasteType', async (req , res) =>{
    try{
        const tasteType = req.params.tasteType; //Extract worktype from the url parameter
        if(tasteType == 'spicy' || tasteType == 'sweet'|| tasteType == 'sour' )
        {
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);

        }
        else{
           res.status(404).json({error: "Invalid Worktype"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})

    }

})

module.exports = router;