import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import { toast } from "react-toastify";

const VendorDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [vendorInfo, setVendorInfo] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const vendorId = useSelector((state) => state.auth.user?._id);

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/vendors/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVendorInfo(response.data);
            } catch (error) {
                console.error("Error fetching vendor profile:", error);
            }
        };

        const fetchVendorOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/orders/vendor", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data);
                setFilteredOrders(response.data);
            } catch (error) {
                console.error("Error fetching vendor orders:", error);
            }
        };

        fetchVendorDetails();
        fetchVendorOrders();

        // ✅ Join vendor WebSocket room
        socket.emit("joinVendorRoom", vendorId);

        socket.on("newOrder", (newOrder) => {
            setOrders((prevOrders) => [...prevOrders, newOrder]);
            setFilteredOrders((prevOrders) => [...prevOrders, newOrder]);
            toast.info(`New Order Received: ${newOrder._id}`);
        });

        return () => {
            socket.off("newOrder");
        };
    }, [token, vendorId]);

    // ✅ Handle Order Status Update
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:5000/api/orders/${orderId}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );

            setFilteredOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );

            toast.success(`Order ${orderId} updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status");
        }
    };

    // ✅ Filter Orders by Status
    const filterOrders = (status) => {
        setStatusFilter(status);
        if (status === "All") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === status));
        }
    };

    return (
        <div>
            <h1>Vendor Dashboard</h1>

            {vendorInfo && (
                <div>
                    <h3>Restaurant: {vendorInfo.restaurantName}</h3>
                    <p>Email: {vendorInfo.email}</p>
                    <p>Phone: {vendorInfo.phone}</p>
                </div>
            )}

            <h2>Orders</h2>

            {/* ✅ Order Status Filter */}
            <label>Filter Orders: </label>
            <select value={statusFilter} onChange={(e) => filterOrders(e.target.value)}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
            </select>

            {filteredOrders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                filteredOrders.map(order => (
                    <div key={order._id}>
                        <h3>Order ID: {order._id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.totalPrice}</p>

                        {/* ✅ Order Status Buttons */}
                        {order.status !== "Delivered" && (
                            <div>
                                {order.status === "Pending" && (
                                    <button onClick={() => handleUpdateStatus(order._id, "Preparing")}>
                                        Mark as Preparing
                                    </button>
                                )}
                                {order.status === "Preparing" && (
                                    <button onClick={() => handleUpdateStatus(order._id, "Out for Delivery")}>
                                        Mark as Out for Delivery
                                    </button>
                                )}
                                {order.status === "Out for Delivery" && (
                                    <button onClick={() => handleUpdateStatus(order._id, "Delivered")}>
                                        Mark as Delivered
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default VendorDashboard;
