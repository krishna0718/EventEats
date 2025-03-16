const Menu = require("../models/Menu");
const Vendor = require("../models/Vendor");

// ✅ Create a Menu Item (Vendor Only)
const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;
        const vendorId = req.user.id;

        // ✅ Fetch vendor details to get `restaurantName`
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(403).json({ error: "Access Denied. Not a Vendor." });
        }

        console.log("📡 Creating menu item for restaurant:", vendor.restaurantName);

        const newMenuItem = new Menu({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
            restaurantName: vendor.restaurantName, // ✅ Automatically assign vendor's restaurant name
            vendorId
        });

        await newMenuItem.save();
        res.status(201).json({ message: "Menu item added successfully", menuItem: newMenuItem });
    } catch (error) {
        console.error("❌ Error creating menu item:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// ✅ Get All Menu Items (User & Vendor)
/*const getAllMenuItems = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};*/
const getAllMenuItems = async (req, res) => {
    try {
        const menu = await Menu.find();

        // ✅ Group menu items by restaurant and category
        const organizedMenu = menu.reduce((acc, item) => {
            if (!acc[item.restaurantName]) {
                acc[item.restaurantName] = {};
            }
            if (!acc[item.restaurantName][item.category]) {
                acc[item.restaurantName][item.category] = [];
            }
            acc[item.restaurantName][item.category].push(item);
            return acc;
        }, {});

        res.status(200).json(organizedMenu);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};




// ✅ Get Menu Item by ID
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ error: "Menu item not found" });

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// ✅ Update Menu Item (Vendor Only)
const updateMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const menuItem = await Menu.findById(req.params.id);

        if (!menuItem) return res.status(404).json({ error: "Menu item not found" });
        if (menuItem.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.category = category || menuItem.category;
        menuItem.stock = stock !== undefined ? stock : menuItem.stock;

        await menuItem.save();
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// ✅ Delete Menu Item (Vendor Only)
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ error: "Menu item not found" });

        if (menuItem.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await menuItem.deleteOne();
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// ✅ Ensure all functions are exported properly
module.exports = {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};
