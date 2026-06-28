const express = require('express');
const router = express.Router();
const person = require('./../models/person');

router.post('/', async(req,res)=>{
    try{
            
        const data = req.body  //Assuming the request body contains the person data

        //create a new person document using mongoose model
        const newPerson = new person(data);

        //save new person to databse 
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);


    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})

    }
    
})

router.get('/' , async (req,res) =>{
    try{
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType', async (req , res)=> {
    try{
        const workType = req.params.workType; //Extract worktype from the url parameter
        if(workType == 'chef' || workType == 'manager'|| workType == 'waiter'||workType == 'Durga Mistri' )
        {
            const response = await person.find({work: workType});
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

router.put('/:id' , async (req,res) => {
    try{
        const personId = req.params.id; // extract id from url parameter 
        const updatePersonData = req.body; //extract updated data for the person

        const response = await person.findByIdAndUpdate(personId , updatePersonData,{
            new : true, //Return the updated document 
            runValidators: true, // Run mongoose Validation 
        })

        if(! response){
            return res.status(404).json({error: 'Person not found'})
        }

        console.log('Data Updated');
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }
})

router.delete('/:id' , async (req , res) => {
    try {

        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);

         if(! response){
            return res.status(404).json({error: 'Person not found'})
        }

        console.log('Data Deleted');
        res.status(200).json(response)

        
    } catch (err) {
         console.log(err);
        res.status(500).json({error: "Internal server error"})
        
    }
})

module.exports = router;