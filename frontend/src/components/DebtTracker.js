import React, { useState, useEffect } from "react";
import {
  fetchDebts,
  addDebt,
  editDebt,
  deleteDebt,
  makeDebtPayment,
} from "../api";

function DebtTracker() {
  const [debts, setDebts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "CREDIT_CARD",
    totalAmount: "",
    remainingAmount: "",
    interestRate: "",
    minimumPayment: "",
    startDate: "",
    targetPayoffDate: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  useEffect(() => {
    loadDebts();
  }, []);

  const loadDebts = () => {
    fetchDebts().then(setDebts).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const debtData = {
      ...formData,
      totalAmount: parseFloat(formData.totalAmount),
      remainingAmount: parseFloat(formData.remainingAmount),
      interestRate: parseFloat(formData.interestRate),
      minimumPayment: parseFloat(formData.minimumPayment),
    };

    if (editingId) {
      editDebt(editingId, debtData)
        .then(() => {
          loadDebts();
          resetForm();
        })
        .catch(console.error);
    } else {
      addDebt(debtData)
        .then(() => {
          loadDebts();
          resetForm();
        })
        .catch(console.error);
    }
  };

  const handleEdit = (debt) => {
    setEditingId(debt.id);
    setFormData({
      name: debt.name,
      type: debt.type,
      totalAmount: debt.totalAmount,
      remainingAmount: debt.remainingAmount,
      interestRate: debt.interestRate,
      minimumPayment: debt.minimumPayment,
      startDate: debt.startDate || "",
      targetPayoffDate: debt.targetPayoffDate || "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this debt?")) {
      deleteDebt(id).then(loadDebts).catch(console.error);
    }
  };

  const handlePayment = () => {
    if (paymentId && paymentAmount) {
      makeDebtPayment(paymentId, parseFloat(paymentAmount))
        .then(() => {
          loadDebts();
          setPaymentId(null);
          setPaymentAmount("");
        })
        .catch(console.error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "CREDIT_CARD",
      totalAmount: "",
      remainingAmount: "",
      interestRate: "",
      minimumPayment: "",
      startDate: "",
      targetPayoffDate: "",
    });
    setEditingId(null);
  };

  const calculatePayoffProgress = (total, remaining) => {
    return ((total - remaining) / total) * 100;
  };

  const calculateMonthsToPayoff = (remaining, monthlyPayment, interestRate) => {
    if (monthlyPayment <= 0 || remaining <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    if (monthlyRate === 0) return Math.ceil(remaining / monthlyPayment);
    const months =
      -Math.log(1 - (remaining * monthlyRate) / monthlyPayment) /
      Math.log(1 + monthlyRate);
    return Math.ceil(months);
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const totalMinPayment = debts.reduce(
    (sum, debt) => sum + debt.minimumPayment,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Debt Tracker</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            padding: "15px",
            backgroundColor: "#ffebee",
            borderRadius: "5px",
          }}
        >
          <h3>Total Debt</h3>
          <div
            style={{ fontSize: "24px", fontWeight: "bold", color: "#f44336" }}
          >
            ${totalDebt.toFixed(2)}
          </div>
        </div>
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fff3e0",
            borderRadius: "5px",
          }}
        >
          <h3>Total Min. Payment</h3>
          <div
            style={{ fontSize: "24px", fontWeight: "bold", color: "#ff9800" }}
          >
            ${totalMinPayment.toFixed(2)}/month
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        <h3>{editingId ? "Edit Debt" : "Add New Debt"}</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Debt Name (e.g., Credit Card)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="LOAN">Loan</option>
            <option value="MORTGAGE">Mortgage</option>
            <option value="STUDENT_LOAN">Student Loan</option>
            <option value="OTHER">Other</option>
          </select>
          <input
            type="number"
            placeholder="Total Amount"
            value={formData.totalAmount}
            onChange={(e) =>
              setFormData({ ...formData, totalAmount: e.target.value })
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
            placeholder="Remaining Amount"
            value={formData.remainingAmount}
            onChange={(e) =>
              setFormData({ ...formData, remainingAmount: e.target.value })
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
            placeholder="Interest Rate (%)"
            value={formData.interestRate}
            onChange={(e) =>
              setFormData({ ...formData, interestRate: e.target.value })
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
            placeholder="Minimum Payment"
            value={formData.minimumPayment}
            onChange={(e) =>
              setFormData({ ...formData, minimumPayment: e.target.value })
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
            type="date"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="date"
            placeholder="Target Payoff Date"
            value={formData.targetPayoffDate}
            onChange={(e) =>
              setFormData({ ...formData, targetPayoffDate: e.target.value })
            }
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
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
            {editingId ? "Update Debt" : "Add Debt"}
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
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
        }}
      >
        {debts.map((debt) => {
          const progress = calculatePayoffProgress(
            debt.totalAmount,
            debt.remainingAmount
          );
          const monthsToPayoff = calculateMonthsToPayoff(
            debt.remainingAmount,
            debt.minimumPayment,
            debt.interestRate
          );
          return (
            <div
              key={debt.id}
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{debt.name}</h3>
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    {debt.type}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#f44336",
                    fontWeight: "bold",
                  }}
                >
                  {debt.interestRate}% APR
                </span>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#666" }}>Paid</span>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    ${(debt.totalAmount - debt.remainingAmount).toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#f44336" }}>
                    Remaining
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#f44336",
                    }}
                  >
                    ${debt.remainingAmount.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "10px",
                    height: "20px",
                    marginTop: "10px",
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
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {progress.toFixed(1)}% paid off
                </div>
              </div>

              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span>Min. Payment:</span>
                  <span style={{ fontWeight: "bold" }}>
                    ${debt.minimumPayment.toFixed(2)}/month
                  </span>
                </div>
                {monthsToPayoff > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      marginTop: "5px",
                    }}
                  >
                    <span>Payoff Time:</span>
                    <span style={{ fontWeight: "bold" }}>
                      {monthsToPayoff} months (
                      {(monthsToPayoff / 12).toFixed(1)} years)
                    </span>
                  </div>
                )}
              </div>

              <div>
                {paymentId === debt.id ? (
                  <div>
                    <input
                      type="number"
                      placeholder="Payment amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
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
                        onClick={handlePayment}
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
                          setPaymentId(null);
                          setPaymentAmount("");
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
                      onClick={() => setPaymentId(debt.id)}
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
                      Make Payment
                    </button>
                    <button
                      onClick={() => handleEdit(debt)}
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
                      onClick={() => handleDelete(debt.id)}
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

export default DebtTracker;
