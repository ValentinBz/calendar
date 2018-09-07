const initialState = new Date().getMonth();

const reducerSelectedMonth = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SELECTED_MONTH':
      return action.payload
    default:
      return state;
  }
};

export default reducerSelectedMonth;
