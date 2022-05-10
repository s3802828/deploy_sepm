var userModel = require('../../models/user').user;
var { uploadFile, deleteFile } = require('../s3')

var mongoose = require('mongoose');
const bucketName = "csfunctions-web-app/userUploads"

exports.updateAvatar = function (req, res) {

    // console.log(req.body);
    console.log(req.file);

    if (req.file) {
        const file = req.file;

        userModel.findOne({ _id: mongoose.Types.ObjectId(req.params) }, async function (error, result) {

            console.log("User")
            if (result) {

                if (result.avatar) {
                    //Remove current image from storage 
                    deleteFile(result.avatar, bucketName);

                }

                //Replacing with new image
                const updateResult = await userModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params) }, {
                    avatar: 'userUploads/' + req.file.filename + '.' + req.file.mimetype.split('/')[1]

                })

                const s3Res = await uploadFile(file, bucketName);


                if (updateResult && s3Res) { 
                    userModel.findOne({
                        _id: mongoose.Types.ObjectId(req.params.user_id)
                    }, ['-password'], function (error, data) {
                        if (error) {
                            console.log(error)
                            return res.send([])
                        } else {
                            return res.send(data)
                        }
                    })
                }



            } else {
                console.log(error)
            }
        })

    }

}

exports.fetchUser = (req, res) => {
    userModel.findOne({
        _id: mongoose.Types.ObjectId(req.params.user_id)
    }, ['-password'], function (error, data) {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    })
}

exports.updatePersonalInfo = function (req, res) {
    userModel.findByIdAndUpdate({
        _id: req.body._id
    }, {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio,
        contacts: req.body.contacts,
    }, function (err, result) {

        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
}