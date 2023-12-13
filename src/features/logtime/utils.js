export const generateHalfHourArray = () => {
  const halfHours = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      halfHours.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return halfHours;
};
export const calculateDuration = (start, end) => {
  if (start && end) {
    const [startHour, startMinute] = start
      .split(":")
      .map((value) => parseInt(value, 10));
    const [endHour, endMinute] = end
      .split(":")
      .map((value) => parseInt(value, 10));

    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = endHour * 60 + endMinute;

    let durationInMinutes = totalEndMinutes - totalStartMinutes;

    return durationInMinutes;
  }
};
export const getFromlocalStorage = () => {
  const loggedItems =
    localStorage.getItem("loggedTimes") !== null
      ? JSON.parse(localStorage.getItem("loggedTimes"))
      : [];

  return loggedItems;
};
export const saveInLocalStorage = (logs) => {
  localStorage.setItem("loggedTimes", JSON.stringify(logs.map((item) => item)));
};
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const convert = (date) => {
  const toconvert = new Date(date);
  const todayFormatted = `${toconvert.getDate()}.${
    toconvert.getMonth() + 1
  }.${toconvert.getFullYear()}`;

  return todayFormatted;
};
export const getTotalTimeLoggedForToday = (logs) => {
  const today = new Date();
  const todayFormatted = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;

  const totalTimeToday = logs.filter(
    (log) => convert(log.date) === todayFormatted
  );
  if (totalTimeToday[0]) {
    return totalTimeToday[0].duration;
  }

  return 0;
};
