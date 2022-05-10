const { category } = require('../../models/category');

var languageModel = require('../../models/language').language;
var categoryModel = require('../../models/category').category;
var functionModel = require('../../models/function').function;


exports.fetchAllLanguages = (req, res) => {
    languageModel.find({}, function (error, data) {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    })
}

exports.fetchTopicsForLanguage = async (req, res) => {

    const language = await languageModel.findOne({
        _id: req.params.language_id,
    });

    categoryModel.find({ language_id: language._id }, function (error, data) {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    }).sort({name: 1})

}

exports.fetchFunctionsForTopic = async (req, res) => {

    const language = await languageModel.findOne({
        _id: req.params.language_id,
    });

    const topics = await categoryModel.find({
        language_id: language._id,
    }).distinct('_id');

    // console.log(topics);


    functionModel.find({
        category_id: { "$in" : 
            topics
         }
            
    }, function (error, data) {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            return res.send(data)
        }
    }).sort({name: 1})

}

exports.fetchFunctionDetail = async (req, res) => {
    functionModel.findById(req.params.id, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            res.send(result)
        }
        
    })
}

exports.searchByTopic = async (req, res) => {
    categoryModel.find({language_id: req.params.language_id, name: {"$regex": `${req.params.keyword}`, "$options": "i"}}, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            res.send(result)
        }
    })
}


exports.searchByFunction = async (req, res) => {
    const language = await languageModel.findOne({
        _id: req.params.language_id,
    });

    const topics = await categoryModel.find({
        language_id: language._id,
    }).distinct('_id');

    functionModel.find({category_id: { $in : topics}, name: {"$regex": `${req.params.keyword}`, "$options": "i"}}, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            console.log("helloo")
            res.send(result)
            
        }
    })
}