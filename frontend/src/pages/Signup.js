/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default to user
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register",
                { name, email, password, role },
                { headers: { "Content-Type": "application/json" } }
            );
            toast.success("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error);
            toast.error(error.response?.data?.error || "Signup failed");
        }
    };
    

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
*/


/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default to "user"
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role });
            toast.success("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                {/* ✅ Role Selection */
               /*<label>
                    <input type="radio" value="user" checked={role === "user"} onChange={() => setRole("user")} />
                    Customer
                </label>
                <label>
                    <input type="radio" value="vendor" checked={role === "vendor"} onChange={() => setRole("vendor")} />
                    Vendor
                </label>

                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
*/





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default to "user"
    const [restaurantName, setRestaurantName] = useState(""); // ✅ New state for restaurant name
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // ✅ Ensure restaurantName is included for vendors
        const userData = role === "vendor" 
            ? { name, email, password, role, restaurantName } 
            : { name, email, password, role };

        try {
            await axios.post("http://localhost:5000/api/auth/register", userData);
            toast.success("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                {/* ✅ Role Selection */}
                <label>
                    <input type="radio" value="user" checked={role === "user"} onChange={() => setRole("user")} />
                    Customer
                </label>
                <label>
                    <input type="radio" value="vendor" checked={role === "vendor"} onChange={() => setRole("vendor")} />
                    Vendor
                </label>

                {/* ✅ Show restaurant name field only for vendors */}
                {role === "vendor" && (
                    <input type="text" placeholder="Restaurant Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
                )}

                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
