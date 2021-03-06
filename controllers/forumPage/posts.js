var mongoose = require('mongoose');
var postModel = require('../../models/post').post;
var commentModel = require('../../models/comment').comment;
var categoryModel = require('../../models/category').category;

var { uploadFile, deleteFile } = require('../s3')

var mongoose = require('mongoose');
const bucketName = "csfunctions-web-app/postUploads"

exports.addPost = function (req, res) {
    if (req.file) {
        const file = req.file;
        postModel.create({
            user_id: mongoose.Types.ObjectId(req.body.user_id),
            category_id: mongoose.Types.ObjectId(req.body.category_id),
            title: req.body.title,
            content: req.body.content,
            images: 'postUploads/' + req.file.filename + '.' + req.file.mimetype.split('/')[1],

        }, async function (err, result) {

            if (err) {
                console.log(err)
            }
            const s3Res = await uploadFile(file, bucketName);
            res.send(result)
        })
    } else {
        postModel.create({
            user_id: mongoose.Types.ObjectId(req.body.user_id),
            category_id: mongoose.Types.ObjectId(req.body.category_id),
            title: req.body.title,
            content: req.body.content,

        }, async function (err, result) {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    }


}

exports.updatePost = function (req, res) {

    if (req.file) {
        const file = req.file;

        //Get the file of current image
        postModel.findOne({ _id: req.body._id }, function (error, result) {

            if (result) {
                if (result.images) {
                    //Remove current image from storage 
                    deleteFile(result.images, bucketName);
                }
                postModel.findByIdAndUpdate({
                    _id: req.body._id
                }, {
                    category_id: mongoose.Types.ObjectId(req.body.category_id),
                    title: req.body.title,
                    content: req.body.content,
                    images: 'postUploads/' + req.file.filename + '.' + req.file.mimetype.split('/')[1],

                }, async function (err, result) {

                    if (err) {
                        console.log(err)
                    }
                    const s3Res = await uploadFile(file, bucketName);
                    res.send(result)
                })


            } else console.log(error);
        })
    } else {
        postModel.findByIdAndUpdate({
            _id: req.body._id
        }, {
            category_id: mongoose.Types.ObjectId(req.body.category_id),
            title: req.body.title,
            content: req.body.content,
        }, function (err, result) {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    }


}

exports.deletePost = function (req, res) {
    postModel.findOneAndDelete({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, function (err, result) {
        if (err) {
            console.log(err)
        }

        if (result.images) {
            deleteFile(result.images, bucketName)
        }

        res.send(result)
    })
}

exports.fetchPostDetail = async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if(!isValidId){
        return res.send(undefined)
    }
    postModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "categories"
            }
        },
        {
            $project: {
                user_id: 1,
                category_id: 1,
                title: 1,
                content: 1,
                votes: 1,
                images: 1,
                createdAt: 1,
                updatedAt: 1,
                "categories.language_id": 1,
                "categories.name": 1,
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "categories.language_id",
                foreignField: "_id",
                as: "languages"
            }
        },
        {
            $project: {
                user_id: 1,
                category_id: 1,
                title: 1,
                content: 1,
                votes: 1,
                images: 1,
                createdAt: 1,
                updatedAt: 1,
                "languages._id": 1,
                "categories.name": 1,
                "languages.name": 1,
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "users"
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                user_id: 1,
                votes: 1,
                category_id: 1,
                images: 1,
                voteCount: { $size: "$votes" },
                "languages._id": 1,
                "categories.name": 1,
                "languages.name": 1,
                "users._id": 1,
                "users.username": 1,
                "users.name": 1,
                "users.avatar": 1
            }
        },
        { $sort: { createdAt: -1 } }

    ]).exec((error, data) => {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            if(data.toString() != ''){
                return res.send(data)
            } else {
                return res.send(undefined)
            }
            
        }
    })
}

exports.fetchCommentForPost = async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.post_id)
    if(!isValidId){
        return res.send(undefined)
    }
    commentModel.aggregate([
        { $match: { post_id: mongoose.Types.ObjectId(req.params.post_id) } },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "users"
            }
        },
        {
            $project: {
                user_id: 1,
                post_id: 1,
                content: 1,
                images: 1,
                createdAt: 1,
                updatedAt: 1,
                "users.name": 1,
                "users.username": 1,
                "users.avatar": 1
            }
        },
        { $sort: { createdAt: -1 } }

    ]).exec((error, data) => {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    })
    // .sort({ 'createdAt': 'desc' })
}

exports.likePost = (req, res) => {
    postModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {

        $push: { votes: req.params.id }

    }, function (err, result) {

        if (err) {

            return res.send(err)

        }
        return res.send(result)

    })
}

exports.dislikePost = (req, res) => {
    postModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {

        $pull: { votes: req.params.id }

    }, function (err, result) {

        if (err) {

            return res.send(err)

        }
        return res.send(result)

    })
}
exports.searchPostInTopic = (req, res) => {
    postModel.find({ category_id: req.params.cate_id, $or: [{ title: { "$regex": `${req.params.keyword}`, "$options": "i" } }, { content: { "$regex": `${req.params.keyword}`, "$options": "i" } }] }, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            if (result) {
                return res.send(result)
            }
        }
    })
}

exports.searchPostInLanguage = async (req, res) => {
    const topics = await categoryModel.find({
        language_id: req.params.language_id,
    }).distinct('_id');
    postModel.find({ category_id: { "$in": topics }, $or: [{ title: { "$regex": `${req.params.keyword}`, "$options": "i" } }, { content: { "$regex": `${req.params.keyword}`, "$options": "i" } }] }, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            if (result) {
                return res.send(result)
            }
        }
    })

}

