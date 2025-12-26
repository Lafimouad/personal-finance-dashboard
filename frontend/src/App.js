import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ExpenseFilterPage from "./components/ExpenseFilterPage";
import BudgetSettings from "./components/BudgetSettings";
import IncomeTracker from "./components/IncomeTracker";
import SavingsGoals from "./components/SavingsGoals";
import BillReminders from "./components/BillReminders";
import DebtTracker from "./components/DebtTracker";
import FinancialReports from "./components/FinancialReports";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Personal Finance Dashboard</h1>
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/filter"
            element={
              <ProtectedRoute>
                <ExpenseFilterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Personal Finance Dashboard</h1>
                  <BudgetSettings />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Personal Finance Dashboard</h1>
                  <IncomeTracker />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/savings-goals"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Personal Finance Dashboard</h1>
                  <SavingsGoals />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bill-reminders"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Personal Finance Dashboard</h1>
                  <BillReminders />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/debts"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Personal Finance Dashboard</h1>
                  <DebtTracker />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <div>
                  <h1>Personal Finance Dashboard</h1>
                  <FinancialReports />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
