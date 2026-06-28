const mongoose = require('mongoose');

// //define monfodb connection url
// const mongoURL = process.env.MONGO_DB_URL
const mongoURL = process.env.MONGODB_URL;

//setup mongodb connection
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected' , () => {
    console.log('connect to mongodb server');
})

db.on('error' , (err) => {
    console.log('Connection error: ',err);
})

db.on('disconnected' , () => {
    console.log('disconnect to mongodb server');
})

//exports

module.exports= db;