const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const { userCart, getUserCart, emptyUserCart,  saveAddress} = require("../controllers/user"); 

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyUserCart); // empty cart
router.post("/user/address", authCheck, saveAddress); //save address to db

// router.get('/user', user);

module.exports = router;