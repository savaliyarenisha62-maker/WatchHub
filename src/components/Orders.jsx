import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Load users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userEmails = users.map((u) => u.email);

    // 2️⃣ Load saved orders
    let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // 3️⃣ Load latest order
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));

    if (latestOrder) {
      const exists = savedOrders.some(
        (o) => o.orderId === latestOrder.orderId
      );

      if (!exists) {
        const normalizedOrder = {
          ...latestOrder,
          items: latestOrder.items.map((item) => ({
            ...item,
            cartQty: item.cartQty || item.quantity || 1,
            price: Number(item.price),
          })),
          totalAmount: latestOrder.items.reduce(
            (sum, item) =>
              sum + Number(item.price) * (item.cartQty || item.quantity || 1),
            0
          ),
        };

        savedOrders = [...savedOrders, normalizedOrder];
        localStorage.setItem("orders", JSON.stringify(savedOrders));
      }
    }

    // 4️⃣ FILTER OUT DELETED USERS' ORDERS
    const filteredOrders = savedOrders.filter((order) =>
      userEmails.includes(order.customer.email)
    );

    setOrders(filteredOrders);
  }, []);

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>All User Orders</h1>
        <p>View details of all orders placed by users.</p>
      </header>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Total Items</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customer.fullName}</td>
                <td>{order.customer.email}</td>
                <td>
                  {order.items.reduce(
                    (acc, item) => acc + (item.cartQty || 1),
                    0
                  )}
                </td>
                <td>
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </td>
                <td>{order.orderDate}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/bill/${order.orderId}`)}
                  >
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
