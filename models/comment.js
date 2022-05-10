const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    post_id : {
        type: mongoose.Types.ObjectId,
        ref: "posts"
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    content: String,
    images: String
}, {timestamps: true});
exports.comment = mongoose.model('Comment', CommentSchema);