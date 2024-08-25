import TransactionDetail from "../transaction-details/TransactionDetail";
import styles from "./RecentTransaction.module.css";
// import { recentTransactions } from "../../../../mocks/recentTransactions.mocks";
import { nextSvgIcon, previousSvgIcon } from "../../../../assets";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../../../context/TransactionContext";
import { getCombinedData } from "../../../../helper/helper";

const RecentTransaction = () => {
  const { recentTransactions, setRecentTransactions, setCombineExpenseData } =
    useContext(TransactionContext);
  const [currentPage, setCurrentPage] = useState(1);

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
      const data = getCombinedData(recentTransactions);

      setCombineExpenseData(data);
    } else {
      setCombineExpenseData([]);
    }
  }, [recentTransactions]);

  useEffect(() => {
    const data = recentTransactions.slice(
      currentPage * 3 - 3,
      currentPage * 3 - 1
    );
  }, [currentPage]);

  const handleStorageChange = (e) => {
    setRecentTransactions(
      JSON.parse(e.currentTarget.localStorage.recentTransactions)
    );
  };

  const onPaginationChange = (label) => {
    switch (label) {
      case "previous":
        if (currentPage !== 1) {
          setCurrentPage((prevPage) => setCurrentPage(prevPage - 1));
        }
        break;

      case "next":
        if (currentPage !== Math.ceil(recentTransactions.length / 3)) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
        break;

      default:
        console.log("no pagination");
    }
  };

  return (
    <>
      <div
        style={{
          // minWidth: "738.33px",
          width: "100%",
          minHeight: "380px",
          height: "calc(100% - 70px)",
        }}
      >
        <h1 className={styles.recentTransactionTile}>Recent Transactions</h1>
        <div className={styles.transactionContainer}>
          {recentTransactions.length > 0 ? (
            recentTransactions
              .slice(currentPage * 3 - 3, currentPage * 3)
              .map((transaction) => (
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
          {recentTransactions && recentTransactions.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <button
                className={styles.circleButton}
                onClick={() => onPaginationChange("previous")}
              >
                <img
                  src={previousSvgIcon}
                  style={{ height: "40px", width: "40px" }}
                  alt="previous"
                />
              </button>
              <button className={styles.currentPage}>
                <p>{currentPage}</p>
              </button>
              <button
                className={styles.circleButton}
                onClick={() => onPaginationChange("next")}
              >
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
