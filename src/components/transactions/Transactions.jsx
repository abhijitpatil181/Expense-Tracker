import { RecentTransaction } from "./recent-transactions";
import styles from "./Transactions.module.css";
import { TopExpenses } from "./top-expenses";

const Transactions = () => {
  return (
    <>
      <div className={styles.transactionWrapper}>
        <RecentTransaction />

        <TopExpenses />
      </div>
    </>
  );
};

export default Transactions;
