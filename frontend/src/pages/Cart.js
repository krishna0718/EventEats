import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        toast.info("Item removed from cart");
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ menuItemId: id, quantity }));
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.error("Cart is empty!");
            return;
        }
        navigate("/checkout");
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.menuItemId}>
                        <h3>{item.name} - ${item.price}</h3>
                        <input type="number" value={item.quantity} min="1"
                            onChange={(e) => handleQuantityChange(item.menuItemId, Number(e.target.value))}
                        />
                        <button onClick={() => handleRemove(item.menuItemId)}>Remove</button>
                    </div>
                ))
            )}
            <button onClick={handleCheckout}>Checkout</button>
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
    );
};

export default Cart;
