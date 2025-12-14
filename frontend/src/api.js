// Expense API utility

const API_URL = "http://localhost:8080/api/expenses";
const BUDGET_API_URL = "http://localhost:8080/api/budgets";
// Budget API
export async function fetchBudgets() {
  const res = await fetch(BUDGET_API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch budgets");
  return res.json();
}

export async function addBudget(budget) {
  const res = await fetch(BUDGET_API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(budget),
  });
  if (!res.ok) throw new Error("Failed to add budget");
  return res.json();
}

export async function deleteBudget(id) {
  const res = await fetch(`${BUDGET_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete budget");
  return true;
}

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

export async function editExpense(id, expense) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to edit expense");
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete expense");
  return true;
}
