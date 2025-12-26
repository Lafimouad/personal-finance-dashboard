import React, { useState, useEffect } from "react";
import {
  fetchSavingsGoals,
  addSavingsGoal,
  editSavingsGoal,
  deleteSavingsGoal,
  contributeSavingsGoal,
} from "../api";

function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [contributeId, setContributeId] = useState(null);
  const [contributeAmount, setContributeAmount] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    fetchSavingsGoals().then(setGoals).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount || 0),
      completed: false,
    };

    if (editingId) {
      editSavingsGoal(editingId, goalData)
        .then(() => {
          loadGoals();
          resetForm();
        })
        .catch(console.error);
    } else {
      addSavingsGoal(goalData)
        .then(() => {
          loadGoals();
          resetForm();
        })
        .catch(console.error);
    }
  };

  const handleEdit = (goal) => {
    setEditingId(goal.id);
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
      targetDate: goal.targetDate || "",
      description: goal.description || "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this savings goal?")) {
      deleteSavingsGoal(id).then(loadGoals).catch(console.error);
    }
  };

  const handleContribute = () => {
    if (contributeId && contributeAmount) {
      contributeSavingsGoal(contributeId, parseFloat(contributeAmount))
        .then(() => {
          loadGoals();
          setContributeId(null);
          setContributeAmount("");
        })
        .catch(console.error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
      description: "",
    });
    setEditingId(null);
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Savings Goals</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        <h3>{editingId ? "Edit Goal" : "Create New Goal"}</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Goal Name (e.g., Emergency Fund)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={formData.targetAmount}
            onChange={(e) =>
              setFormData({ ...formData, targetAmount: e.target.value })
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
            type="number"
            placeholder="Current Amount"
            value={formData.currentAmount}
            onChange={(e) =>
              setFormData({ ...formData, currentAmount: e.target.value })
            }
            step="0.01"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="date"
            placeholder="Target Date"
            value={formData.targetDate}
            onChange={(e) =>
              setFormData({ ...formData, targetDate: e.target.value })
            }
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
              gridColumn: "1 / -1",
            }}
          />
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
            {editingId ? "Update Goal" : "Create Goal"}
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {goals.map((goal) => {
          const progress = getProgressPercentage(
            goal.currentAmount,
            goal.targetAmount
          );
          return (
            <div
              key={goal.id}
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: goal.completed ? "#e8f5e9" : "white",
              }}
            >
              <h3>{goal.name}</h3>
              {goal.completed && (
                <div
                  style={{
                    color: "#4caf50",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  ✓ Goal Completed!
                </div>
              )}
              <p>{goal.description}</p>
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span>${goal.currentAmount.toFixed(2)}</span>
                  <span>${goal.targetAmount.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    height: "20px",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      backgroundColor: progress === 100 ? "#4caf50" : "#2196f3",
                      height: "100%",
                      borderRadius: "10px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {progress.toFixed(1)}%
                </div>
              </div>
              {goal.targetDate && (
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Target Date: {goal.targetDate}
                </p>
              )}
              <div style={{ marginTop: "15px" }}>
                {contributeId === goal.id ? (
                  <div>
                    <input
                      type="number"
                      placeholder="Amount to contribute"
                      value={contributeAmount}
                      onChange={(e) => setContributeAmount(e.target.value)}
                      step="0.01"
                      style={{
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                    <div style={{ marginTop: "5px" }}>
                      <button
                        onClick={handleContribute}
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#4caf50",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => {
                          setContributeId(null);
                          setContributeAmount("");
                        }}
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#757575",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setContributeId(goal.id)}
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Contribute
                    </button>
                    <button
                      onClick={() => handleEdit(goal)}
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#2196f3",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavingsGoals;
