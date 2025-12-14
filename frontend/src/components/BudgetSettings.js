import React, { useState } from "react";
import { getAllBudgets, setBudget } from "../common/budgets";

function BudgetSettings({ categories, onBudgetsChange }) {
  const [budgets, setBudgetsState] = useState(getAllBudgets());

  const handleChange = (category, value) => {
    const amount = parseFloat(value) || 0;
    setBudgetsState((prev) => ({ ...prev, [category]: amount }));
    setBudget(category, amount);
    if (onBudgetsChange) onBudgetsChange({ ...budgets, [category]: amount });
  };

  return (
    <div className="budget-settings-block">
      <h3>Set Monthly Budgets</h3>
      <table className="budget-settings-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget ($)</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat}>
              <td>{cat}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={budgets[cat] || ""}
                  onChange={(e) => handleChange(cat, e.target.value)}
                  style={{ width: "80px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BudgetSettings;
