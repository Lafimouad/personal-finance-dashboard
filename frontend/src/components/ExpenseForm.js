import React, { useState } from "react";
import "./ExpenseForm.css";

const presetCategories = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Other",
];

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(presetCategories[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory =
      useCustom && customCategory ? customCategory : category;
    onAdd({
      amount: parseFloat(amount),
      description,
      category: finalCategory,
      recurring,
    });
    setAmount("");
    setDescription("");
    setCategory(presetCategories[0]);
    setCustomCategory("");
    setUseCustom(false);
    setRecurring(false);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        min="0"
        step="0.01"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setUseCustom(e.target.value === "Other");
        }}
        disabled={useCustom}
      >
        {presetCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {useCustom && (
        <input
          type="text"
          placeholder="Custom Category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          required
        />
      )}
      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
        />
        Recurring Monthly
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
