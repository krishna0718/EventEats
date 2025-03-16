/*import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            toast.error("Cart is empty!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/orders", { items: cartItems }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Order placed successfully!");
            dispatch(clearCart());
            navigate("/orders");
        } catch (error) {
            toast.error("Failed to place order");
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            {cartItems.map(item => (
                <div key={item.menuItemId}>
                    <h3>{item.name} - ${item.price} x {item.quantity}</h3>
                </div>
            ))}
            <h2>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default Checkout;
*/

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            toast.error("Cart is empty!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to place an order!");
                return;
            }

            // ✅ Ensure Correct Order Format
            const formattedItems = cartItems.map(item => ({
                menuItemId: item.menuItemId,
                quantity: item.quantity
            }));

            const response = await axios.post("http://localhost:5000/api/orders", { items: formattedItems }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                toast.success("Order placed successfully!");
                dispatch(clearCart());
                navigate("/orders");
            } else {
                throw new Error("Unexpected response");
            }

        } catch (error) {
            console.error("❌ Order Placement Error:", error.response?.data || error);
            toast.error(error.response?.data?.error || "Failed to place order");
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            {cartItems.map(item => (
                <div key={item.menuItemId}>
                    <h3>{item.name} - ${item.price} x {item.quantity}</h3>
                </div>
            ))}
            <h2>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default Checkout;
