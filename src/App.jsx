import { useEffect } from "react";
import "./App.css";
import { ExpenseTracker, Transactions } from "./components";
import { SnackbarProvider } from "notistack";

function App() {
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
      <SnackbarProvider>
        <div className="expense-paper">
          <ExpenseTracker />
          <Transactions />
        </div>
      </SnackbarProvider>
    </>
  );
}

export default App;
