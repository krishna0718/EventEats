const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    restaurantName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vendor", vendorSchema);
