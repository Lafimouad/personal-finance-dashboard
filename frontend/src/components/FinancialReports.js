import React, { useState, useEffect } from "react";
import {
  fetchMonthlyReport,
  fetchYearlyReport,
  fetchFinancialSummary,
} from "../api";

function FinancialReports() {
  const [reportType, setReportType] = useState("summary");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReport();
  }, [reportType, year, month]);

  const loadReport = () => {
    setLoading(true);
    let promise;

    if (reportType === "summary") {
      promise = fetchFinancialSummary();
    } else if (reportType === "monthly") {
      promise = fetchMonthlyReport(year, month);
    } else if (reportType === "yearly") {
      promise = fetchYearlyReport(year);
    }

    promise
      .then(setReportData)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const renderSummary = () => {
    if (!reportData) return null;

    return (
      <div style={{ padding: "20px" }}>
        <h3>Financial Summary</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e8f5e9",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Total Income</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#4caf50" }}
            >
              ${reportData.totalIncome?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffebee",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>
              Total Expenses
            </div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#f44336" }}
            >
              ${reportData.totalExpenses?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Net Savings</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#2196f3" }}
            >
              ${reportData.netSavings?.toFixed(2) || "0.00"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthlyReport = () => {
    if (!reportData) return null;

    return (
      <div style={{ padding: "20px" }}>
        <h3>
          Monthly Report - {month}/{year}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e8f5e9",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Total Income</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#4caf50" }}
            >
              ${reportData.totalIncome?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffebee",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>
              Total Expenses
            </div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#f44336" }}
            >
              ${reportData.totalExpenses?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Net Savings</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#2196f3" }}
            >
              ${reportData.netSavings?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff3e0",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Savings Rate</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#ff9800" }}
            >
              {reportData.savingsRate?.toFixed(1) || "0.0"}%
            </div>
          </div>
        </div>

        {reportData.expensesByCategory && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
            }}
          >
            <h4>Expenses by Category</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >
              {Object.entries(reportData.expensesByCategory).map(
                ([category, amount]) => (
                  <div
                    key={category}
                    style={{
                      padding: "15px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      {category}
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                      ${amount.toFixed(2)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderYearlyReport = () => {
    if (!reportData) return null;

    return (
      <div style={{ padding: "20px" }}>
        <h3>Yearly Report - {year}</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e8f5e9",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Total Income</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#4caf50" }}
            >
              ${reportData.totalIncome?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffebee",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>
              Total Expenses
            </div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#f44336" }}
            >
              ${reportData.totalExpenses?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Net Savings</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#2196f3" }}
            >
              ${reportData.netSavings?.toFixed(2) || "0.00"}
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff3e0",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "14px", color: "#666" }}>Savings Rate</div>
            <div
              style={{ fontSize: "28px", fontWeight: "bold", color: "#ff9800" }}
            >
              {reportData.savingsRate?.toFixed(1) || "0.0"}%
            </div>
          </div>
        </div>

        {reportData.expensesByCategory && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h4>Expenses by Category</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >
              {Object.entries(reportData.expensesByCategory).map(
                ([category, amount]) => (
                  <div
                    key={category}
                    style={{
                      padding: "15px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      {category}
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                      ${amount.toFixed(2)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {reportData.monthlyExpenses && reportData.monthlyIncome && (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
            }}
          >
            <h4>Monthly Breakdown</h4>
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
                    Month
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Income
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Expenses
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Net
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(reportData.monthlyExpenses).map((month) => {
                  const income = reportData.monthlyIncome[month] || 0;
                  const expenses = reportData.monthlyExpenses[month] || 0;
                  const net = income - expenses;
                  return (
                    <tr key={month} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "10px" }}>
                        {new Date(year, month - 1).toLocaleString("default", {
                          month: "long",
                        })}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "right",
                          color: "#4caf50",
                        }}
                      >
                        ${income.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "right",
                          color: "#f44336",
                        }}
                      >
                        ${expenses.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          textAlign: "right",
                          fontWeight: "bold",
                          color: net >= 0 ? "#4caf50" : "#f44336",
                        }}
                      >
                        ${net.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Financial Reports</h2>

      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            alignItems: "end",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="summary">Summary</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {(reportType === "monthly" || reportType === "yearly") && (
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                min="2000"
                max="2100"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          )}

          {reportType === "monthly" && (
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(2000, m - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={loadReport}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Generate Report
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
      ) : (
        <>
          {reportType === "summary" && renderSummary()}
          {reportType === "monthly" && renderMonthlyReport()}
          {reportType === "yearly" && renderYearlyReport()}
        </>
      )}
    </div>
  );
}

export default FinancialReports;
