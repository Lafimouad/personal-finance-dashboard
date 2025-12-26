import React, { useState, useEffect } from "react";
import {
  fetchBillReminders,
  addBillReminder,
  editBillReminder,
  deleteBillReminder,
  markBillPaid,
} from "../api";

function BillReminders() {
  const [bills, setBills] = useState([]);
  const [formData, setFormData] = useState({
    billName: "",
    amount: "",
    dueDate: "",
    recurring: false,
    frequency: "MONTHLY",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = () => {
    fetchBillReminders().then(setBills).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const billData = {
      ...formData,
      amount: parseFloat(formData.amount),
      paid: false,
    };

    if (editingId) {
      editBillReminder(editingId, billData)
        .then(() => {
          loadBills();
          resetForm();
        })
        .catch(console.error);
    } else {
      addBillReminder(billData)
        .then(() => {
          loadBills();
          resetForm();
        })
        .catch(console.error);
    }
  };

  const handleEdit = (bill) => {
    setEditingId(bill.id);
    setFormData({
      billName: bill.billName,
      amount: bill.amount,
      dueDate: bill.dueDate || "",
      recurring: bill.recurring,
      frequency: bill.frequency || "MONTHLY",
      category: bill.category || "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bill reminder?")) {
      deleteBillReminder(id).then(loadBills).catch(console.error);
    }
  };

  const togglePaid = (id, currentStatus) => {
    markBillPaid(id, !currentStatus).then(loadBills).catch(console.error);
  };

  const resetForm = () => {
    setFormData({
      billName: "",
      amount: "",
      dueDate: "",
      recurring: false,
      frequency: "MONTHLY",
      category: "",
    });
    setEditingId(null);
  };

  const isUpcoming = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysDiff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7 && daysDiff >= 0;
  };

  const isOverdue = (dueDate, paid) => {
    if (paid) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const upcomingBills = bills.filter(
    (bill) => !bill.paid && isUpcoming(bill.dueDate)
  );
  const overdueBills = bills.filter((bill) =>
    isOverdue(bill.dueDate, bill.paid)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bill Reminders</h2>

      {upcomingBills.length > 0 && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#fff3cd",
            borderRadius: "5px",
            border: "1px solid #ffc107",
          }}
        >
          <h3 style={{ marginTop: 0 }}>⚠️ Upcoming Bills (Next 7 Days)</h3>
          {upcomingBills.map((bill) => (
            <div key={bill.id} style={{ marginBottom: "5px" }}>
              {bill.billName} - ${bill.amount.toFixed(2)} - Due: {bill.dueDate}
            </div>
          ))}
        </div>
      )}

      {overdueBills.length > 0 && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f8d7da",
            borderRadius: "5px",
            border: "1px solid #f44336",
          }}
        >
          <h3 style={{ marginTop: 0 }}>🚨 Overdue Bills</h3>
          {overdueBills.map((bill) => (
            <div key={bill.id} style={{ marginBottom: "5px" }}>
              {bill.billName} - ${bill.amount.toFixed(2)} - Due: {bill.dueDate}
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        <h3>{editingId ? "Edit Bill" : "Add New Bill"}</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Bill Name (e.g., Electric Bill)"
            value={formData.billName}
            onChange={(e) =>
              setFormData({ ...formData, billName: e.target.value })
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
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Category (e.g., Utilities)"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly</option>
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
            {editingId ? "Update Bill" : "Add Bill"}
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
        <h3>All Bills</h3>
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
                Bill Name
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
                Due Date
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Category
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
                Status
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
            {bills.map((bill) => (
              <tr
                key={bill.id}
                style={{
                  borderBottom: "1px solid #eee",
                  backgroundColor: bill.paid
                    ? "#e8f5e9"
                    : isOverdue(bill.dueDate, bill.paid)
                    ? "#ffebee"
                    : "white",
                }}
              >
                <td style={{ padding: "10px" }}>{bill.billName}</td>
                <td style={{ padding: "10px" }}>${bill.amount.toFixed(2)}</td>
                <td style={{ padding: "10px" }}>{bill.dueDate}</td>
                <td style={{ padding: "10px" }}>{bill.category}</td>
                <td style={{ padding: "10px" }}>
                  {bill.recurring ? `Yes (${bill.frequency})` : "No"}
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "3px",
                      backgroundColor: bill.paid ? "#4caf50" : "#f44336",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {bill.paid ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => togglePaid(bill.id, bill.paid)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: bill.paid ? "#ff9800" : "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    {bill.paid ? "Mark Unpaid" : "Mark Paid"}
                  </button>
                  <button
                    onClick={() => handleEdit(bill)}
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
                    onClick={() => handleDelete(bill.id)}
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

export default BillReminders;
