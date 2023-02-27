const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const { 
         userCart, 
         getUserCart, 
         emptyUserCart,  
         saveAddress,
         applyCouponToUserCart,
         createOrder,
         orders
        } = require("../controllers/user"); 

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyUserCart); // empty cart
router.post("/user/address", authCheck, saveAddress); //save address to db

// coupon route

router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

router.post('/user/order', authCheck, createOrder);
router.get("/user/orders", authCheck, orders)

// router.get('/user', user);

module.exports = router;