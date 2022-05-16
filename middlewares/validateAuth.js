var User = require("../models/user").user
const checkDuplicateUsername = (req, res, next) => {
    User.findOne({ username: req.body.username }, function (error, user) {
        if (error) {
            return res.send(error);
        }
        if (!req.body._id && user || (req.body._id && user && req.body._id != user._id)) {
            return res.send({ message: "Username is already existed." })
        } 
        next();
    })
}
const checkDuplicateEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }, function (error, user) {
        if (error) {
            return res.send(error)
        }
        if (!req.body._id && user || (req.body._id && user && req.body._id != user._id))  {
            return res.send({ message: "Email is already existed." })
        }
        next();
    })
}

module.exports = { checkDuplicateEmail, checkDuplicateUsername}