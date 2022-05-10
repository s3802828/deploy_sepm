const { default: mongoose } = require('mongoose');
const { userSave } = require('../CheatSheet/user_savedFunctions');

var postsModel = require('../../models/post').post;
var categoryModel = require('../../models/category').category;


exports.fetchPostsForTopic =  (req, res) =>  {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.category_id)
    if(!isValidId){
        return res.send(undefined)
    }
    postsModel.aggregate([
        {$match:{category_id: mongoose.Types.ObjectId(req.params.category_id)}},
        {$lookup: {
            from: "users", // collection name in db
            localField: "user_id",
            foreignField: "_id",
            as: "users"
        }},
        {$project :{
            title: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
            user_id: 1,
            votes: 1,
            category_id: 1,
            images: 1,
            "users._id" :1 ,
            "users.username" :1,
            "users.name" : 1
        }},
        {$sort: {createdAt: -1}}
    ]).exec((error, data) =>{
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    })
}

exports.fetchGeneralPosts = async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.language_id)
    if(!isValidId){
        return res.send(undefined)
    }
    const topics = await categoryModel.find({
        language_id: req.params.language_id,
    }).distinct('_id');
    postsModel.aggregate([
        {$match:{category_id: {$in: topics}}},
        {$lookup: {
            from: "users", // collection name in db
            localField: "user_id",
            foreignField: "_id",
            as: "users"
        }},
        {$project :{
            title: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
            user_id: 1,
            votes: 1,
            category_id: 1,
            images: 1,
            "users._id" :1 ,
            "users.username" :1,
            "users.name" : 1
        }},
        {$sort: {createdAt: -1}}
        
    ]).exec((error, data) =>{
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    })
}

exports.fetchPopularPosts = async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.language_id)
    if(!isValidId){
        return res.send(undefined)
    }
    const topics = await categoryModel.find({
        language_id: req.params.language_id,
    }).distinct('_id');
    postsModel.aggregate([
        {$match:{category_id: {$in: topics}}},
        {$lookup: {
            from: "users", // collection name in db
            localField: "user_id",
            foreignField: "_id",
            as: "users"
        }},
        {$project :{
            title: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
            user_id: 1,
            votes: 1,
            category_id: 1,
            images: 1,
            voteCount: {$size: "$votes"},
            "users._id" :1 ,
            "users.username" :1,
            "users.name" : 1
        }},
        {$sort: {voteCount: -1}}
        
    ]).exec((error, data) =>{
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    })
}