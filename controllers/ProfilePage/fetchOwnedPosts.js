// var userModel = require('../../models/user').user
var postModel = require('../../models/post').post

var mongoose = require('mongoose');

exports.fetchOwnedPosts = async (req, res) => {
    // const userID = await userModel.findOne({
    //     _id: req.params.user_id,
    // });
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.user_id)
    if(!isValidId){
        return res.send(undefined)
    }
    postModel.find({
        user_id:  mongoose.Types.ObjectId(req.params.user_id)
    }, function (error, data) {
        if (error) {
            console.log(error)
            return res.send(error)
            
        } else {
            if(data){
                return res.send(data)
            } else {
                return res.send(undefined)
            }
        }
    }).sort('createdAt', -1)
}
