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
