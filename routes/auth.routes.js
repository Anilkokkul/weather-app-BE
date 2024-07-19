const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

//register new User route
router.post("/register", registerUser);

//Login User route
router.post("/login", loginUser);

module.exports = router;
