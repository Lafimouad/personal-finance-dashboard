import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseCharts from "./ExpenseCharts";
import { fetchExpenses, addExpense } from "../api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
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
      <ExpenseCharts expenses={expenses} />
      <h2>Expenses</h2>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            <strong>{e.category}</strong>: ${e.amount} - {e.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
