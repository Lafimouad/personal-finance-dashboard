// Simple in-memory budget store (replace with backend or persistent storage as needed)
export const defaultBudgets = {};

export function getBudget(category) {
  return defaultBudgets[category] || 0;
}

export function setBudget(category, amount) {
  defaultBudgets[category] = amount;
}

export function getAllBudgets() {
  return { ...defaultBudgets };
}
