import moment from "moment";

// Takes in date object, returns string.
export const addMinutes = (date, minutes) => {
  return moment.utc(date).add(minutes, "minutes");
  // .format("YYYY-MM-DD h:mm a");
};
