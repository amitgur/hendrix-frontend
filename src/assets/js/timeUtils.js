import { date } from "quasar";

export function calculateDaysLeft(d) {
  let nowDate = new Date();
  return date.getDateDiff(d, nowDate, "days");
}

export function getHebrewDate(d) {
  return date.formatDate(d, "DD-MM-YYYY");
}
