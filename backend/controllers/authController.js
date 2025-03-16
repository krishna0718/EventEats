const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Vendor = require("../models/Vendor.js")

/*const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};*/
/*logic 2
const register = async (req, res) => {
    try {
        const { name, email, password, role, restaurantName, phone, address } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        const existingVendor = await Vendor.findOne({ email });
        if (existingUser || existingVendor) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (role === "vendor") {
            newUser = new Vendor({ name, email, password: hashedPassword, restaurantName, phone, address });
        } else {
            newUser = new User({ name, email, password: hashedPassword, role: "user" });
        }

        await newUser.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: "Server Error" });
    }
};*/




const register = async (req, res) => {
    try {
        const { name, email, password, role, restaurantName } = req.body;

        // ✅ Validate required fields for vendors
        if (role === "vendor" && !restaurantName) {
            return res.status(400).json({ error: "Restaurant Name is required for vendors." });
        }

        const existingUser = await User.findOne({ email });
        const existingVendor = await Vendor.findOne({ email });
        if (existingUser || existingVendor) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (role === "vendor") {
            newUser = new Vendor({ name, email, password: hashedPassword, restaurantName });
        } else {
            newUser = new User({ name, email, password: hashedPassword, role: "user" });
        }

        await newUser.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

/*Logic 1
const login = async (req, res) => {
    try {
        console.log(" Login Request Received");

        const { email, password } = req.body;
        console.log(" Email:", email);
        console.log(" Password:", password ? "Provided" : "Not Provided");

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user in database
        const user = await User.findOne({ email });
        console.log(" User Found:", user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        console.log(" Generating JWT Token...");
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log(" Login Successful!");
        res.status(200).json({ token, role: user.role });

    } catch (error) {
        console.error(" Login Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};*/

/*Logic 2
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, role: user.role, user });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};*/


/*logic 3
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check in both users and vendors collections
        let user = await User.findOne({ email });
        let isVendor = false;
        if (!user) {
            user = await Vendor.findOne({ email });
            isVendor = !!user;
        }

        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: isVendor ? "vendor" : "user" }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, role: isVendor ? "vendor" : "user", user });
    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ error: "Server Error" });
    }
}; */





const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        let isVendor = false;

        if (!user) {
            user = await Vendor.findOne({ email });
            isVendor = !!user;
        }

        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // ✅ Store correct vendor ID in token
        const token = jwt.sign({ id: user._id, role: isVendor ? "vendor" : "user" }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, role: isVendor ? "vendor" : "user", user });
    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ error: "Server Error" });
    }
};





const getUser = async (req, res) => {
    try {
        console.log(" Fetching user with ID:", req.user.id);
        
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(" Error fetching user:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.getVendorOrders = async (req, res) => {
    try {
        console.log(`Fetching orders for vendor: ${req.user.id}`);

        const vendor = await Vendor.findById(req.user.id);
        if (!vendor) return res.status(403).json({ error: "Access Denied. Not a Vendor." });

        const orders = await Order.find({ vendorId: req.user.id });

        console.log("Orders found:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching vendor orders:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = {
    register,
    login,
    getUser
}