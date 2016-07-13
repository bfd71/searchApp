var express = require("express");
var router = express.Router();
// var User = require("../models/User.model");
var controller = require("../controllers/user.controller");  // replaces var User line above

// points to register and login methods in user.controller.js
router.post("/register", controller.register);
router.post("/login", controller.login);

// Define routes here

module.exports = router;