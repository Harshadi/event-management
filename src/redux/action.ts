export const setAllEventsAction = (eventDataArr) => {
  console.log(eventDataArr, "eventDataArr");
  return (dispatch) => {
    dispatch({
      type: "setAllEvents",
      payload: eventDataArr
    });
  };
};

export const setFilterData = (filteredData) => {
  return (dispatch) => {
    dispatch({
      type: "setFilterData",
      payload: filteredData
    });
  };
};

export const setSelectedEvents = (selectedEvents) => {
  return (dispatch) => {
    dispatch({
      type: "setSelectedEvents",
      payload: selectedEvents
    });
  };
};
