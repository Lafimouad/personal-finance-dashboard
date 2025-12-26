import React, { useState, useEffect } from "react";
import { fetchIncomes, addIncome, editIncome, deleteIncome } from "../api";

function IncomeTracker() {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    description: "",
    date: "",
    recurring: false,
    frequency: "MONTHLY",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadIncomes();
  }, []);

  const loadIncomes = () => {
    fetchIncomes().then(setIncomes).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (editingId) {
      editIncome(editingId, incomeData)
        .then(() => {
          loadIncomes();
          resetForm();
        })
        .catch(console.error);
    } else {
      addIncome(incomeData)
        .then(() => {
          loadIncomes();
          resetForm();
        })
        .catch(console.error);
    }
  };

  const handleEdit = (income) => {
    setEditingId(income.id);
    setFormData({
      source: income.source,
      amount: income.amount,
      description: income.description,
      date: income.date || "",
      recurring: income.recurring,
      frequency: income.frequency || "MONTHLY",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      deleteIncome(id).then(loadIncomes).catch(console.error);
    }
  };

  const resetForm = () => {
    setFormData({
      source: "",
      amount: "",
      description: "",
      date: "",
      recurring: false,
      frequency: "MONTHLY",
    });
    setEditingId(null);
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Income Tracker</h2>
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#e8f5e9",
          borderRadius: "5px",
        }}
      >
        <h3>Total Income: ${totalIncome.toFixed(2)}</h3>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Income Source (e.g., Salary)"
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
            step="0.01"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={formData.recurring}
                onChange={(e) =>
                  setFormData({ ...formData, recurring: e.target.checked })
                }
              />
              Recurring
            </label>
            {formData.recurring && (
              <select
                value={formData.frequency}
                onChange={(e) =>
                  setFormData({ ...formData, frequency: e.target.value })
                }
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            )}
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {editingId ? "Update Income" : "Add Income"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "10px 20px",
                backgroundColor: "#757575",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h3>Income History</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Source
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Date
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Recurring
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{income.source}</td>
                <td style={{ padding: "10px" }}>${income.amount.toFixed(2)}</td>
                <td style={{ padding: "10px" }}>{income.description}</td>
                <td style={{ padding: "10px" }}>{income.date}</td>
                <td style={{ padding: "10px" }}>
                  {income.recurring ? `Yes (${income.frequency})` : "No"}
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleEdit(income)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2196f3",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(income.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncomeTracker;
