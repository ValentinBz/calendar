import { combineReducers } from 'redux';
import reducerDate from './reducerDate';
import reducerMonthsArray from './reducerMonthsArray';
import reducerSelectedMonth from './reducerSelectedMonth';

const allReducers = combineReducers({
  entrieDate: reducerDate,
  monthsArray: reducerMonthsArray,
  selectedMonth: reducerSelectedMonth,
});

export default allReducers;
