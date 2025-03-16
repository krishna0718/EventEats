const mongoose = require("mongoose");
const Order = require("../models/Order");
const Menu = require("../models/Menu")

// ✅ Place an Order (User)
/*exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must contain items" });
        }

        let orders = {};
        
        // Group items by vendor
        for (let item of items) {
            const menuItem = await Menu.findById(new mongoose.Types.ObjectId(item.menuItemId)); // ✅ Fix: Convert to ObjectId

            if (!menuItem) {
                return res.status(404).json({ error: `Item ${item.menuItemId} not found` });
            }

            const vendorId = menuItem.vendorId.toString();

            if (!orders[vendorId]) {
                orders[vendorId] = { vendorId, items: [], totalPrice: 0 };
            }

            orders[vendorId].items.push({
                menuItemId: menuItem._id, // ✅ Store ObjectId instead of string
                name: menuItem.name,
                price: menuItem.price,
                quantity: item.quantity
            });

            orders[vendorId].totalPrice += menuItem.price * item.quantity;
        }

        // Create separate orders for each vendor
        let createdOrders = [];
        for (let vendorId in orders) {
            const newOrder = new Order({
                userId,
                vendorId,
                items: orders[vendorId].items,
                totalPrice: orders[vendorId].totalPrice
            });

            await newOrder.save();
            createdOrders.push(newOrder);
        }

        res.status(201).json({ message: "Order placed successfully", orders: createdOrders });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Server Error" });
    }
};  */

/*exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must contain items" });
        }

        let orders = {};

        // Group items by vendor
        for (let item of items) {
            const menuItem = await Menu.findById(new mongoose.Types.ObjectId(item.menuItemId));

            if (!menuItem) {
                return res.status(404).json({ error: `Item ${item.menuItemId} not found` });
            }

            const vendorId = menuItem.vendorId.toString();

            if (!orders[vendorId]) {
                orders[vendorId] = { vendorId, items: [], totalPrice: 0 };
            }

            orders[vendorId].items.push({
                menuItemId: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: item.quantity
            });

            orders[vendorId].totalPrice += menuItem.price * item.quantity;
        }

        // Create separate orders for each vendor
        let createdOrders = [];
        for (let vendorId in orders) {
            const newOrder = new Order({
                userId,
                vendorId,
                items: orders[vendorId].items,
                totalPrice: orders[vendorId].totalPrice
            });

            await newOrder.save();
            createdOrders.push(newOrder);

            // ✅ Emit WebSocket event for vendor real-time updates
            global.io.emit(`newOrder:${vendorId}`, newOrder);
        }

        res.status(201).json({ message: "Order placed successfully", orders: createdOrders });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
*/
/*Logic 3
exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must contain items" });
        }

        let createdOrders = [];

        for (let item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ error: `Item ${item.menuItemId} not found` });
            }

            const vendorId = menuItem.vendorId.toString();

            const newOrder = new Order({
                userId,
                vendorId,
                items: [item],
                totalPrice: item.price * item.quantity
            });

            await newOrder.save();
            createdOrders.push(newOrder);

            // ✅ Emit WebSocket event & log it
            global.io.to(`vendor_${vendorId}`).emit("newOrder", newOrder);
            console.log(`📡 WebSocket Event: newOrder sent to vendor ${vendorId}`);
        }

        res.status(201).json({ message: "Order placed successfully", orders: createdOrders });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Server Error" });
    }
};*/


/*logic 4
exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must contain items" });
        }

        let createdOrders = [];

        for (let item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ error: `Item ${item.menuItemId} not found` });
            }

            const vendorId = menuItem.vendorId.toString();

            const newOrder = new Order({
                userId,
                vendorId,
                items: [item],
                totalPrice: item.price * item.quantity,
                status: "Pending"
            });

            await newOrder.save();
            createdOrders.push(newOrder);

            // ✅ Emit WebSocket event for real-time order updates
            global.io.to(`vendor_${vendorId}`).emit("newOrder", newOrder);
        }

        res.status(201).json({ message: "Order placed successfully", orders: createdOrders });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Server Error" });
    }
};*/






/*exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must contain items" });
        }

        let createdOrders = [];

        for (let item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ error: `Item ${item.menuItemId} not found` });
            }

            const vendorId = menuItem.vendorId.toString();
            console.log(`📡 Assigning Order to Vendor: ${vendorId}`);

            const newOrder = new Order({
                userId,
                vendorId,
                items: [item],
                totalPrice: item.price * item.quantity,
                status: "Pending"
            });

            await newOrder.save();
            createdOrders.push(newOrder);

            // ✅ Emit WebSocket event for real-time order updates
            global.io.to(`vendor_${vendorId}`).emit("newOrder", newOrder);
        }

        res.status(201).json({ message: "Order placed successfully", orders: createdOrders });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
*/


