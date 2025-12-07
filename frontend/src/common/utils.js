// Utility functions for finance dashboard

/**
 * Calculate monthly summary with comparison to previous month.
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Array of { month, total, change }
 */
export function getMonthlySummary(expenses) {
  const monthlyTotals = {};
  expenses.forEach((e) => {
    const date = new Date(e.date || e.createdAt || Date.now());
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
  });
  // Sort by date
  const sorted = Object.entries(monthlyTotals).sort((a, b) => {
    // Parse as first of month for sorting
    const parseMonth = (m) => new Date("1 " + m);
    return parseMonth(a[0]) - parseMonth(b[0]);
  });
  // Add comparison to previous month
  return sorted.map(([month, total], idx, arr) => {
    const prev = idx > 0 ? arr[idx - 1][1] : null;
    let change = null;
    if (prev !== null && prev !== 0) {
      change = (((total - prev) / prev) * 100).toFixed(1);
    }
    return { month, total: total.toFixed(2), change };
  });
}
