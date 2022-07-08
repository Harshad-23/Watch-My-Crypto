export function numberWithCommas(x) {
  if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else return "-";
}

export function validateEmail(email) {
  let regex = new RegExp("[a-z0-9]+@[a-z0-9]+.[a-z]{2,3}");
  return regex.test(email);
}

export function fullDate(date) {
  // const longMonth = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  const shortMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const newDate = new Date(date);
  return `${
    shortMonth[newDate.getMonth()]
  } ${newDate.getDate()}, ${newDate.getFullYear()}`;
}
