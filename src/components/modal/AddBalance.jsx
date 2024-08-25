import ReactModal from "react-modal";
import styles from "./AddBalance.module.css";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

const AddItem = ({ open, setOpen }) => {
  const [balannce, setBalance] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const getCurrentBalance = localStorage.getItem("walletBalance");
    const totalBalance = +getCurrentBalance + +balannce;
    localStorage.setItem("walletBalance", totalBalance.toString());
    window.dispatchEvent(new Event("storage"));
    enqueueSnackbar({ message: "Balance Updated" }, { variant: "success" });
    setOpen(false);
  };

  return (
    <>
      <ReactModal
        isOpen={open}
        ariaHideApp={false}
        style={{
          content: {
            margin: "auto",
            height: "164px",
            width: "538px",
            borderRadius: "15px",
            background:
              "linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #FBFBFB, #FBFBFB)",
          },
        }}
      >
        <h1>Add Balance</h1>
        <form onSubmit={submitHandler}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              type="number"
              placeholder="Income Amount"
              onChange={(e) => setBalance(e.target.value)}
              required
            />
            <button className={styles.addBalanceButton} type="submit">
              Add Balance
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </ReactModal>
    </>
  );
};

export default AddItem;
