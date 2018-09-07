import { GET_DATE, GET_MIDDLE_DATE, GET_SELECTED_MONTH } from '../constants/actionTypes';

export function getDate(date) {
  return { type: GET_DATE, payload: date }
}

export function getMiddleDate(months, tab) {
  return { type: GET_MIDDLE_DATE, payload: { months: months, tab: tab } }
}

export function getSelectedMonth(num) {
  return { type: GET_SELECTED_MONTH, payload: num }
}
