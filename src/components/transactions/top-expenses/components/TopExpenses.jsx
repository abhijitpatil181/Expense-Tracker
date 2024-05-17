import styles from "./TopExpenses.module.css";
import { Barchart } from "../../../barchart/index";

const TopExpenses = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "738.33px",
        }}
      >
        <h1 className={styles.topExpensesTitle}>Top Expenses</h1>

        <Barchart />
      </div>
    </>
  );
};

export default TopExpenses;
