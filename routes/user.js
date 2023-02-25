const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const { userCart } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart

// router.get('/user', user);

module.exports = router;