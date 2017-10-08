import xs from 'xstream'

const INIT_STATE = {
  date: Date(),
  time: '00:00',
  location: 'Not defined'
}

export default (action$, props$) => {
  const propsReducer$ = props$.map(props => state => ({
    ...state,
    date: props.initialDate || state.date,
    time: props.initialTime || state.time,
    location: props.initialLocation || state.location
  }))

  const dateReducer$ = action$
    .filter(a => a.type === 'CHANGE_DATE')
    .map(action => oldState => {
      return {
        ...oldState,
        date: action.payload}
    })
  const timeReducer$ = action$
    .filter(a => a.type === 'CHANGE_TIME')
    .map(action => oldState => {
      return {
        ...oldState,
        time: action.payload}
    })
  const locationReducer$ = action$
    .filter(a => a.type === 'CHANGE_LOCATION')
    .map(action => oldState => {
      return {
        ...oldState,
        location: action.payload}
    })
  return xs.merge(propsReducer$, dateReducer$, timeReducer$, locationReducer$)
    .fold((state, reducer) => reducer(state), INIT_STATE)
}
