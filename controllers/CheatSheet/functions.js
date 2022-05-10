var mongoose = require('mongoose');
var functionModel = require('../../models/function').function;

exports.addFunction = function (req, res) {
    functionModel.create({
        name: req.body.name,
        params: req.body.params,
        description: req.body.description,
        example_question: req.body.example_question,
        example_result: req.body.example_result,
        more_detail: req.body.more_detail,
        category_id: mongoose.Types.ObjectId(req.body.category_id)
    }, function (err, result) {

        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })

}

exports.updateFunction = function (req, res) {
    functionModel.findByIdAndUpdate({
        _id : mongoose.Types.ObjectId(req.body._id)
    }, {
        name: req.body.name,
        params: req.body.params,
        description: req.body.description,
        example_question: req.body.example_question,
        example_result: req.body.example_result,
        more_detail: req.body.more_detail,
        category_id: mongoose.Types.ObjectId(req.body.category_id)
    }, function (err, result) {

        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
}

exports.deleteFunction = function (req, res) {
    functionModel.findOneAndDelete({
        _id : mongoose.Types.ObjectId(req.params)
    }, function (err, result) {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
}