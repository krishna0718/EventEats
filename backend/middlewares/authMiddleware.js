const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor"); 
const User = require("../models/User"); 

const auth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Unauthorized, No Token Provided" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

// ✅ Middleware to verify if the user is a vendor
/*const vendorAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== "vendor") {
            return res.status(403).json({ error: "Access Denied. Vendors Only!" });
        }
        next();
    });
};*/


const vendorAuth = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        console.log("❌ No Token Provided");
        return res.status(401).json({ error: "Unauthorized, No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        console.log("🔑 Decoded Token:", decoded);

        const vendor = await Vendor.findById(decoded.id);
        if (!vendor) {
            console.log("❌ Vendor Not Found");
            return res.status(403).json({ error: "Access Denied. Not a Vendor." });
        }

        req.user = decoded;
        console.log("✅ Vendor Authenticated:", vendor.email);
        next();
    } catch (error) {
        console.log("❌ Token Verification Failed:", error.message);
        res.status(401).json({ error: "Invalid Token" });
    }
};


module.exports = { auth, vendorAuth };
