var mongoose = require('mongoose');
var commentModel = require('../models/comment').comment;
var { deleteMultipleFiles } = require('../controllers/s3')

exports.removeCommentsFromPost = async (req, res, next) => {

    const comments = await commentModel.find({
        post_id: {
            "$in":
                mongoose.Types.ObjectId(req.params.id)
        }
    })

    const bucketParams = {
        Bucket: "csfunctions-web-app",
        Delete: {
            Objects: []
        }
    };

    comments.forEach(element => {
        if (element.images) {
            bucketParams.Delete.Objects.push({ Key: "commentUploads/" + element.images.split('/')[1] });
        }
    });

    commentModel.deleteMany({ post_id: {
        "$in":
            mongoose.Types.ObjectId(req.params.id)
    } }, async function (error, data) {
        if (error) {
            console.log(error)
        } else {
            const s3Res = await deleteMultipleFiles(bucketParams);
            console.log(data)
            console.log(s3Res)
        }
        next();
    })

}