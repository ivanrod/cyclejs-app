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

const createCurrentEventReducer = action$ => type => property => action$
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

  const addEventReducer$ = action$
    .filter(a => a.type === `ADD_EVENT`)
    .map(action => state => ({
      ...state,
      eventList: [
        ...state.eventList,
        action.payload.id,
      ],
      events: {
        ...state.events,
        [action.payload.id]: {...state.currentEvent},
      },
    }))

  const nameReducer$ = createCurrentEventReducer(action$)(`CHANGE_NAME`)(`name`)
  const dateReducer$ = createCurrentEventReducer(action$)(`CHANGE_DATE`)(`date`)
  const timeReducer$ = createCurrentEventReducer(action$)(`CHANGE_TIME`)(`time`)
  const locationReducer$ = createCurrentEventReducer(action$)(`CHANGE_LOCATION`)(`location`)

  return xs.merge(
    addEventReducer$,
    defaultReducer$,
    nameReducer$,
    dateReducer$,
    timeReducer$,
    locationReducer$)
}
