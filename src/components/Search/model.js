import xs from "xstream"
import {createReducers, createDefaultReducer} from "@utils/reducers"

const INIT_STATE = {
  currentFood: ``,
  foodList: [],
  foods: {},
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
  default: () => state => state,
}

export const innerModel = action$ => action$
  .fold((acc, action) => {
    return (innerReducers[action.type] || innerReducers.default)(action)(acc)
  }, {
    selectableFood: [],
  })
  // .map(action => (innerReducers[action.type] || innerReducers.default)(action))
  // .startWith({
  //   selectableFood: [],
  // })
  .debug(x=>console.log('pene', x))

export default action$ => xs.merge(
  ...createReducers(action$)(reducers),
  createDefaultReducer(INIT_STATE)
)
