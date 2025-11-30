import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseCharts from "./ExpenseCharts";
import { fetchExpenses, addExpense } from "../api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses().then(setExpenses).catch(console.error);
  }, []);

  const handleAddExpense = (expense) => {
    addExpense(expense)
      .then((newExpense) => setExpenses((prev) => [...prev, newExpense]))
      .catch(console.error);
  };

  return (
    <div>
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
