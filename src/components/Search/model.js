import xs from "xstream"
import {createReducers, createDefaultReducer} from "@utils/reducers"

const INIT_STATE = {
  currentFood: ``,
  foodList: [],
  foods: {},
  error: false,
  opened: false,
}

const reducers = {
  ADD_FOOD: action => state => ({
    ...state,
    foods: {
      ...state.foods,
      [action.payload]: {...state.currentFood},
    },
  }),
  SET_FOOD_LIST: action => state => ({
    ...state,
    foodList: action.payload,
  }),
  SELECT_FOOD: action => state => ({
    ...state,
    currentFood: action.payload,
  }),
}

const innerReducers = {
  SET_SELECTABLE_FOOD: action => state => ({
    ...state,
    selectableFood: action.payload,
  }),
  SET_LOADING: action => state => ({
    ...state,
    loading: action.payload,
  }),
  SET_OPENED: action => state => ({
    ...state,
    opened: action.payload,
  }),
  REQUEST_ERROR: action => state => ({
    ...state,
    error: action.payload,
  }),
  default: () => state => state,
}

export const innerModel = action$ => action$
  .fold((acc, action) => {
    return (innerReducers[action.type] || innerReducers.default)(action)(acc)
  }, {
    selectableFood: [],
    loading: false,
    opened: false,
  })
  // .debug(data=>console.log('Debug innerModel:', data))

export default action$ => xs.merge(
  ...createReducers(action$)(reducers),
  createDefaultReducer(INIT_STATE)
)
