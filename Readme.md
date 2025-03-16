🍽️ EventEats – Stadium Food Delivery Platform
📌 Project Overview
EventEats is a stadium food delivery web app designed to allow users to order food and beverages from their seats, track order statuses in real-time, and enhance operational efficiency for stadium vendors. The platform connects customers with vendors in a seamless way, ensuring fast and efficient service.

🚀 Tech Stack
Frontend
React.js with Redux Toolkit for state management
React Router for navigation
Axios for API calls
Socket.io-client for real-time updates
Toastify for notifications
Backend
Node.js with Express.js for REST APIs
MongoDB + Mongoose for database management
JWT Authentication for secure user/vendor login
Socket.io for real-time order tracking
Cloudinary / Firebase (Future Scope) for image storage
Stripe / PayPal (Upcoming Feature) for payment integration
🎯 Current Features (Completed)
✅ Authentication & User Roles
Customers & vendors can sign up and log in.
JWT authentication with secure role-based access control (RBAC).
Vendors are stored separately from customers.
✅ Menu Management (Vendor)
Vendors can add, update, delete menu items.
Each menu item is associated with a restaurant name & vendor ID.
Customers can browse menu items by category and restaurant.
✅ Cart & Order Management (Customer)
Customers can add/remove/update items in their cart.
Cart items are grouped by restaurant for proper order assignment.
Customers can place an order, and it is automatically assigned to the respective vendor.
✅ Vendor Order Processing
Vendors receive orders in real time through WebSockets.
Vendors can update order statuses (Pending → Preparing → Ready → Completed).
Customers receive live order status updates.
✅ Real-Time Order Tracking (Socket.io)
WebSockets implemented for live order updates.
Vendors can view incoming orders instantly.
Customers are notified when order status updates.
🔜 Upcoming Features (In Progress)
🛠️ Vendor Dashboard Enhancements
Add offers & discounts to menu items.
Vendors can see daily sales reports & track analytics.
Bulk menu updates for faster price & stock management.
💳 Payment Integration (Sprint 5)
Integrate Stripe / PayPal for secure checkout.
Orders will only be processed after successful payment.
Implement refund processing for canceled orders.
📦 Pre-Order & Scheduled Delivery
Customers will be able to schedule orders before an event starts.
Vendors can prepare orders in advance to optimize workflow.
🎁 Loyalty & Rewards System
Customers earn points for every order.
Points can be redeemed for discounts on future purchases.
🤖 AI-Powered Recommendations
Implement machine learning to suggest popular stadium food items.
Personalized recommendations based on past orders & trends.
📂 Project Structure
bash
Copy
Edit
EventEats/
│── backend/
│   ├── config/               # Database & server configuration
│   ├── controllers/          # Business logic for auth, orders, menu
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoints
│   ├── middlewares/          # Authentication & validation middleware
│   ├── server.js             # Main backend entry point
│
│── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Main pages (Home, Menu, Cart, Orders)
│   │   ├── redux/            # Redux store & slices
│   │   ├── utils/            # Helper functions & WebSocket setup
│   │   ├── App.js            # React entry point
│   ├── public/               # Static assets
│
│── README.md                 # Project documentation
│── package.json              # Dependencies & scripts
│── .env                      # Environment variables
📖 How to Run the Project
🔹 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/eventeats.git
cd eventeats
🔹 2. Backend Setup
bash
Copy
Edit
cd backend
npm install
npm start
Make sure MongoDB is running, and update .env with your credentials.

🔹 3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
The app will run on http://localhost:3000.

🛠️ API Endpoints (Backend)
🔹 Authentication
Method	Endpoint	Description	Access
POST	/api/auth/signup	Register User	Public
POST	/api/auth/login	Login User	Public
GET	/api/auth/profile	Get Profile Info	Authenticated
🔹 Menu Management
Method	Endpoint	Description	Access
GET	/api/menu/vendor	Get vendor's menu items	Vendor
POST	/api/menu	Create menu item	Vendor
PUT	/api/menu/:id	Update menu item	Vendor
DELETE	/api/menu/:id	Delete menu item	Vendor
PUT	/api/menu/:id/offer	Add discount/offer	Vendor
🔹 Order Processing
Method	Endpoint	Description	Access
POST	/api/orders	Place an order	Customer
GET	/api/orders/user	Get user's orders	Customer
GET	/api/orders/vendor	Get vendor's orders	Vendor
PUT	/api/orders/:id	Update order status	Vendor
📌 Next Steps
Sprint 5: Payment Integration
✅ Research Stripe API
✅ Implement Payment Gateway
⏳ Secure payment transactions

Sprint 6: Pre-Ordering & AI Recommendations
✅ Schedule orders for events
⏳ Build AI-based food recommendations

