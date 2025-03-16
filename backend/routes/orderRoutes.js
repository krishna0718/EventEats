const express = require("express");
const { createOrder, getUserOrders, getVendorOrders, updateOrderStatus } = require("../controllers/orderController");
const { auth, vendorAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getUserOrders);
router.get("/vendor", vendorAuth, getVendorOrders);
router.put("/:id/status", vendorAuth, updateOrderStatus);

module.exports = router;
