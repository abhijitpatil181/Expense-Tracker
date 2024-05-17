import TransactionDetail from "../transaction-details/TransactionDetail";
import styles from "./RecentTransaction.module.css";
// import { recentTransactions } from "../../../../mocks/recentTransactions.mocks";
import { nextSvgIcon, previousSvgIcon } from "../../../../assets";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../../../context/TransactionContext";

const RecentTransaction = () => {
  const { recentTransactions, setRecentTransactions, setCombineExpenseData } =
    useContext(TransactionContext);

  const handleStorageChange = (e) => {
    setRecentTransactions(
      JSON.parse(e.currentTarget.localStorage.recentTransactions)
    );
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    setRecentTransactions(
      JSON.parse(localStorage.getItem("recentTransactions"))
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (recentTransactions.length > 0) {
      let data = [
        {
          category: "Food",
          price: 0,
        },
        {
          category: "Entertainment",
          price: 0,
        },
        {
          category: "Travel",
          price: 0,
        },
      ];
      recentTransactions?.forEach((expense) => {
        switch (expense.category) {
          case "food":
            data[0].price += +expense.price;
            break;
          case "entertainment":
            data[1].price += +expense.price;
            break;
          case "travel":
            data[2].price += +expense.price;
            break;

          default:
            console.log("expense");
        }
      });
      setCombineExpenseData(data);
    }
  }, [recentTransactions]);

  return (
    <>
      <div>
        <h1 className={styles.recentTransactionTile}>Recent Transactions</h1>
        <div className={styles.transactionContainer}>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionDetail
                key={transaction.id}
                id={transaction.id}
                category={transaction.category}
                title={transaction.title}
                date={transaction.date}
                price={transaction.price}
              />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className={styles.recentTransaction}>
                No Transaction Record Exist
              </p>
            </div>
          )}
          {recentTransactions.length !== 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <button className={styles.circleButton}>
                <img
                  src={previousSvgIcon}
                  style={{ height: "40px", width: "40px" }}
                  alt="previous"
                />
              </button>
              <button className={styles.currentPage}>
                <p>1</p>
              </button>
              <button className={styles.circleButton}>
                <img
                  src={nextSvgIcon}
                  style={{ height: "40px", width: "40px" }}
                  alt="next"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentTransaction;
