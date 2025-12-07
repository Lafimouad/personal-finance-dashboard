import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import "./ExpenseCharts.css";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

function getCategoryData(expenses) {
  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });
  return {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Total by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
      },
    ],
  };
}

function getMonthlyData(expenses) {
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
  const sortedEntries = Object.entries(monthlyTotals).sort((a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  });

  return {
    labels: sortedEntries.map(([month]) => month),
    datasets: [
      {
        label: "Total by Month",
        data: sortedEntries.map(([, total]) => total),
        backgroundColor: "#36A2EB",
      },
    ],
  };
}

function getTrendData(expenses) {
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
  const sortedEntries = Object.entries(monthlyTotals).sort((a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  });

  return {
    labels: sortedEntries.map(([month]) => month),
    datasets: [
      {
        label: "Spending Trend",
        data: sortedEntries.map(([, total]) => total),
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
}

function getStatistics(expenses) {
  if (expenses.length === 0) {
    return { total: 0, average: 0, highest: 0, count: 0 };
  }
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const average = total / expenses.length;
  const highest = Math.max(...expenses.map((e) => e.amount));
  return {
    total: total.toFixed(2),
    average: average.toFixed(2),
    highest: highest.toFixed(2),
    count: expenses.length,
  };
}

function ExpenseCharts({ expenses }) {
  const stats = getStatistics(expenses);

  if (expenses.length === 0) {
    return (
      <div className="charts-container">
        <p style={{ textAlign: "center", color: "#666" }}>
          No expenses to display. Add some expenses to see charts and
          statistics.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="stats-container">
        <div className="stat-card">
          <h4>Total Expenses</h4>
          <p className="stat-value">${stats.total}</p>
        </div>
        <div className="stat-card">
          <h4>Average Expense</h4>
          <p className="stat-value">${stats.average}</p>
        </div>
        <div className="stat-card">
          <h4>Highest Expense</h4>
          <p className="stat-value">${stats.highest}</p>
        </div>
        <div className="stat-card">
          <h4>Total Count</h4>
          <p className="stat-value">{stats.count}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-block">
          <h3>Category Breakdown</h3>
          <Pie data={getCategoryData(expenses)} />
        </div>
        <div className="chart-block">
          <h3>Monthly Spending</h3>
          <Bar data={getMonthlyData(expenses)} />
        </div>
        <div className="chart-block">
          <h3>Spending Trend</h3>
          <Line data={getTrendData(expenses)} />
        </div>
      </div>
    </div>
  );
}

export default ExpenseCharts;
