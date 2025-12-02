import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./ExpenseCharts.css";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
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
    const month = new Date(e.date || e.createdAt || Date.now()).toLocaleString(
      "default",
      { month: "short", year: "numeric" }
    );
    monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
  });
  return {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Total by Month",
        data: Object.values(monthlyTotals),
        backgroundColor: "#36A2EB",
      },
    ],
  };
}

function ExpenseCharts({ expenses }) {
  return (
    <div className="charts-container">
      <div className="chart-block">
        <h3>Category Breakdown</h3>
        <Pie data={getCategoryData(expenses)} />
      </div>
      <div className="chart-block">
        <h3>Monthly Spend</h3>
        <Bar data={getMonthlyData(expenses)} />
      </div>
    </div>
  );
}

export default ExpenseCharts;
