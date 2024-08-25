import { RecentTransaction } from "./recent-transactions";
import styles from "./Transactions.module.css";
import { TopExpenses } from "./top-expenses";

const Transactions = () => {
  return (
    <>
      <div className={styles.transactionWrapper}>
        <div className={styles.recentTransactionItem}>
          <RecentTransaction />
        </div>
        <div className={styles.expenseItem}>
          <TopExpenses />
        </div>
      </div>
    </>
  );
};

export default Transactions;
