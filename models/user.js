var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    userType: [String],
    avatar: String,
    bio: String,
    contacts: Object,
    savedFunction: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "functions"
    }]
})
exports.user = mongoose.model('User', UserSchema)
