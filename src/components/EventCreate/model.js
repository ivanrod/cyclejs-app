import xs from 'xstream'

const INIT_STATE = {
  date: Date(),
  time: '00:00',
  location: 'Not defined'
}

const modifyStatePropertyReducer = action => type => property => action
    .filter(a => a.type === type)
    .map(action => state => {
      return {
        ...state,
        [property]: action.payload}
    })

export default (action$, props$) => {
  const propsReducer$ = props$.map(props => state => ({
    ...state,
    date: props.initialDate || state.date,
    time: props.initialTime || state.time,
    location: props.initialLocation || state.location
  })).take(1)

  const dateReducer$ = modifyStatePropertyReducer(action$)('CHANGE_DATE')('date')
  const timeReducer$ = modifyStatePropertyReducer(action$)('CHANGE_TIME')('time')
  const locationReducer$ = modifyStatePropertyReducer(action$)('CHANGE_LOCATION')('location')

  return xs.merge(propsReducer$, dateReducer$, timeReducer$, locationReducer$)
    .fold((state, reducer) => reducer(state), INIT_STATE)
}
