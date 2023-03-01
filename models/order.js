const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    products: [
        {
          product: {
            type: ObjectId,
            ref: "Product",
          },
          count: Number,
          color: String,
          price: Number,
        },
      ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Cash On Delivery",
            "Processing",
            "Disapatched",
            "Cancelled",
            "Completed"
        ]
    },
    orderedBy: {type: ObjectId, ref: 'User'},
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);