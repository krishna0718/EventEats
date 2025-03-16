const express = require("express");
const { createMenuItem, getAllMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem } = require("../controllers/menuController");
const { auth, vendorAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", vendorAuth, createMenuItem);
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.put("/:id", vendorAuth, updateMenuItem);
router.delete("/:id", vendorAuth, deleteMenuItem);

module.exports = router;
