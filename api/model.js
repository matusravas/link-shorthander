const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    _id: Schema.Types.ObjectId,
    full_link: {
        protocol: String,
        host: String,
        url: String
    },
    short_link: {
        protocol: String,
        host: String,
        url: String,
        path: String
    }
}, { versionKey: false });

module.exports = mongoose.model('Links', LinkSchema);