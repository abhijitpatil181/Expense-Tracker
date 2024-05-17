import "./App.css";
import { ExpenseTracker, Transactions } from "./components";
import { SnackbarProvider } from "notistack";
import { useState } from "react";
import { TransactionContext } from "./context/TransactionContext";

function App() {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [combinedExpenseData, setCombineExpenseData] = useState([]);

  const value = {
    recentTransactions,
    setRecentTransactions,
    combinedExpenseData,
    setCombineExpenseData,
  };

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