/*exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must contain items" });
        }

        let createdOrders = {};

        // ✅ Group items by restaurant
        for (let item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ error: `Item ${item.menuItemId} not found` });
            }

            const vendorId = menuItem.vendorId.toString();
            const restaurantName = menuItem.restaurantName;

            if (!createdOrders[vendorId]) {
                createdOrders[vendorId] = { vendorId, restaurantName, items: [], totalPrice: 0 };
            }

            createdOrders[vendorId].items.push({
                menuItemId: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: item.quantity
            });

            createdOrders[vendorId].totalPrice += menuItem.price * item.quantity;
        }

        // ✅ Create separate orders for each restaurant
        let finalOrders = [];
        for (let vendorId in createdOrders) {
            const newOrder = new Order({
                userId,
                vendorId,
                restaurantName: createdOrders[vendorId].restaurantName,
                items: createdOrders[vendorId].items,
                totalPrice: createdOrders[vendorId].totalPrice,
                status: "Pending"
            });

            await newOrder.save();
            finalOrders.push(newOrder);

            // ✅ Emit WebSocket event for real-time order updates
            global.io.to(`vendor_${vendorId}`).emit("newOrder", newOrder);
        }

        res.status(201).json({ message: "Order placed successfully", orders: finalOrders });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Server Error" });
    }
};*/



exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Order must contain items" });
        }

        let createdOrders = {};

        // ✅ Group items by restaurant (vendor)
        for (let item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                console.log(`❌ Menu Item Not Found: ${item.menuItemId}`);
                return res.status(404).json({ error: `Item ${item.menuItemId} not found` });
            }

            const vendorId = menuItem.vendorId.toString();
            const restaurantName = menuItem.restaurantName || "Unknown Restaurant";

            console.log(`📌 Processing Order: ${menuItem.name} from ${restaurantName}`);

            if (!createdOrders[vendorId]) {
                createdOrders[vendorId] = { vendorId, restaurantName, items: [], totalPrice: 0 };
            }

            createdOrders[vendorId].items.push({
                menuItemId: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: item.quantity
            });

            createdOrders[vendorId].totalPrice += menuItem.price * item.quantity;
        }

        // ✅ Create separate orders for each restaurant
        let finalOrders = [];
        for (let vendorId in createdOrders) {
            const newOrder = new Order({
                userId,
                vendorId,
                restaurantName: createdOrders[vendorId].restaurantName,
                items: createdOrders[vendorId].items,
                totalPrice: createdOrders[vendorId].totalPrice,
                status: "Pending"
            });

            await newOrder.save();
            finalOrders.push(newOrder);

            // ✅ Emit WebSocket event for vendor dashboard
            console.log(`📩 Sending Order to Vendor: ${vendorId}`);
            global.io.to(`vendor_${vendorId}`).emit("newOrder", newOrder);
        }

        res.status(201).json({ message: "Order placed successfully", orders: finalOrders });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ error: "Server Error" });
    }
};



// ✅ Get User's Orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

/*// ✅ Get Vendor's Orders
exports.getVendorOrders = async (req, res) => {
    try {
        const orders = await Order.find({ vendorId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};*/


/*exports.getVendorOrders = async (req, res) => {
    try {
        console.log(`📡 Fetching orders for vendor: ${req.user.id}`);

        // ✅ Ensure `vendorId` is an ObjectId
        const vendorObjectId = new mongoose.Types.ObjectId(req.user.id);
        const orders = await Order.find({ vendorId: vendorObjectId });

        console.log("📡 Orders found:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching vendor orders:", error);
        res.status(500).json({ error: "Server Error" });
    }
};*/

// ✅ Update Order Status (Vendor Only)


exports.getVendorOrders = async (req, res) => {
    try {
        console.log(`📡 Fetching orders for vendor: ${req.user.id}`);

        const vendor = await Vendor.findById(req.user.id);
        if (!vendor) return res.status(403).json({ error: "Access Denied. Not a Vendor." });

        // ✅ Fetch only orders that match vendor's restaurant name
        const orders = await Order.find({ restaurantName: vendor.restaurantName });

        console.log("📡 Orders found:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching vendor orders:", error);
        res.status(500).json({ error: "Server Error" });
    }
};






/*Logic 1
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ error: "Order not found" });
        if (order.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        order.status = status;
        await order.save();

        // Emit WebSocket event for real-time update
        global.io.emit(`orderUpdate:${order.userId}`, { orderId: order._id, status });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

*/


exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ error: "Order not found" });
        if (order.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        order.status = status;
        await order.save();

        // ✅ Emit WebSocket event to notify users
        global.io.to(`user_${order.userId}`).emit("orderUpdate", { orderId: order._id, status });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
