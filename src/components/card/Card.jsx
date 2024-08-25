import styles from "./Card.module.css";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { AddBalance } from "../modal";
import { AddExpense } from "../modal";

const Card = ({ titleLabel, labelValue, buttonLabel, addIncome = true }) => {
  const [open, setOpen] = useState(false);

  const onClickHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <p>
          {titleLabel}:
          <span className={addIncome ? styles.incomeSpan : styles.addItemSpan}>
            ₹{labelValue}
          </span>
        </p>
        <button
          className={
            addIncome
              ? styles.buttonContainer
              : `${styles.buttonContainer} ${styles.addButtonContainer}`
          }
          onClick={() => {
            onClickHandler();
          }}
        >
          <span>
            <IoIosAdd />
          </span>
          {buttonLabel}
        </button>
      </div>
      {open && addIncome && <AddBalance open={open} setOpen={setOpen} />}
      {open && !addIncome && <AddExpense open={open} setOpen={setOpen} />}
    </>
  );
};

export default Card;
