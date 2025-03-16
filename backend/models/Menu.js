/*const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Boolean, default: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Menu", MenuSchema);
*/


const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true }, // ✅ Category field (e.g., "Appetizers", "Main Course")
    stock: { type: Boolean, default: true },
    imageUrl: { type: String }, // ✅ Optional: Store image URLs for menu items
    restaurantName: { type: String, required: true }, // ✅ Link to restaurant
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true } // ✅ Link to vendor
});

module.exports = mongoose.model("Menu", menuSchema);
