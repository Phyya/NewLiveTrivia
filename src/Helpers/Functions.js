export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
export const timeFormat = (str) => {
  const date = new Date(str);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let ampm = hours > 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const timestamp = hours + ":" + minutes + ampm;
  return timestamp;
};
export const convertTime = (timeGotten) => {
  const apiTime = new Date(+timeGotten).toString();
  const month = apiTime.slice(4, 7);
  let day = apiTime.slice(8, 10);
  const year = apiTime.slice(11, 15);
  const time = apiTime.slice(16, 21);
  const remaining = time.slice(3, 5);
  let timeMinus = +time.slice(0, 2) - 1;
  if (timeMinus === -1) {
    day = day - 1;
    timeMinus = 11;
  }
  const findMonth = months.map((m) => m.includes(month.toLowerCase()));

  const found = findMonth.indexOf(1 === 1);

  const formatted = {
    year: +year,
    month: +found,
    day: +day,
    hour: +timeMinus,
    minute: +remaining,
    seconds: 0,
  };
  return formatted;
};
export const dateFormat = (string) => {
  const newDate = new Date(string);
  const returnedDate = newDate.toDateString().slice(4);
  // const returnedDate =
  //   newDate.getDate() +
  //   "/" +
  //   (newDate.getMonth() + 1) +
  //   "/" +
  //   newDate.getFullYear();
  return returnedDate;
};

export const differenceInDates = (string) => {
  const newDate = new Date(new Date(new Date()).toLocaleDateString());

  const nextDate = new Date(
    new Date(new Date(string).toISOString()).toLocaleDateString()
  );

  const diffTime = nextDate - newDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

//Capitalize any string
export const nameUpperCase = (name) => {
  if (!name) return;
  const name1 = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return name1;
};

// Truncate question length
export const truncate = (string) => {
  if (string.length > 50) {
    const truncated = string.slice(0, 50) + "...";
    return truncated;
  } else return string;
};

//Capitalize name
export const capitalize = (str) => {
  if (str) {
    const arr = str.split(" ");
    const returnedArr = arr.map((name) => {
      return name[0].toUpperCase() + name.slice(1).toLowerCase();
    });
    return returnedArr.join(" ");
  } else return;
};

//Pagination
export const limitPagination = (arr) => {
  if (arr.length > 10) {
    const cut = [
      ...arr.slice(0, arr.length - 3 - 5),
      "...",
      ...arr.slice(arr.length - 3, arr.length),
    ];
    return cut;
  } else return arr;
};

//Format Pagination
export const SliceArray = (current, noOfItemsWanted, array) => {
  if (!array) return;
  const indexOfLastQuestion = current * noOfItemsWanted;
  const indexOfFirstQuestion = indexOfLastQuestion - noOfItemsWanted;
  const currentList = array.slice(indexOfFirstQuestion, indexOfLastQuestion);
  return currentList;
};

//Check if an array of objects is a subset of a bigger object
export const checkarr = (arrAll, arrSub) => {
  const mapped = [];
  arrAll.forEach((element) => {
    mapped.push(arrSub.map((random) => random.name === element.name));
  });
  return mapped.map((random) => random[0] || random[1]);
};

// Shuffle array

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
