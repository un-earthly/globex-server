const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    productId: {
        ref: 'products',
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const orderSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        items: [orderItemSchema], // Array of order items
        shippingAddress: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            zipCode: {
                type: String,
                required: true,
            },
        },
        paymentMethod: {
            type: String,
            required: true,
        }, status: {
            type: String,
            default: 'processing',
        },
    },
    {
        timestamps: true,
    },
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
