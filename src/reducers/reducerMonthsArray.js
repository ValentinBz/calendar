const reducerMonthsArray = (state = [], action) => {
  switch (action.type) {
    case 'GET_MIDDLE_DATE':
      return action.payload
    default:
      return state;
  }
};

export default reducerMonthsArray;
