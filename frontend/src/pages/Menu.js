/*import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:5000/api/menu")
            .then(response => setMenu(response.data))
            .catch(error => console.error("Error fetching menu:", error));
    }, []);

    const handleAddToCart = (item) => {
        dispatch(addToCart({ menuItemId: item._id, name: item.name, price: item.price, quantity: 1 }));
        toast.success(`${item.name} added to cart`);
    };

    return (
        <div>
            <h1>Menu</h1>
            {menu.map(item => (
                <div key={item._id}>
                    <h3>{item.name} - ${item.price}</h3>
                    <p>{item.description}</p>
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;
*/

















/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:5000/api/menu")
            .then(response => setMenu(response.data))
            .catch(error => console.error("Error fetching menu:", error));
    }, []);

    // ✅ Group menu items by restaurant name
    const groupedMenu = menu.reduce((acc, item) => {
        acc[item.restaurantName] = acc[item.restaurantName] || [];
        acc[item.restaurantName].push(item);
        return acc;
    }, {});

    return (
        <div>
            <h1>Menu</h1>
            {Object.keys(groupedMenu).map(restaurant => (
                <div key={restaurant}>
                    <h2>{restaurant}</h2>
                    {groupedMenu[restaurant].map(item => (
                        <div key={item._id}>
                            <h3>{item.name} - ${item.price}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Menu;
*/







import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // ✅ Import Redux action
import { toast } from "react-toastify";

const Menu = () => {
    const [menu, setMenu] = useState({});
    const dispatch = useDispatch(); // ✅ Initialize dispatch

    useEffect(() => {
        axios.get("http://localhost:5000/api/menu")
            .then(response => setMenu(response.data))
            .catch(error => console.error("Error fetching menu:", error));
    }, []);

    const handleAddToCart = (item) => {
        dispatch(addToCart({
            menuItemId: item._id, 
            name: item.name,
            price: item.price,
            quantity: 1
        })); // ✅ Send correct item format to Redux
        toast.success(`${item.name} added to cart!`);
    };

    return (
        <div>
            <h1>Menu</h1>
            {Object.keys(menu).map(restaurant => (
                <div key={restaurant} className="restaurant-menu">
                    <h2>{restaurant}</h2>
                    {Object.keys(menu[restaurant]).map(category => (
                        <div key={category} className="category-section">
                            <h3>{category}</h3>
                            {menu[restaurant][category].map(item => (
                                <div key={item._id} className="menu-item">
                                    <img src={item.imageUrl} alt={item.name} className="menu-image" />
                                    <h4>{item.name} - ${item.price}</h4>
                                    <p>{item.description}</p>
                                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button> {/* ✅ Fix event handler */}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Menu;
