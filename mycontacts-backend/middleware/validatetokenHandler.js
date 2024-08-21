require('dotenv').config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
 // Add at the top of your files

const your_secret_key = process.env.YOUR_SECRET_KEY;

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
           
        console.log('Token:', token); // Debugging token value
        console.log('Secret Key:', your_secret_key);

        jwt.verify(token, your_secret_key, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized....");
            }
            req.user = decoded.user;
            console.log(req.user);
            console.log(decoded);
            next();
        });
    } else {
        res.status(401);
        throw new Error("Token not found or invalid");
    }
});

module.exports = { validateToken }; // Export as an object
