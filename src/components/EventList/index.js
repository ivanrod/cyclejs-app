import intent from "./intent"
import model from "./model"
import view from "./view"

export function EventList(sources) {
  const state$ = sources.onion.state$

  const actions = intent(sources.DOM)

  // const reducer$ = model(actions)

  const vtree$ = view(state$)

  const sinks = {
    DOM: vtree$,
  }
  return sinks
}
