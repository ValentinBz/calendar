function getMissions(state, action) {
  let newState = [...state];
  newState.push(action.payload);
  return newState
}

function makeTab(state, action) {
	let newItem = true;
	let newList = [...state];
	newList.find(x => {if(x.id === action.payload.id) newItem = false});
	if (newItem) newList.push(action.payload);
	return newList
}

const reducerMaintenance = (state = [], action) => {
  switch (action.type) {
    case 'GET_DATE':
      return getMissions(state, action)
    default:
      return state;
  }
};

export default reducerMaintenance;
