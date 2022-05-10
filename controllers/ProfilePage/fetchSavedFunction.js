var userModel = require('../../models/user').user
var functionModel = require('../../models/function').function
var languageModel = require('../../models/language').language;
var categoryModel = require('../../models/category').category;
var mongoose = require('mongoose');

// exports.fetchSavedFunction = async (req, res) => {
//     const savedFunctionArray = await userModel.find({
//         _id: req.params.user_id,
//     }).distinct('savedFunction')
//     functionModel.find({
//         function_id: { "$in" : 
//         savedFunctionArray
//     }
//     }, function (error, data) {
//         if (error) {
//             console.log(error)
//             return res.send([])
//         } else {
//             return res.send(data)
//         }
//     }).sort({name: 1})
// }
exports.fetchSavedFunction = async (req, res) => {
    const savedFunctionArray = await userModel.find({
        _id: mongoose.Types.ObjectId(req.params.user_id),
    }).distinct('savedFunction')
    functionModel.aggregate([
        {$match: {_id: {$in: savedFunctionArray}}},
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
                //     {
                //     $group : {
                //         _id: "categories.name",
                //         functions : {
                //             $push: "$name"
                //         }
                // }
                // }
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