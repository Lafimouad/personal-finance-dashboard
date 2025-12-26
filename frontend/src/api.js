// API utility

const API_URL = "http://localhost:8080/api/expenses";
const BUDGET_API_URL = "http://localhost:8080/api/budgets";
const INCOME_API_URL = "http://localhost:8080/api/income";
const SAVINGS_GOAL_API_URL = "http://localhost:8080/api/savings-goals";
const BILL_REMINDER_API_URL = "http://localhost:8080/api/bill-reminders";
const DEBT_API_URL = "http://localhost:8080/api/debts";
const REPORT_API_URL = "http://localhost:8080/api/reports";

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

// Income API
export async function fetchIncomes() {
  const res = await fetch(INCOME_API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch incomes");
  return res.json();
}

export async function addIncome(income) {
  const res = await fetch(INCOME_API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(income),
  });
  if (!res.ok) throw new Error("Failed to add income");
  return res.json();
}

export async function editIncome(id, income) {
  const res = await fetch(`${INCOME_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(income),
  });
  if (!res.ok) throw new Error("Failed to edit income");
  return res.json();
}

export async function deleteIncome(id) {
  const res = await fetch(`${INCOME_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete income");
  return true;
}

// Savings Goals API
export async function fetchSavingsGoals() {
  const res = await fetch(SAVINGS_GOAL_API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch savings goals");
  return res.json();
}

export async function addSavingsGoal(goal) {
  const res = await fetch(SAVINGS_GOAL_API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error("Failed to add savings goal");
  return res.json();
}

export async function editSavingsGoal(id, goal) {
  const res = await fetch(`${SAVINGS_GOAL_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error("Failed to edit savings goal");
  return res.json();
}

export async function deleteSavingsGoal(id) {
  const res = await fetch(`${SAVINGS_GOAL_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete savings goal");
  return true;
}

export async function contributeSavingsGoal(id, amount) {
  const res = await fetch(
    `${SAVINGS_GOAL_API_URL}/${id}/contribute?amount=${amount}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) throw new Error("Failed to contribute to savings goal");
  return res.json();
}

// Bill Reminders API
export async function fetchBillReminders() {
  const res = await fetch(BILL_REMINDER_API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch bill reminders");
  return res.json();
}

export async function addBillReminder(reminder) {
  const res = await fetch(BILL_REMINDER_API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reminder),
  });
  if (!res.ok) throw new Error("Failed to add bill reminder");
  return res.json();
}

export async function editBillReminder(id, reminder) {
  const res = await fetch(`${BILL_REMINDER_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(reminder),
  });
  if (!res.ok) throw new Error("Failed to edit bill reminder");
  return res.json();
}

export async function deleteBillReminder(id) {
  const res = await fetch(`${BILL_REMINDER_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete bill reminder");
  return true;
}

export async function markBillPaid(id, paid) {
  const res = await fetch(
    `${BILL_REMINDER_API_URL}/${id}/mark-paid?paid=${paid}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) throw new Error("Failed to mark bill as paid");
  return res.json();
}

// Debts API
export async function fetchDebts() {
  const res = await fetch(DEBT_API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch debts");
  return res.json();
}

export async function addDebt(debt) {
  const res = await fetch(DEBT_API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(debt),
  });
  if (!res.ok) throw new Error("Failed to add debt");
  return res.json();
}

export async function editDebt(id, debt) {
  const res = await fetch(`${DEBT_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(debt),
  });
  if (!res.ok) throw new Error("Failed to edit debt");
  return res.json();
}

export async function deleteDebt(id) {
  const res = await fetch(`${DEBT_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete debt");
  return true;
}

export async function makeDebtPayment(id, amount) {
  const res = await fetch(`${DEBT_API_URL}/${id}/payment?amount=${amount}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to make debt payment");
  return res.json();
}

// Financial Reports API
export async function fetchMonthlyReport(year, month) {
  const res = await fetch(
    `${REPORT_API_URL}/monthly?year=${year}&month=${month}`,
    {
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch monthly report");
  return res.json();
}

export async function fetchYearlyReport(year) {
  const res = await fetch(`${REPORT_API_URL}/yearly?year=${year}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch yearly report");
  return res.json();
}

export async function fetchFinancialSummary() {
  const res = await fetch(`${REPORT_API_URL}/summary`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch financial summary");
  return res.json();
}
