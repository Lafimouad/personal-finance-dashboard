import React, { useEffect, useState } from "react";
import { fetchExpenses } from "../api";
import ExpenseCharts from "./ExpenseCharts";

function ExpenseFilterPage() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    category: "",
    minAmount: "",
    maxAmount: "",
  });

  useEffect(() => {
    fetchExpenses().then(setExpenses).catch(console.error);
  }, []);

  const filteredExpenses = expenses.filter((e) => {
    const expenseDate = new Date(e.date || e.createdAt || Date.now());
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;
    const minAmount = filter.minAmount ? parseFloat(filter.minAmount) : null;
    const maxAmount = filter.maxAmount ? parseFloat(filter.maxAmount) : null;
    let pass = true;
    if (startDate && expenseDate < startDate) pass = false;
    if (endDate && expenseDate > endDate) pass = false;
    if (filter.category && e.category !== filter.category) pass = false;
    if (minAmount !== null && e.amount < minAmount) pass = false;
    if (maxAmount !== null && e.amount > maxAmount) pass = false;
    return pass;
  });

  const categories = Array.from(new Set(expenses.map((e) => e.category)));

  return (
    <div>
      <h2>Filter Expenses</h2>
      <form
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <div>
          <label>
            Start Date
            <br />
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) =>
                setFilter((f) => ({ ...f, startDate: e.target.value }))
              }
            />
          </label>
        </div>
        <div>
          <label>
            End Date
            <br />
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) =>
                setFilter((f) => ({ ...f, endDate: e.target.value }))
              }
            />
          </label>
        </div>
        <div>
          <label>
            Category
            <br />
            <select
              value={filter.category}
              onChange={(e) =>
                setFilter((f) => ({ ...f, category: e.target.value }))
              }
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Min Amount
            <br />
            <input
              type="number"
              min="0"
              step="0.01"
              value={filter.minAmount}
              onChange={(e) =>
                setFilter((f) => ({ ...f, minAmount: e.target.value }))
              }
            />
          </label>
        </div>
        <div>
          <label>
            Max Amount
            <br />
            <input
              type="number"
              min="0"
              step="0.01"
              value={filter.maxAmount}
              onChange={(e) =>
                setFilter((f) => ({ ...f, maxAmount: e.target.value }))
              }
            />
          </label>
        </div>
      </form>
      <ExpenseCharts expenses={filteredExpenses} />
      <h3>Filtered Expenses</h3>
      <ul>
        {filteredExpenses.map((e) => (
          <li key={e.id}>
            <strong>{e.category}</strong>: ${e.amount} - {e.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseFilterPage;
