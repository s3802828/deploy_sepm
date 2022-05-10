var User = require('../../models/user').user;
// var Token = require('../../models/verifyToken').verifyToken;
var bcrypt = require('bcryptjs')
const crypto = require('crypto');
var jwt = require("jsonwebtoken")
var {SECRET_KEY} = process.env
// const sendEmail = require('./sendEmailVerification');
// const {EMAIL_BASE_URL} = process.env

exports.signup = async (req,res) => {
    var user = await new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: ['user']
    }).save()
    let jwtToken = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: 10800
    })
    let authenticatedUser = {
        id: user._id,
        username: user.username,
        accessToken: jwtToken
    }
    return res.send(authenticatedUser)
    // var newToken = {
    //     userId: user._id,
    //     token: crypto.randomBytes(32).toString("hex")
    // }
    // let savedToken = await new Token(newToken).save()
    // const verifyLink = `${EMAIL_BASE_URL}/user/verify/${user._id}/${savedToken.token}`
    // sendEmail.sendEmail(user.email, verifyLink)
    // res.send({message:"Verification email has been sent to you. Please verify your email to continue!"})
}

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, function (error, user) {
        if (error) {
            return res.send(error)
        }
        if (user) {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.send({ message: "Wrong password. Please try again!" })
            } else {
                // if (user.emailVerified) {
                    let jwtToken = jwt.sign({ id: user._id }, SECRET_KEY, {
                        expiresIn: 10800
                    })
                    let authenticatedUser = {
                        id: user._id,
                        username: user.username,
                        accessToken: jwtToken
                    }
                    return res.send(authenticatedUser)
                // } else {
                //     return res.send({
                //         deleteTokenUser: user._id,
                //         message: "Your email has not been verified."
                //     })
                // }
            }
        } else {
            return res.send({ message: "Wrong username. Please try again!" })
        }
    })
}