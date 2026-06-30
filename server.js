// // console.log('Server Running');
// // function add (a,b){
// //     return a+b;
// // }

// // var result = add(2,4);
// // var add = (a,b) => a+b;
// // var res = add(2,3);

// // console.log(result);
// // console.log(res);

// // (function(){
// //     console.log('Sumit is added');
// // })();

// // function callback(){
// //     console.log('Sumit is calling a function');
// // }

// // const add = function(a,b,callback){
// //     var result = a+b;
// //     console.log(result);
// //     callback();
// // }

// // add(3,1000,callback);

// // var fs = require('fs');
// // var os = require('os');

// // var user = os.userInfo();
// // console.log(user);
// // console.log(user.username);

// // fs.appendFile('greeting.txt','Hi '+ user.username + "! \n" , ()=>{
// //     console.log('file is created');
// // })

// const notes = require('./notes.js');

// var age = notes.age;
// console.log(age);

// const jsonString = '{"name": "john" , "age": 24 , "city" : "Mumbai"}';
// const jsonObject = JSON.parse(jasonString);
// console.log(jsonObject);
require('dotenv').config();
const express = require('express')
const app = express();
const db = require('./db');
const passport = require('./auth');




const bodyParser = require('body-parser');
const MenuItem = require('./models/MenuItem');
app.use(bodyParser.json());

const  PORT = process.env.PORT || 3001;

//Middleware function 
const logRequest = (req , res , next) => {
console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`);
next(); // move to next phase

} 
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local' , {session : false});


app.get('/', function(req,res){
    res.send('Welcome to my hotel ... How can i help you ??')
})


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person' , localAuthMiddleware,  personRoutes);
app.use('/menu' , menuItemRoutes);



app.listen(PORT , ()=>{
    console.log('Server listening on port 3000')
});


