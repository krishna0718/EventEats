const express = require("express");
const { auth, vendorAuth } = require("../middlewares/authMiddleware.js");
const Vendor = require("../models/Vendor");

const router = express.Router();

// ✅ Get Vendor Profile
router.get("/profile", vendorAuth, async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.user.id);
        if (!vendor) return res.status(404).json({ error: "Vendor not found" });

        res.status(200).json(vendor);
    } catch (error) {
        console.error("❌ Error fetching vendor profile:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
