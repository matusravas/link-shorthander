const LinkModel = require("./model")
const mongoose = require("mongoose");

exports.get_all = (req, res) => {
    LinkModel.find().exec()
        .then(data => {
            res.status(200).json({
                data: data
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
}

exports.shorten = async (req, res) => {
    const full_link = req.body.url;
    const short_path = new mongoose.mongo.ObjectId();
    let linkToSave = new LinkModel({
        _id: full_link,
        full: {
            protocol: full_link.split('/')[0],
            host: full_link.split('/')[2],
            url: full_link
        },
        short: {
            protocol: req.protocol + ':',
            host: req.get('host'),
            url: req.protocol + '://' + req.get('host') + '/' + short_path
        },
        path: short_path
    });
    linkToSave.save()
        .then(data => res.status(201).json({
            // message: "Link shorthand created",
            link: data.short.url
        }))
        .catch(err => {
            if (err.code === 11000) { //if resource already exists
                findExistingLink(full_link)
                    .then(link => {
                        res.status(200).json({
                            link: link
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: "Could not create shorthand",
                            error: err

                        });
                    });
                return;
            }
        });
}

findExistingLink = (full_link) => {
    return new Promise((resolve, reject) => {
        LinkModel.findOne({ _id: full_link }).select({ short: 1, _id: 0 }).exec()
            .then(data => resolve(data.short.url))
            .catch(err => reject(err));
    });
}
exports.redirect = (req, res) => {
    const path = req.params.link;
    LinkModel.findOne({ path: path }).exec()
        .then(data => res.redirect(data.full.url))
        .catch(err => res.status(400).json({
            error: err
        }))
}