import React, { useEffect, useState } from "react";
import { fetchBudgets, addBudget, deleteBudget } from "../api";

function BudgetSettings({ categories, onBudgetsChange }) {
  const [budgets, setBudgets] = useState([]); // [{id, category, amount, month}]
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({}); // {category: amount}
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    fetchBudgets()
      .then((data) => {
        setBudgets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (category, value) => {
    setEditing((prev) => ({ ...prev, [category]: value }));
  };

  const handleSave = async (category) => {
    const amount = parseFloat(editing[category]) || 0;
    // Check if budget exists for this category+month
    const existing = budgets.find(
      (b) => b.category === category && b.month === month
    );
    if (existing) {
      // Delete and re-add (simple way, or you can implement updateBudget API)
      await deleteBudget(existing.id);
    }
    const newBudget = await addBudget({ category, amount, month });
    setBudgets((prev) => [
      ...prev.filter((b) => !(b.category === category && b.month === month)),
      newBudget,
    ]);
    setEditing((prev) => ({ ...prev, [category]: "" }));
    if (onBudgetsChange) onBudgetsChange();
  };

  const handleDelete = async (category) => {
    const existing = budgets.find(
      (b) => b.category === category && b.month === month
    );
    if (existing) {
      await deleteBudget(existing.id);
      setBudgets((prev) => prev.filter((b) => b.id !== existing.id));
      if (onBudgetsChange) onBudgetsChange();
    }
  };

  return (
    <div className="budget-settings-block">
      <h3>Set Monthly Budgets</h3>
      <div style={{ marginBottom: 8 }}>
        <label>
          Month:{" "}
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
      </div>
      {loading ? (
        <div>Loading budgets...</div>
      ) : (
        <table className="budget-settings-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const budget = budgets.find(
                (b) => b.category === cat && b.month === month
              );
              return (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={
                        editing[cat] !== undefined
                          ? editing[cat]
                          : budget
                          ? budget.amount
                          : ""
                      }
                      onChange={(e) => handleChange(cat, e.target.value)}
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleSave(cat)}
                      style={{ marginRight: 6 }}
                    >
                      Save
                    </button>
                    {budget && (
                      <button
                        onClick={() => handleDelete(cat)}
                        style={{ color: "#dc3545" }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BudgetSettings;
