const reducerCalendarArray = (state = [], action) => {
  switch (action.type) {
    case 'GET_MIDDLE_DATE':
      return action.Tab
    default:
      return state;
  }
};

export default reducerCalendarArray;
