const express = require("express");
const router = express.Router();
const Controller = require("./controller");

// router.get("/", Controller.hello_world);
router.get("/:link", Controller.redirect);
router.post("/shorten", Controller.shorten_url);

module.exports = router;