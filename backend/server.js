require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const vendorRoutes = require("./routes/vendorRoutes.js")

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vendors", vendorRoutes)

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

global.io = io; // Store WebSocket instance globally

io.on("connection", (socket) => {
    console.log("🟢 A user connected:", socket.id);

    // ✅ Handle Vendor Joining Their WebSocket Room
    socket.on("joinVendorRoom", (vendorId) => {
        socket.join(`vendor_${vendorId}`);
        console.log(`✅ Vendor ${vendorId} joined WebSocket room.`);
    });

    // ✅ Handle Order Updates (Notify User)
    socket.on("updateOrderStatus", ({ orderId, userId, status }) => {
        io.to(`user_${userId}`).emit("orderUpdate", { orderId, status });
        console.log(`📡 Order ${orderId} updated to ${status} (Notified User ${userId})`);
    });

    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
