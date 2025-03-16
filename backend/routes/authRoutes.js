const express = require("express");
const { register, login, getUser } = require("../controllers/authController"); // ✅ Fix import
const { auth } = require("../middlewares/authMiddleware"); // ✅ Fix import

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getUser); // ✅ Ensure `auth` and `getUser` are defined

module.exports = router;
