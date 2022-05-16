const { default: mongoose } = require('mongoose');
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
            if (data) {
                return res.send(data)
            }

        }
    })
}

exports.fetchTopicsForLanguage = async (req, res) => {
    const isValidId = mongoose.isValidObjectId(req.params.language_id)
    if(!isValidId){
        return res.send(undefined)
    } 
    // const ObjectId = mongoose.Types.ObjectId
    // const newId = new ObjectId(req.params.language_id)
    // else {
    
    categoryModel.find({ language_id:  req.params.language_id}, function (error, data) {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            if (data) {
                return res.send(data)
            } else {
                return res.send(undefined)
            }

        }
    }).sort({ name: 1 })
    // }

}

exports.fetchFunctionsForTopic = async (req, res) => {
    const isValidId = mongoose.isValidObjectId(req.params.language_id)
    if(!isValidId){
        return res.send(undefined)
    } 

    const language = await languageModel.findOne({
        _id: req.params.language_id,
    });

    const topics = await categoryModel.find({
        language_id: language._id,
    }).distinct('_id');


    functionModel.find({
        category_id: {
            "$in":
                topics
        }

    }, function (error, data) {
        if (error) {
            console.log(error)
            return res.send([])
        } else {
            if (data) {
                return res.send(data)
            } else {
                return res.send(undefined)
            }
        }
    }).sort({ name: 1 })

}

exports.fetchFunctionDetail = async (req, res) => {
    functionModel.findById(req.params.id, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            if (result) {
                res.send(result)
            }

        }

    })
}

exports.searchByTopic = async (req, res) => {
    categoryModel.find({ language_id: req.params.language_id, name: { "$regex": `${req.params.keyword}`, "$options": "i" } }, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            if (result) {
                res.send(result)
            }

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

    functionModel.find({ category_id: { $in: topics }, name: { "$regex": `${req.params.keyword}`, "$options": "i" } }, function (error, result) {
        if (error) {
            return res.send(error)
        } else {
            if (result) {
                res.send(result)
            }
        }
    })
}