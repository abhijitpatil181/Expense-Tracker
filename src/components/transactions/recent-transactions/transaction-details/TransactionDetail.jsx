// {
//   category, title, date, price;
// }

import styles from "./TransactionDetail.module.css";
import {
  deleteSvgIcon,
  editSvgIconIcon,
  foodSvgIcon,
} from "../../../../assets";
import { enterTainmentSvgIcon } from "../../../../assets";
import { travelSvgIcon } from "../../../../assets";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AddExpense } from "../../../modal";

const TransactionDetail = ({ id, category, title, date, price }) => {
  const [open, setOpen] = useState(false);

  let svg;
  if (category === "food") {
    svg = foodSvgIcon;
  } else if (category === "entertainment") {
    svg = enterTainmentSvgIcon;
  } else {
    svg = travelSvgIcon;
  }

  const onClickHandler = () => {
    setOpen(true);
  };

  const deleteTransaction = (id) => {
    let allTransactios = JSON.parse(localStorage.getItem("recentTransactions"));

    const filteredData = allTransactios.filter(
      (transaction) => transaction.id !== id
    );

    if (allTransactios.length === filteredData.length) {
      enqueueSnackbar("Id doesnt exist", { variant: "error" });
    }

    localStorage.setItem("recentTransactions", JSON.stringify(filteredData));
    dispatchEvent(new Event("storage"));
    enqueueSnackbar("Item deleted", { variant: "success" });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2rem 1rem 1rem 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.iconBackground}>
            <img src={svg} style={{ height: "38px", width: "38px" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "1rem",
            }}
          >
            <p className={styles.title}>{title}</p>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles.price}>₹{price}</p>

          <button
            style={{ border: "none", background: "none" }}
            onClick={() => deleteTransaction(id)}
          >
            <img
              src={deleteSvgIcon}
              style={{ height: "50px", width: "50px", cursor: "pointer" }}
            />
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={onClickHandler}
          >
            <img
              src={editSvgIconIcon}
              style={{ height: "50px", width: "50px", cursor: "pointer" }}
            />
          </button>
        </div>
      </div>
      <hr className={styles.hrLine} />
      {open && (
        <AddExpense
          open={open}
          setOpen={setOpen}
          edit={true}
          transactionId={id}
        />
      )}
    </>
  );
};
export default TransactionDetail;
