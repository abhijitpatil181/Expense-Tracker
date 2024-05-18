import ReactModal from "react-modal";
import styles from "./AddExpense.module.css";
import { useEffect, useState } from "react";
import { dateConvertor } from "../../helper/helper";
import { v4 as uuidv4 } from "uuid";
import { enqueueSnackbar } from "notistack";

const AddExpense = ({ open, setOpen, edit = false, transactionId = "" }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (edit) {
      let previousData = JSON.parse(localStorage.getItem("recentTransactions"));

      let data = previousData.find((item) => item.id === transactionId);
      const { id, ...rest } = data;
      setForm(rest);
    }
  }, []);

  const changeHandler = (label, e) => {
    let value =
      label === "date" ? dateConvertor(e.target.value) : e.target.value;
    setForm((prevFormData) => {
      return { ...prevFormData, [label]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let balance = localStorage.getItem("walletBalance");
    let expenses = localStorage.getItem("expenses");
    let previousData = JSON.parse(localStorage.getItem("recentTransactions"));
    // let newFormData = [...previousData, { ...form, id: uuidv4() }];
    let newFormData = [];
    let balannceToUpdateInWallet = "";
    let balanceToUpdatExpense = "";

    if (edit) {
      let index = previousData.findIndex((item) => item.id === transactionId);
      // previousData[index] = form;
      newFormData = [...previousData];
      newFormData[index] = { ...form, id: transactionId };
      if (+form.price > +previousData[index].price) {
        balannceToUpdateInWallet =
          "-" + `${+form.price - +previousData[index].price}`;
        balanceToUpdatExpense = `${+form.price - +previousData[index].price}`;
      } else {
        balannceToUpdateInWallet = `${
          +previousData[index].price - +form.price
        }`;
        balanceToUpdatExpense =
          "-" + `${+previousData[index].price - +form.price}`;
      }
    } else {
      newFormData = [...previousData, { ...form, id: uuidv4() }];
      if (+balance < +form.price) {
        enqueueSnackbar("You dont have sufficient balance to buy this", {
          variant: "error",
        });
        return;
      }
      balannceToUpdateInWallet = "-" + `${form.price}`;
      balanceToUpdatExpense = `${form.price}`;
    }

    localStorage.setItem("recentTransactions", JSON.stringify(newFormData));
    localStorage.setItem(
      "walletBalance",
      `${+balance + +balannceToUpdateInWallet}`
    );
    localStorage.setItem("expenses", `${+expenses + +balanceToUpdatExpense}`);
    dispatchEvent(new Event("storage"));
    enqueueSnackbar("New Item Added", {
      variant: "success",
    });
    setOpen(false);
    setForm({
      title: "",
      price: "",
      category: "",
      date: "",
    });
  };
  return (
    <>
      <ReactModal
        isOpen={open}
        ariaHideApp={false}
        style={{
          content: {
            margin: "auto",
            height: "335px",
            width: "538px",
            borderRadius: "15px",
            background:
              "linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #D9D9D9, #D9D9D9), linear-gradient(0deg, #FBFBFB, #FBFBFB)",
          },
        }}
      >
        <h1>Add Expenses</h1>
        <form onSubmit={submitHandler}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              rowGap: "1.5rem",
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => changeHandler("title", e)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => changeHandler("price", e)}
              required
            />
            <select
              name="category"
              onChange={(e) => changeHandler("category", e)}
              value={form.category}
              required
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
            </select>
            <input
              type="date"
              onChange={(e) => changeHandler("date", e)}
              required
            />
            <button type="submit" className={styles.addExpense}>
              Add Expense
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "217px",
              }}
            >
              <button
                className={styles.cancelButton}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </ReactModal>
    </>
  );
};

export default AddExpense;
