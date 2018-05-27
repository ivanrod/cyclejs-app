import xs from 'xstream'

// Init State
export const initReducer$ = xs.of(() => {
  return {
    entities: {
      foods: {},
    },
    foodList: [],
    currentFood: ``,
  }
})

// Lenses
export const searchLens = {
  get: state => ({
    foods: state.entities.foods,
    foodList: state.foodList,
    currentFood: state.currentFood,
  }),
  set: (state, childState) => ({
    ...state,
    currentFood: childState.currentFood,
    foodList: childState.foodList,
    entities: {
      ...state.entities,
      foods: childState.foods,
    },
  }),
}

export const listLens = {
  get: state => state.foodList.map(id => ({...state.entities.foods[id], id})),
  set: (state, childState) => ({
    ...state,
    foodList: childState.map(food => food.id),
  }),
}
