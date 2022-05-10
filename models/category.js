const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: String,
    language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languages'
    }
});
exports.category = mongoose.model('Category', CategorySchema);