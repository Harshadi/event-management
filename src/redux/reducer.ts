import {
  SET_ALL_EVENTS,
  SET_FILTER_DATA,
  SET_SELECTED_EVENTS,
  SET_LOADING
} from "./actionTypes";

const initialState = {
  selectedEvents: [],
  filterData: {
    events: [],
    selectedEvents: []
  },
  loading: true,
  allEvents: []
};

const myReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_SELECTED_EVENTS:
      return {
        ...state,
        selectedEvents: action.payload,
        loading: false
      };
    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
        loading: false
      };
    case SET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default myReducer;
