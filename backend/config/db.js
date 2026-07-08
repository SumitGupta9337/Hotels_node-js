const mongoose = require('mongoose');

// //define monfodb connection url
const mongoURL = process.env.MONGODB_URL_LOCAL
// const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
    throw new Error("MONGODB_URL_LOCAL is not defined in .env");
}

//setup mongodb connection
mongoose.connect(mongoURL)
.then(()=> console.log("Connected to mongoDB"))
.catch((err)=> console.log(err));

const db = mongoose.connection;

db.on('connected' , () => {
    console.log('✅ Connected to MongoDB');
})

db.on('error' , (err) => {
    console.error('MongoDB error: ',err);
})

db.on('disconnected' , () => {
    console.log('❌ MongoDB disconnected');
})

//exports

module.exports= db;