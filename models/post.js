const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "categories"
    },
    title: String,
    content: String,
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: "users"
    }],
    images: String
}, {timestamps: true});
exports.post = mongoose.model('Post', PostSchema);