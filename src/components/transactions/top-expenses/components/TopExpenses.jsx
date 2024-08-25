import styles from "./TopExpenses.module.css";
import { Barchart } from "../../../barchart/index";

const TopExpenses = () => {
  return (
    <>
      <div
        style={{
          // minWidth: "738.33px",
          width: "100%%",
          minHeight: "380px",
          height: "calc(100% - 70px)",
        }}
      >
        <h1 className={styles.topExpensesTitle}>Top Expenses</h1>
        <Barchart />
      </div>
    </>
  );
};

export default TopExpenses;
