const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async(req, res)=> {
    // later apply coupon
    const {couponApplied} = req.body;
    // later calculate price
    // find user
    const user = await User.findOne({email: req.user.email}).exec();
    // get user cart total
    const {cartTotal, totalAfterDiscount} =await Cart.findOne({orderedBy: user._id}).exec();

    let finalAmount = 0;
    if(couponApplied && totalAfterDiscount){
        finalAmount = totalAfterDiscount;
    } else {
        finalAmount = cartTotal;
    }

    console.log(`CART TOTAL`, cartTotal);
    // create payment intent with order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount * 100,
        currency: "KES",
    });
    

    res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable: finalAmount,
    })
}