const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const {SECRET_KEY} = process.env
exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.send({message:'No token provided', isUser: false, isAdmin: false})
    }
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if(error){
            return res.send({message: "Unauthorized", isUser: false, isAdmin: false})
        }
        req.user = decoded;
        next();
    })
}
exports.isAdmin = (req,res,next) => {
    user.findById(req.user.id, function(error, user){
        if(error){
            return res.send(error)
        }
        if (user.userType.includes('admin')){
            next()
        }
        else{
            return res.send({isAdmin: false})
        }
    })
}