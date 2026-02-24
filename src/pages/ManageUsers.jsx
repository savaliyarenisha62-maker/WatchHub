import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "./ManageUsers.css";
import ConfirmationModal from "../components/ConfirmationModal";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  // Open confirmation modal
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // CONFIRM DELETE (USER + THEIR ORDERS)
  const confirmDelete = () => {
    if (!selectedUser) return;

    // 1️⃣ Delete user
    const updatedUsers = users.filter(
      (user) => user.email !== selectedUser.email
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 2️⃣ Delete orders of that user
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const filteredOrders = allOrders.filter(
      (order) => order.customer.email !== selectedUser.email
    );
    localStorage.setItem("orders", JSON.stringify(filteredOrders));

    // 3️⃣ Close modal
    setShowModal(false);
    setSelectedUser(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Manage Registered Users</h1>
      </header>

      <div className="user-management-section">
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        className="delete-icon-btn"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No users registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showModal && selectedUser && (
        <ConfirmationModal
          title="Delete User"
          desc={`Are you sure you want to delete ${selectedUser.email}? 
This will also delete all their orders.`}
          confirmBtnText="Delete"
          onConfirm={confirmDelete}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
