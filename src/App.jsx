import "./App.css";
import { ExpenseTracker, Transactions } from "./components";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { TransactionContext } from "./context/TransactionContext";
import { useEffect } from "react";

function App() {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [combinedExpenseData, setCombineExpenseData] = useState([]);

  const value = {
    recentTransactions,
    setRecentTransactions,
    combinedExpenseData,
    setCombineExpenseData,
  };

  useEffect(() => {
    // Check if walletBalance item already exists
    if (!localStorage.getItem("walletBalance")) {
      localStorage.setItem("walletBalance", "5000");
    }

    // Check if recentTransactions item already exists
    if (!localStorage.getItem("recentTransactions")) {
      localStorage.setItem("recentTransactions", JSON.stringify([]));
    }

    if (!localStorage.getItem("expenses")) {
      localStorage.setItem("expenses", "0");
    }
  }, []);

  return (
    <>
      <TransactionContext.Provider value={value}>
        <SnackbarProvider>
          <div className="expense-paper">
            <ExpenseTracker />
            <Transactions />
          </div>
        </SnackbarProvider>
      </TransactionContext.Provider>
    </>
  );
}

export default App;
