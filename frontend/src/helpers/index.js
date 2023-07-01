import moment from "moment";

// Takes in date object, returns string.
export const addMinutes = (date, minutes) => {
  return moment(date, "YYYY-MM-DDThh:mm:ss").add(minutes, "minutes");
  // .format("YYYY-MM-DD h:mm a");
};
