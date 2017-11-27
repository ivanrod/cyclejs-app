import xs from 'xstream'

// Init State
export const initReducer$ = xs.of(() => {
  return {
    entities: {
      events: {},
    },
    eventList: [],
    currentEvent: {},
  }
})

// Lenses
export const eventCreateLens = {
  get: state => ({
    events: state.entities.events,
    eventList: state.eventList,
    currentEvent: state.currentEvent,
  }),
  set: (state, childState) => ({
    ...state,
    currentEvent: childState.currentEvent,
    eventList: childState.eventList,
    entities: {
      ...state.entities,
      events: childState.events,
    },
  }),
}

export const eventListLens = {
  get: state => state.eventList.map(id => ({...state.entities.events[id], id})),
  set: (state, childState) => ({
    ...state,
    eventList: childState.map(event => event.id),
  }),
}
