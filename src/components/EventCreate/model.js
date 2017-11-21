import xs from 'xstream'

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

const modifyStatePropertyReducer = action$ => type => property => action$
  .filter(a => a.type === type)
  .map(action => state => {
    return {
      ...state,
      currentEvent: {
        ...state.currentEvent,
        [property]: action.payload,
      },
    }
  })

export default (action$) => {
  const defaultReducer$ = xs.of((prevState) =>
    typeof prevState === `undefined` ? INIT_STATE : prevState)

  const nameReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_NAME`)(`name`)
  const dateReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_DATE`)(`date`)
  const timeReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_TIME`)(`time`)
  const locationReducer$ = modifyStatePropertyReducer(action$)(`CHANGE_LOCATION`)(`location`)

  return xs.merge(defaultReducer$, nameReducer$, dateReducer$, timeReducer$, locationReducer$)
}
