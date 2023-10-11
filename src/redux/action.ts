import { checkOverlap, checkSearch } from "../utils";
import {
  SET_ALL_EVENTS,
  SET_FILTER_DATA,
  SET_SELECTED_EVENTS
} from "./actionTypes";

const setEvent = (eventData, type, dispatch) => {
  return dispatch({
    type: type,
    payload: eventData
  });
};

const updateAction = (
  id,
  notSelected,
  selectedEvents,
  allEvents,
  filterData,
  dispatch
) => {
  const selectedOnes = [...selectedEvents];
  const allData = [...allEvents];
  const filteredData = JSON.parse(JSON.stringify(filterData));
  if (!id) {
    setEvent(allData, SET_ALL_EVENTS, dispatch);
  }
  if (notSelected) {
    allEvents.forEach((data, index) => {
      if (data.id === id) {
        const isNotOverlap = checkOverlap(
          data.start_time,
          data.end_time,
          selectedEvents
        );
        if (isNotOverlap) {
          selectedOnes.push(data);
          allData.splice(index, 1);
          if (Object.keys(filterData).length) {
            const filterDataIdx = filterData.events?.indexOf(data) || null;
            filteredData.events.splice(filterDataIdx, 1);
            filteredData.selectedEvents.push(data);
            setEvent(filteredData, SET_FILTER_DATA, dispatch);
          }
          setEvent(allData, SET_ALL_EVENTS, dispatch);
          setEvent(selectedOnes, SET_SELECTED_EVENTS, dispatch);
        } else {
          console.log("error, check alert for reason :)");
        }
      }
    });
  } else {
    selectedEvents?.forEach((data, index) => {
      if (data.id === id) {
        if (Object.keys(filterData).length) {
          const filterDataIdx =
            filterData.selectedEvents?.indexOf(data) || null;
          filteredData.selectedEvents.splice(filterDataIdx, 1);
          filteredData.events.push(data);
          setEvent(filteredData, SET_FILTER_DATA, dispatch);
        }
        allData.push(data);
        selectedOnes.splice(index, 1);
      }
    });
    setEvent(allData, SET_ALL_EVENTS, dispatch);
    setEvent(selectedOnes, SET_SELECTED_EVENTS, dispatch);
  }
};

const searchAction = (
  value,
  allEvents,
  selectedEvents,
  dispatch,
  setIsSearched
) => {
  const arr = { events: [], selectedEvents: [] };

  if (!value) {
    setEvent(arr, SET_FILTER_DATA, dispatch);
    setIsSearched(false);
    return;
  }
  allEvents.forEach((event) => {
    if (
      checkSearch(event.event_name, value) ||
      checkSearch(event.event_category, value)
    ) {
      arr.events.push(event);
    }
  });
  selectedEvents.forEach((event) => {
    if (
      checkSearch(event.event_name, value) ||
      checkSearch(event.event_category, value)
    ) {
      arr.selectedEvents.push(event);
    }
  });
  setIsSearched(true);
  setEvent(arr, SET_FILTER_DATA, dispatch);
};

export { updateAction, searchAction };
