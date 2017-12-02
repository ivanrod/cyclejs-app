import xs from "xstream"

export const createDefaultReducer = initState => xs.of(
  prevState => typeof prevState === `undefined` ? initState : prevState
)

export const createReducers = action$ => handlers => Object.keys(handlers).map(actionType =>
  action$
    .filter(action => action.type === actionType)
    .map(handlers[actionType]))
