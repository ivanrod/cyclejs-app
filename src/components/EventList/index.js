import intent from "./intent"
import model from "./model"
import view from "./view"

export function EventList(sources) {
  const actions = intent(sources.DOM)

  const state$ = model(actions)

  const vtree$ = view(state$)

  const sinks = {
    DOM: vtree$,
  }
  return sinks
}
