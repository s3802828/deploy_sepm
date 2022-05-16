var User = require('../../models/user').user
var functionModel = require('../../models/function').function

var mongoose = require('mongoose');

exports.userSave = (req, res) => {
    User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {

        $push: { savedFunction: req.params.id }

    }, function (err, result) {

        if (err) {

            return res.send(err)

        }
        
        return res.send(result)
        
    })

}



exports.userUnSave = async (req, res) => {
    const savedFunctionArray = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) },{

        $pull: { savedFunction: req.params.id }

    }, function (err, result) {

        if (err) {

            return res.send(err)

        }
        if(result){
            return result
        }

    }).clone().catch((error) => console.log(error))
    functionModel.aggregate([
        {$match: {_id: {$in: savedFunctionArray.savedFunction}}},
        {$lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "categories"
        }},
        {$project :{
            name: 1,
            description: 1,
            params: 1,
            example_question: 1,
            example_result: 1,
            more_detail: 1,
            category_id: 1,
            "categories.language_id": 1,
            "categories.name": 1,
        }},
        {$sort: {category_id: 1}},
        {$lookup: {
            from: "languages",
            localField: "categories.language_id",
            foreignField: "_id",
            as: "languages"
        }},
        {$project :{
            name: 1,
            description: 1,
            params: 1,
            example_question: 1,
            example_result: 1,
            more_detail: 1,
            category_id: 1,
            "categories.name": 1,
            "languages.name": 1,
        }},
        { 
            $group : {
                _id: {"language":"$languages.name", "category": "$categories.name"}, 
                topics : {
                    $push: "$$ROOT"
                } 
            }
        },
        {
            $group: {
                _id: "$_id.language",
                topics: {
                    $push:{
                        "category": "$_id.category",
                        "functions": "$topics"
                    }
                }
            }
        }



        
    ]).exec((error, data) =>{
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    })

}