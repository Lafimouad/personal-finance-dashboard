import React, { useEffect, useState } from "react";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>{e.category}: ${e.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;