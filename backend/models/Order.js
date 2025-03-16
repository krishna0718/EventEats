const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"], default: "Pending" },
    paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
