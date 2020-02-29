const express = require("express");
const router = express.Router();
const Controller = require("./controller");

router.get("/all", Controller.get_all);
router.get("/:link", Controller.redirect);
router.post("/shorten", Controller.shorten);

module.exports = router;