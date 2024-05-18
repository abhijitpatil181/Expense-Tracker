export const dateConvertor = (date) => {
  const formatedDate = new Date(date);
  let newMonth = months[formatedDate.getMonth()];
  let day = formatedDate.getDate();
  let year = formatedDate.getFullYear();
  const newDate = `${newMonth} ${day},${year}`;

  return newDate;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getCombinedData = (allTransactions) => {
  let data = [
    {
      category: "Food",
      price: 0,
    },
    {
      category: "Entertainment",
      price: 0,
    },
    {
      category: "Travel",
      price: 0,
    },
  ];
  if (allTransactions.length > 0) {
    allTransactions?.forEach((expense) => {
      switch (expense.category) {
        case "food":
          data[0].price += +expense.price;
          break;
        case "entertainment":
          data[1].price += +expense.price;
          break;
        case "travel":
          data[2].price += +expense.price;
          break;

        default:
          console.log("expense");
      }
    });
  }

  return data;
};
