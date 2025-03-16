import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import { toast } from "react-toastify";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.user?._id);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();

        // Listen for WebSocket updates
        socket.on(`orderUpdate:${userId}`, (data) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === data.orderId ? { ...order, status: data.status } : order
                )
            );
            toast.info(`Order ${data.orderId} is now ${data.status}`);
        });

        return () => {
            socket.off(`orderUpdate:${userId}`);
        };
    }, [token, userId]);

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
                <div key={order._id}>
                    <h3>Order ID: {order._id}</h3>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.totalPrice}</p>
                </div>
            ))}
        </div>
    );
};

export default Orders;
