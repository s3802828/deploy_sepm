var mongoose = require('mongoose')
var FunctionSchema = new mongoose.Schema({
    name: String,
    description: String,
    params: String,
    example_question: String,
    example_result: String,
    more_detail: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
 })
 exports.function = mongoose.model('Function', FunctionSchema)