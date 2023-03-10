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
         orders,
         addToWishlist,
         wishlist,
         removeFromWishlist,
         createCashOrder
        } = require("../controllers/user"); 

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyUserCart); // empty cart
router.post("/user/address", authCheck, saveAddress); //save address to db

// coupon route

router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

router.post('/user/order', authCheck, createOrder); // stripe payment
router.post('/user/cash-order', authCheck, createCashOrder) //cash on delivery
router.get("/user/orders", authCheck, orders)

// router.get('/user', user);

// wishlist add/remove
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;