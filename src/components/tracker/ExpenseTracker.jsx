import styles from "./ExpenseTracker.module.css";
import Card from "../card/Card";
import { useEffect, useState } from "react";

const ExpenseTracker = () => {
  const [walletBalance, setWalletBalance] = useState("");
  const [expenses, setExpenses] = useState("");

  const handleStorageChange = (e) => {
    setWalletBalance(e.currentTarget.localStorage.walletBalance);
    setExpenses(e.currentTarget.localStorage.expenses);
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    setWalletBalance(localStorage.getItem("walletBalance"));
    setExpenses(localStorage.getItem("expenses"));

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.cardWrapper}>
          <Card
            titleLabel="Wallet Balance"
            labelValue={walletBalance}
            buttonLabel="Add Income"
          />
          <Card
            titleLabel="Expenses"
            labelValue={expenses}
            buttonLabel="Add Expenses"
            addIncome={false}
          />
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
