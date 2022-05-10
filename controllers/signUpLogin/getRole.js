var User = require('../../models/user').user;
exports.userAccess = (req, res) => {
    User.findById({_id: req.user.id},['-password'], function (error, data){
        if(error){
            console.log(error)
        }
        res.send({isUser: true, userInfo: data})
    })
}
exports.adminAccess = (req, res) => {
    User.findById({_id: req.user.id}, ['-password'], function (error, data){
        if(error){
            console.log(error)
        }
        res.send({isAdmin: true, userInfo: data})
    })
}