// Expense API utility

const API_URL = "http://localhost:8080/api/expenses";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function fetchExpenses() {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function addExpense(expense) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to add expense");
  return res.json();
}
