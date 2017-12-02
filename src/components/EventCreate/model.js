import xs from "xstream"
import {createReducers, createDefaultReducer} from "@utils/reducers"

const INIT_STATE = {
  currentEvent: {
    name: ``,
    date: Date.now(),
    time: `00:00`,
    location: `Not defined`,
  },
  eventList: [],
  events: {},
}

const reducers = {
  ADD_EVENT: action => state => ({
    ...state,
    eventList: [...state.eventList, action.payload.id],
    events: {
      ...state.events,
      [action.payload.id]: {...state.currentEvent},
    },
  }),
  CHANGE_NAME: action => state => ({
    ...state,
    currentEvent: {
      ...state.currentEvent,
      name: action.payload,
    },
  }),
  CHANGE_DATE: action => state => ({
    ...state,
    currentEvent: {
      ...state.currentEvent,
      date: action.payload,
    },
  }),
  CHANGE_TIME: action => state => ({
    ...state,
    currentEvent: {
      ...state.currentEvent,
      time: action.payload,
    },
  }),
  CHANGE_LOCATION: action => state => ({
    ...state,
    currentEvent: {
      ...state.currentEvent,
      location: action.payload,
    },
  }),
}

export default action$ => xs.merge(
  ...createReducers(action$)(reducers),
  createDefaultReducer(INIT_STATE)
)
