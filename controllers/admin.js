const Order = require("../models/order");

exports.orders = async(req, res)=>{
    let allorders = await Order.find({})
        .sort("-createdAt")
        .populate("products.product")
        .exec();

        res.json(allorders)
}

exports.orderStatus =async(req, res)=> {
    let {orderId, orderStatus} = req.body;
    let updated = await Order.findByIdAndUpdate(orderId, {orderStatus}, {new: true}).exec();

    res.json(updated);
}