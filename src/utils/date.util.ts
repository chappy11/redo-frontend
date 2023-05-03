import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export const dateFormat = (date: string) => {
  return dayjs(date).format("MM/DD/YYYY");
};

export const getMonth = (date: string) => {
  return dayjs(date).month();
};
