const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req , res , next) => {
    //check request headers and authorization or not 
    const authHeaders = req.headers.authorization
    if(!authHeaders.startsWith("Bearer ")) 
        return res.status(401).json({
        error: "Invalid Authorization Header"
    });

    //extract the jwt token from request header
    const token = authHeaders.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }

    try{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing");
        }
        //verify the JWT Token
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        // Attach user information to the request object 
        req.user = decoded
        next();

    }catch(err){
        console.error(err.message);
        return res.status(401).json({error: 'Invalid Token'})
    }
}

const generateToken = (userData) => {
    //Generate a new jwt token using user data 
    return jwt.sign(userData , process.env.JWT_SECRET ,({expiresIn: '1h'}));
}

module.exports = {jwtAuthMiddleware , generateToken};