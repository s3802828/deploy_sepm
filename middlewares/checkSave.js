var User = require('../models/user').user
var Post = require('../models/user').post

var mongoose = require('mongoose');

exports.checkSave = (req, res, next) => {
  User.findOne({_id: mongoose.Types.ObjectId(req.body._id)}, function(error, user){
    if(error){
        return res.send(error);
    }
    if(user){
        let savedFunctionsArray = []
        savedFunctionsArray = user.savedFunction
        for(index = 0; index < savedFunctionsArray.length; index++) {
          if(savedFunctionsArray[index] == req.params.id) {
            return res.send("Already saved this function")
          }
        }       
    }
    next()
    
  })
}

exports.checkUnsave = (req, res, next) => {
  User.findOne({_id: mongoose.Types.ObjectId(req.body._id)}, function(error, user){
    if(error){
        return res.send(error);
    }
    if(user){
        let savedFunctionsArray = []
        let count = 0
        savedFunctionsArray = user.savedFunction
        for(index = 0; index < savedFunctionsArray.length; index++) {
          if(savedFunctionsArray[index] == req.params.id) {
            count = count + 1
          }
        }  
        if (count == 0) {
          return res.send("You have not saved this function")
        }
             
    }
    next()
    
  })
}

exports.checkLike = (req, res, next) => {
  Post.findOne({_id: mongoose.Types.ObjectId(req.body._id)}, function(error, data){
    if(error){
      return res.send(error)
    }
    if(data){
      if(data.votes.includes(req.params.id)){
        return res.send("Already liked this post")
      } else {
        next()
      }
    }
  })
}

exports.checkDislike = (req, res, next) => {
  Post.findOne({_id: mongoose.Types.ObjectId(req.body._id)}, function(error, data){
    if(error){
      return res.send(error)
    }
    if(data){
      if(!data.votes.includes(req.params.id)){
        return res.send("Haven't liked this post")
      } else {
        next()
      }
    }
  })
}