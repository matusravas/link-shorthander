const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    _id: String,
    full: {
        protocol: String,
        host: String,
        url: String
    },
    short: {
        protocol: String,
        host: String,
        url: String,
    },
    createdAt: Date,
    path: String
}, { versionKey: false });

LinkSchema.pre('save', function () {
    this.createdAt = new Date;
});

module.exports = mongoose.model('Links', LinkSchema);