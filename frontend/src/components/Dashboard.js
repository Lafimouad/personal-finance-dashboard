import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseCharts from "./ExpenseCharts";
import { fetchExpenses, addExpense, editExpense, deleteExpense } from "../api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses().then(setExpenses).catch(console.error);
  }, []);

  const handleAddExpense = (expense) => {
    addExpense(expense)
      .then((newExpense) => setExpenses((prev) => [...prev, newExpense]))
      .catch(console.error);
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditData({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
    });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id)
        .then(() => setExpenses((prev) => prev.filter((exp) => exp.id !== id)))
        .catch(console.error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editExpense(editingId, {
      amount: parseFloat(editData.amount),
      description: editData.description,
      category: editData.category,
    })
      .then((updated) => {
        setExpenses((prev) =>
          prev.map((exp) => (exp.id === updated.id ? updated : exp))
        );
        setEditingId(null);
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
      <h2>Add Expense</h2>
      <ExpenseForm onAdd={handleAddExpense} />
      <button
        style={{
          margin: "20px 0",
          padding: "10px 20px",
          background: "#36A2EB",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={() => navigate("/filter")}
      >
        Go to Filter Page
      </button>
      <ExpenseCharts expenses={expenses} />
      <h2>Expenses</h2>
      <ul>
        {filteredExpenses.map((e) => (
          <li key={e.id}>
            {editingId === e.id ? (
              <form onSubmit={handleEditSubmit} style={{ display: "inline" }}>
                <input
                  type="number"
                  name="amount"
                  value={editData.amount}
                  onChange={handleEditChange}
                  min="0"
                  step="0.01"
                  required
                  style={{ width: "80px" }}
                />
                <input
                  type="text"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  required
                  style={{ width: "120px" }}
                />
                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  required
                  style={{ width: "100px" }}
                />
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <strong>{e.category}</strong>: ${e.amount} - {e.description}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => startEdit(e)}
                >
                  Edit
                </button>
                <button
                  style={{
                    marginLeft: "5px",
                    color: "#fff",
                    background: "#dc3545",
                    border: "none",
                    borderRadius: "3px",
                    padding: "2px 8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
