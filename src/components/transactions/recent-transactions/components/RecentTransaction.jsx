import TransactionDetail from "../transaction-details/TransactionDetail";
import styles from "./RecentTransaction.module.css";
// import { recentTransactions } from "../../../../mocks/recentTransactions.mocks";
import { nextSvgIcon, previousSvgIcon } from "../../../../assets";
import { useEffect, useState } from "react";

const RecentTransaction = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);

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

  return (
    <>
      <div>
        <h1>Recent Transactions</h1>
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
