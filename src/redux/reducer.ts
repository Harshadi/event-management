// Takes the initial state and action to be performed as arguments
const myReducer = (state, action) => {
  // If the action dispatched by myAction.js file is "deposit", then add the money
  if (action.type == "setAllEvents") {
    return action.payload;
  }
  // If the action dispatched by myAction.js file is "withdrawl", then subtract the money
  else if (action.type == "setFilterData") {
    return action.payload;
  } else if (action.type == "setSelectedEvents") {
    return action.payload;
  }
  // Else keep it in original state
  else {
    return state;
  }
};

export default myReducer;
