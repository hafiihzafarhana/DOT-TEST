import moment from "moment";

export const attemptTimeBorrowBook = (): string => {
  return moment().format("DD-MM-YYYY");
};

export const checkTimeForNow = (): string => {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS Z");
};

export const addTimeBorrowed = (time: string, limit: number): string => {
  const firstTime = moment(time, "YYYY-MM-DD HH:mm:ss.SSS Z");
  const lastTime = firstTime.add(limit, "days");
  return lastTime.format("YYYY-MM-DD HH:mm:ss.SSS Z");
};
