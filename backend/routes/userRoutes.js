const express = require('express');
const router = express.Router();
const user = require('./../models/User');
const {jwtAuthMiddleware} = require('../middlewares/jwt');
const User = require('./../models/User');


router.get('/',jwtAuthMiddleware, async (req,res)=>{
    try {

        const data = await User.find().select("-password");
        console.log('data fetched');
        res.status(200).json(data)

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:id',jwtAuthMiddleware, async (req,res)=>{
    try {
    

        const data = await User.findById(req.params.id).select("-password");

        if(!data)
        {
            return res.status(404).json({error: "user not found"})
        }

        console.log('data fetched');
        res.status(200).json(data)

        
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.post('/', jwtAuthMiddleware, async (req, res)=>{
    try{
        const data = req.body
        const newuser = new user(data);

        const existingUser = await user.findOne({
            email: data.email
        });

        if (existingUser) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        const response = await newuser.save();
        console.log('data saved');
        res.status(201).json(response)


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

router.put('/:id', jwtAuthMiddleware, async (req,res)=>{
    try {
        const userId = req.params.id;
        const updateUserData= req.body;

        const response = await user.findByIdAndUpdate(userId , updateUserData,{
            new : true,
            runValidators: true
            
        });

        if(!response)
        {
            res.status(401).json({error: "user not found"})
        }

        console.log('data updated sucessfully');
        res.status(200).json(response)


    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id' , jwtAuthMiddleware, async (req, res)=>{
    try{
        const response = await user.findByIdAndDelete(req.params.id);

        if(!response)
        {
            return res.status(404).json({error: "User id not found"})
        }

        console.log("user Deleted ")
        res.status(200).json(response)

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})



module.exports = router;