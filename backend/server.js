
require('dotenv').config();
const express = require('express')
const app = express();
const db = require('./config/db');



app.use(express.json());

const  PORT = process.env.PORT || 3001;

//Middleware function 
const logRequest = (req , res , next) => {
console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`);
next(); // move to next phase

} 
app.use(logRequest);



app.get('/', function(req,res){
    res.json({
        message: "Restaurant Management System API"
    });
})


const menuRoutes = require('./routes/menuRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const tableRoutes = require('./routes/tableRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/menu' , menuRoutes);
app.use('/user' , userRoutes);
app.use('/auth' , authRoutes);
app.use('/table', tableRoutes)
app.use('/orders', orderRoutes);



app.listen(PORT , ()=>{
    console.log(`Server listening on port ${PORT}`);
});


//localAuthMiddleware,