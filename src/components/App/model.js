import xs from 'xstream'

const INIT_STATE = {
  events: [],
}

export default (action$) => {
  const createEventReducer$ = action$
    .filter(({type}) => type === `CREATE_EVENT`)
    .map(({payload: {name, date, time, location}}) => state => {
      return {
        ...state,
        events: {
          ...state.events,
          [name]: {
            date,
            time,
            location,
          },
        },
      }
    })
  return xs.merge(createEventReducer$)
    .fold((state, reducer) => reducer(state), INIT_STATE)
}
