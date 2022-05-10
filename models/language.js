const mongoose = require('mongoose');
const LanguageSchema = new mongoose.Schema({
    name: String
});
exports.language = mongoose.model('Language', LanguageSchema);