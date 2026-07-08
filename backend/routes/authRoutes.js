const express = require('express');
const router = express.Router();
const user = require('./../models/User');
const {jwtAuthMiddleware , generateToken} = require('../middlewares/jwt')



router.post('/register' , async (req , res)=>{
    try {
        const data = req.body;

        const existinguser = await user.findOne({
            email: data.email
        });

        if(existinguser){
            return res.status(400).json({error: "Email aleady exist"});
        }

        const newUser = await user.create(data);
    
        console.log('data saved ');

        const payload = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        };

        
        const token = generateToken(payload);

        const userWithoutpassword = await user
            .findById(newUser._id)
            .select("-password");

        // console.log("Token is : ", token);
        res.status(200).json({userWithoutpassword: userWithoutpassword , token });


    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})


router.post('/login' ,jwtAuthMiddleware, async (req, res)=>{
    try {
        const {email , password } = req.body;
        const foundUser = await user.findOne({email: email})

        if(!foundUser){
            return res.status(401).json({error: 'Invalid Email or Password'});
        }

        
        const isMatch = await foundUser.comparePassword(password);

        
        if(!isMatch){
            return res.status(401).json({error: 'Invalid Email or Password'});
        }

        //generate token 
        const payload = {
            id: foundUser.id,
            email: foundUser.email 
        }

        const token = generateToken(payload);

        res.json({token})

        

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})


router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const userFound = await user.findById(userId).select("-password");

        res.status(200).json(userFound);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;