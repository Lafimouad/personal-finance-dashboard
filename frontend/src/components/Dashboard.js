import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseCharts from "./ExpenseCharts";
import {
  fetchExpenses,
  addExpense,
  editExpense,
  deleteExpense,
  fetchFinancialSummary,
} from "../api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const [summary, setSummary] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses().then(setExpenses).catch(console.error);
    fetchFinancialSummary().then(setSummary).catch(console.error);
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

      {/* Quick Navigation */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/income")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          💰 Income Tracker
        </button>
        <button
          onClick={() => navigate("/savings-goals")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🎯 Savings Goals
        </button>
        <button
          onClick={() => navigate("/bill-reminders")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          📅 Bill Reminders
        </button>
        <button
          onClick={() => navigate("/debts")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          💳 Debt Tracker
        </button>
        <button
          onClick={() => navigate("/reports")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9c27b0",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          📊 Financial Reports
        </button>
        <button
          onClick={() => navigate("/budgets")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#00bcd4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          💼 Budget Settings
        </button>
      </div>

      {/* Financial Summary Cards */}
      {summary && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e8f5e9",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}
            >
              Total Income
            </div>
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#4caf50" }}
            >
              ${summary.totalIncome?.toFixed(2) || "0.00"}
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              {summary.incomeCount || 0} transactions
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffebee",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}
            >
              Total Expenses
            </div>
            <div
              style={{ fontSize: "32px", fontWeight: "bold", color: "#f44336" }}
            >
              ${summary.totalExpenses?.toFixed(2) || "0.00"}
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              {summary.expenseCount || 0} transactions
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}
            >
              Net Savings
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: summary.netSavings >= 0 ? "#4caf50" : "#f44336",
              }}
            >
              ${summary.netSavings?.toFixed(2) || "0.00"}
            </div>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              {summary.totalIncome > 0
                ? `${((summary.netSavings / summary.totalIncome) * 100).toFixed(
                    1
                  )}%`
                : "0%"}{" "}
              savings rate
            </div>
          </div>
        </div>
      )}

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
        {expenses.map((e) => (
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
