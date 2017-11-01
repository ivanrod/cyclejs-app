import xs from 'xstream'

const INIT_STATE = {
  date: Date(),
  time: `00:00`,
  location: `Not defined`,
}

const modifyStatePropertyReducer = action => type => property => action
  .filter(a => a.type === type)
  .map(mapAction => state => {
    return {
      ...state,
      [property]: mapAction.payload}
  })

export default (action$, props$) => {
  const propsReducer$ = props$.map(props => state => ({
    ...state,
    date: props.initialDate || state.date,
    time: props.initialTime || state.time,
    location: props.initialLocation || state.location,
  })).take(1)

  const nameReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_NAME`)(`name`)
  const dateReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_DATE`)(`date`)
  const timeReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_TIME`)(`time`)
  const locationReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_LOCATION`)(`location`)

  return xs.merge(nameReducer$, propsReducer$, dateReducer$, timeReducer$, locationReducer$)
    .fold((state, reducer) => reducer(state), INIT_STATE)
}
