const LinkModel = require("./model")
const mongoose = require("mongoose");

exports.hello_world = (req, res) => {
    res.json({
        message: `Hello world from ${req.get('host')}`,
    });
}

exports.shorten_url = (req, res) => {
    const full_url = req.body.url;
    const id = new mongoose.mongo.ObjectId();
    let link = new LinkModel({
        _id: id,
        full_link: {
            protocol: full_url.split('/')[0],
            host: full_url.split('/')[2],
            url: full_url
        },
        short_link: {
            protocol: req.protocol + ':',
            host: req.get('host'),
            url: req.protocol + '://' + req.get('host') + '/' + id,
            // path: id
        }
    });
    link.save()
        .then(data => res.status(201).json({
            message: "Link shorthand created",
            link: data.short_link.url
        }))
        .catch(err => res.status(400).json({
            message: "Could not create shorthand",
            error: err
        }));
}

exports.redirect = (req, res) => {
    const path = req.params.link;
    console.log(path)
    LinkModel.findOne({ _id: path }).exec()
        .then(data => res.redirect(data.full_link.url))
        .catch(err => res.status(400).json({
            message: "This url shorthand has not been created yet",
            error: err
        }));
}